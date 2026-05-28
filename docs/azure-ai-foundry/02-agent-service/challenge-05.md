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

## Regulatory Mapping

| Requirement | Regulation | Implementation |
|-------------|-----------|----------------|
| Service reliability commitments | SLA / Contract | Circuit breaker + health monitoring |
| Incident logging | EU AI Act Art. 20 | All failures logged with context in Azure Monitor |
| Performance monitoring | NIST AI RMF MANAGE 1.3 | Latency metrics + automated alerting |
| Graceful degradation | Good engineering practice | Circuit breaker returns helpful fallback message |

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
