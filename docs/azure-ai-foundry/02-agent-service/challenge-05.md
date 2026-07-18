---
sidebar_position: 2
title: "Challenge 05: Hosted Agent Works Locally, Fails at Scale"
---

# Challenge 05: Works Locally, Fails in Production at Scale

:::info Scenario Brief
**Industry:** Retail / E-Commerce | **Regulatory Context:** SLA obligations, NIST AI RMF MANAGE 1.3  
**Time Estimate:** 90 minutes | **Azure Cost:** ~$5–10
:::

---

## What's at Stake

**TechMart** launched an AI shopping assistant for Black Friday. It worked perfectly in dev with 5 concurrent users. At 500 concurrent users in production, 40% of requests timeout and the other 60% return stale product recommendations.

> *"We're losing $15,000/minute in abandoned carts. The agent is there but not responding. We have 4 hours to fix this before the campaign restarts."*

You need to diagnose and fix a Hosted Agent production failure under time pressure.

---

## Skills Practiced

- Reading **Hosted Agent container logs** and Micro-VM metrics
- Diagnosing **cold start vs. scaling** issues
- Configuring **concurrency and timeout** settings
- Implementing **circuit breaker pattern** for downstream API failures
- Using **Azure Monitor** to identify bottlenecks in real-time

---

## Diagnostic Framework

When a Hosted Agent fails at scale, check in this order:

```
1. Is the agent running?          → Azure Monitor: agent health metrics
2. Is it receiving requests?      → Application Insights: request rate
3. Is it timing out?              → Check timeout config + downstream latency
4. Is it hitting resource limits? → Micro-VM CPU/memory metrics
5. Are downstream tools failing?  → Tool call success rate in traces
6. Is there a VNet routing issue? → NSG flow logs + private endpoint health
```

---

## 🧰 Before You Start — Environment Setup

This challenge is a **production-resilience** drill: an agent that works in dev collapses at scale. Your setup needs observability and a way to generate concurrent load so you can reproduce and fix the failure.

### Prerequisites

| Requirement | Why you need it | How to check |
|-------------|-----------------|--------------|
| **Azure subscription** + a deployed **Hosted Agent** | The thing under load | Azure portal |
| **Azure Monitor / Application Insights** | Read health metrics, request rate, traces | Azure portal |
| **Azure CLI** | Inspect agent config, timeouts, scaling | `az version` |
| A load-generation tool — **Azure Load Testing** (or `locust` *(third-party)*) | Reproduce the concurrency that breaks it | Azure portal / `pip show locust` |
| Access to the agent's downstream tools/APIs | Circuit-breaker and latency fixes live here | app config |

### Step 0 — Get eyes on the system first (5 min) — *the "where do I go"*

Before changing anything, open the dashboards. Under time pressure the instinct is to guess — resist it and read the metrics.

1. `az login`.
2. Open your Hosted Agent's **Application Insights** resource → **Live metrics** and the **Failures** + **Performance** blades ([App Insights overview](https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview)). If your agent has no App Insights attached, add one from the agent's resource → **Monitoring**.
3. Note three baseline numbers at *current* traffic: request rate, failure rate, and p95 dependency latency.

✅ **Done when** you can see live request rate, failure rate, and dependency latency for the agent — this is the instrumentation Tasks 1–3 rely on.

### Step 1 — Reproduce the failure with load (10 min)

You can't fix what you can't reproduce. Create an **Azure Load Testing** resource and ramp concurrency (e.g. 5 → 100 → 500) to find where timeouts begin — that inflection point is your target. Follow the [create-and-run quickstart](https://learn.microsoft.com/azure/load-testing/quickstart-create-and-run-load-test); point the test at your agent's endpoint.

✅ **Done when** a load test reproduces the failure (error rate climbs at higher concurrency) and you've recorded the concurrency level where it starts — that number frames every fix.

> 🟦 **Microsoft-first note:** diagnosis and load are Microsoft-native — **Azure Monitor**, **Application Insights**, Hosted Agent **Micro-VM metrics**, and **Azure Load Testing**. `locust` is listed only as a third-party local alternative for quick load generation.

> **Common fixes:** load test can't reach the agent → check the endpoint URL + any auth header the test needs. No Micro-VM metrics → confirm the Hosted Agent (not a local run) is the target, and metrics are enabled in Azure Monitor.

### The path through this challenge

1. **Diagnostic Framework** — walk the 6-step checklist in order.
2. **Task 1** — read logs + Micro-VM metrics to find the bottleneck.
3. **Task 2** — fix concurrency/timeout config.
4. **Task 3** — add a circuit breaker for downstream failures.
5. **Success Criteria** — under 5% error rate at 100 concurrent users.
6. **Adapt to Your Business** — harden *your* agent for peak load.

> ⏱️ **Time budget:** ~90 minutes. Follow the diagnostic order — jumping to a fix before finding the bottleneck is how the 4-hour clock runs out.

---

## Your Tasks

### Task 1: Enable Comprehensive Monitoring

```python
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

client = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential()
)

# Enable telemetry with Application Insights connection string
connection_string = client.telemetry.get_connection_string()
print(f"App Insights connection string: {connection_string}")

# Enable automatic tracing
client.telemetry.enable()

# Now ALL agent operations are automatically traced
```

```bash
# Query agent performance metrics in Azure Monitor
az monitor metrics list \
  --resource /subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.MachineLearningServices/workspaces/<project> \
  --metric "AgentRequestCount,AgentRequestLatency,AgentErrorRate" \
  --interval PT1M \
  --output table
```

### Task 2: Implement Retry + Circuit Breaker

```python
import asyncio
import time
from typing import Optional

class AgentCircuitBreaker:
    """Prevent cascade failures when the agent is overwhelmed."""
    
    def __init__(self, failure_threshold=5, recovery_timeout=30):
        self.failure_count = 0
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.last_failure_time: Optional[float] = None
        self.state = "CLOSED"  # CLOSED=normal, OPEN=failing, HALF_OPEN=testing
    
    def call(self, func, *args, **kwargs):
        if self.state == "OPEN":
            if time.time() - self.last_failure_time > self.recovery_timeout:
                self.state = "HALF_OPEN"
            else:
                raise Exception("Circuit breaker OPEN — service unavailable. Try again in 30s.")
        
        try:
            result = func(*args, **kwargs)
            if self.state == "HALF_OPEN":
                self.state = "CLOSED"
                self.failure_count = 0
            return result
        except Exception as e:
            self.failure_count += 1
            self.last_failure_time = time.time()
            if self.failure_count >= self.failure_threshold:
                self.state = "OPEN"
            raise e

# Usage
breaker = AgentCircuitBreaker(failure_threshold=5, recovery_timeout=30)

def get_product_recommendation(user_query: str) -> str:
    return breaker.call(
        lambda: client.agents.runs.create_and_process(
            thread_id=thread.id,
            agent_id=agent.id,
            timeout=10  # 10 second hard timeout per request
        )
    )
```

### Task 3: Implement Connection Pooling + Async Processing

```python
import asyncio
from concurrent.futures import ThreadPoolExecutor
from azure.ai.projects.aio import AIProjectClient as AsyncAIProjectClient

async def process_user_request(client: AsyncAIProjectClient, user_query: str, session_id: str):
    """Process a single user request asynchronously."""
    thread = await client.agents.threads.create()
    
    await client.agents.messages.create(
        thread_id=thread.id,
        role="user",
        content=user_query
    )
    
    run = await client.agents.runs.create_and_process(
        thread_id=thread.id,
        agent_id=os.environ["AGENT_ID"],
    )
    
    messages = await client.agents.messages.list(thread_id=thread.id)
    return {"session_id": session_id, "response": messages.data[0].content[0].text.value}

async def process_batch(queries: list[dict]) -> list[dict]:
    """Process up to 50 concurrent requests."""
    async with AsyncAIProjectClient(
        endpoint=os.environ["PROJECT_ENDPOINT"],
        credential=DefaultAzureCredential()
    ) as client:
        # Limit concurrency to avoid overwhelming the agent
        semaphore = asyncio.Semaphore(50)
        
        async def bounded_call(query):
            async with semaphore:
                return await process_user_request(client, query["text"], query["session_id"])
        
        return await asyncio.gather(*[bounded_call(q) for q in queries], return_exceptions=True)
```

### Task 4: Production Health Check Script

```python
import httpx
import asyncio

async def check_agent_health():
    """Run every 30 seconds in production."""
    checks = {
        "endpoint_reachable": False,
        "agent_responds": False,
        "latency_ms": None,
        "error": None,
    }
    
    start = time.time()
    try:
        # Quick smoke test
        thread = client.agents.threads.create()
        client.agents.messages.create(thread_id=thread.id, role="user", content="ping")
        run = client.agents.runs.create_and_process(thread_id=thread.id, agent_id=os.environ["AGENT_ID"])
        
        checks["endpoint_reachable"] = True
        checks["agent_responds"] = run.status == "completed"
        checks["latency_ms"] = int((time.time() - start) * 1000)
        
        # Clean up health check thread
        client.agents.threads.delete(thread.id)
        
    except Exception as e:
        checks["error"] = str(e)
    
    # Alert if latency > 5s or agent not responding
    if checks["latency_ms"] and checks["latency_ms"] > 5000:
        print(f"⚠️  HIGH LATENCY: {checks['latency_ms']}ms — investigate scaling")
    if not checks["agent_responds"]:
        print(f"🚨 AGENT NOT RESPONDING: {checks['error']}")
    
    return checks
```

### Task 5: Scale Testing with Load Simulation

```bash
# Install hey (HTTP load tester)
# Run 500 concurrent requests to your agent endpoint
hey -n 1000 -c 500 -t 30 \
  -H "Authorization: Bearer $(az account get-access-token --query accessToken -o tsv)" \
  -m POST \
  -T "application/json" \
  -d '{"query": "Show me gaming laptops under $1000"}' \
  https://<your-endpoint>/process-query

# Expected output shows:
# - Response time distribution
# - Error rate (target: <1%) - check for 429 rate limit errors too
# - Throughput (requests/second)
```

---

## Success Criteria

- [ ] Application Insights shows traces for all agent requests (not just errors)
- [ ] Circuit breaker correctly blocks requests when failure count exceeds threshold
- [ ] Async batch processing handles 50 concurrent requests without timeouts
- [ ] Health check script correctly identifies a stopped or slow agent
- [ ] Load test shows &lt;5% error rate at 100 concurrent users

---

## 🔁 Adapt This to Your Own Business

The scenario is a **Black Friday shopping assistant**, but *any* agent faces the gap between "works in the demo" and "survives real traffic." The diagnose-in-order + resilience-patterns approach applies to every production agent.

### Step 1 — Find your peak-load moment

| Industry | The peak event | What fails first |
|----------|----------------|------------------|
| **Retail / e-commerce** | Black Friday / flash sale | Timeouts, stale recommendations |
| **Financial services** | Market open, tax season | Downstream API saturation |
| **Healthcare** | Enrollment periods | Slow retrieval under concurrency |
| **Travel / hospitality** | Holiday booking surges | Cold starts, rate limits |
| **Public sector** | Filing deadlines | Queue backups, dropped requests |

### Step 2 — Map the building blocks to your stack (Microsoft-first)

| In this challenge | In your project — use |
|-------------------|-----------------------|
| Health + request metrics | **Azure Monitor** + **Application Insights** |
| Container / Micro-VM metrics | Hosted Agent metrics in **Azure Monitor** |
| Load generation | **Azure Load Testing** *(locust as a third-party local option)* |
| Concurrency / timeout tuning | Hosted Agent scaling + timeout config |
| Circuit breaker | Resilience in code (e.g. Polly for .NET) for downstream calls |
| Caching hot data | **Azure Cache for Redis** for recommendations/lookups |

### Step 3 — The 5-question implementation checklist

1. **Can you see request rate, failure rate, and latency live?** If not → instrument first, fix second.
2. **Can you reproduce the failure with load?** If not → run Azure Load Testing before changing anything.
3. **Is it cold start or saturation?** Read Micro-VM metrics — the fix differs completely.
4. **Do downstream failures cascade?** If yes → add a circuit breaker + timeouts.
5. **Is hot data recomputed every request?** If yes → cache it (Azure Cache for Redis).

### Step 4 — A 1-week rollout plan

| Day | Action | Owner |
|-----|--------|-------|
| **Day 1** | Add full request/dependency instrumentation | SRE |
| **Day 2** | Load test to find the failure inflection point | SRE |
| **Day 3** | Tune concurrency + timeout config | Backend dev |
| **Day 4** | Add circuit breaker + downstream timeouts | Backend dev |
| **Day 5** | Add caching; re-run load test to confirm under 5% errors | SRE |

### Step 5 — Prove the ROI

- **Error rate at target load** — % failed requests at peak concurrency *(target: under 5%)*.
- **P95 latency under load** — response time at peak *(target: within SLA)*.
- **Cold-start impact** — % of slow requests attributable to cold start *(target: near 0)*.

> 💡 **Rule of thumb:** "works locally" tests correctness; production tests concurrency. Instrument, reproduce with load, then fix in the diagnostic order — guessing under a revenue-loss clock is how outages get longer.

### Doing this solo (no team, portfolio-first)

No team, no budget? A before/after load-test report is one of the clearest "I make things production-ready" artifacts you can show. Run the week solo:

- **Mon–Tue** — instrument request/failure/latency, then run a first load test to find the failure inflection point.
- **Wed–Thu** — tune concurrency/timeouts, add a circuit breaker, and cache hot data.
- **Fri** — re-run the load test and capture the before/after error-rate-vs-concurrency chart.

📦 **Ship this artifact:** a load-test report (before/after) showing error rate held under 5% at peak. Resume bullet: *"Hardened an agent for peak traffic — held error rate under 5% and p95 within SLA at 500 concurrent users."*

> 🆓 **Free-tier path:** if Azure Load Testing budget isn't available, run `locust` *(third-party)* locally against a free-tier endpoint — the report looks the same.

---

<details>
<summary>📋 <strong>Regulatory mapping</strong> — SLA · EU AI Act · NIST</summary>

| Requirement | Regulation | Implementation |
|-------------|-----------|----------------|
| Service reliability commitments | SLA / Contract | Circuit breaker + health monitoring |
| Incident logging | EU AI Act Art. 20 | All failures logged with context in Azure Monitor |
| Performance monitoring | NIST AI RMF MANAGE 1.3 | Latency metrics + automated alerting |
| Graceful degradation | Good engineering practice | Circuit breaker returns helpful fallback message |

</details>

---

<details>
<summary>💡 Hints</summary>

1. **Cold start vs. sustained load**: If the FIRST request times out but subsequent ones succeed, it's a cold start issue. If degradation happens gradually, it's a resource limit or downstream bottleneck.
2. **Semaphore sizing**: Setting `Semaphore(50)` limits to 50 concurrent agent calls. Tune based on your Foundry quota (tokens-per-minute limit affects throughput more than raw concurrency).
3. **Thread cleanup**: Every `client.agents.threads.create()` creates a persistent thread. Always delete health-check threads. At 500 req/min, you'll accumulate 30,000 threads/hour if you don't clean up.
4. **The real bottleneck is usually the model**: At scale, the GPT-4o tokens-per-minute (TPM) quota is usually the binding constraint, not the agent runtime. Check `429 Too Many Requests` errors in your traces.

</details>

---

## Knowledge Check

1. What is the difference between a cold start failure and a sustained load failure in Hosted Agents?
2. When should a circuit breaker transition from OPEN to HALF_OPEN?
3. Why is async processing more efficient than threading for I/O-bound agent calls?
4. What Azure Monitor metric would you alert on to detect agent degradation before customers notice?

---

## Cleanup

```bash
# No persistent infrastructure beyond the agent itself
# Delete test threads via SDK if you created many
```
