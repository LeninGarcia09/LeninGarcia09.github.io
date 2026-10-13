# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## AI engineering learning journeys

The [AI engineering track](docs/ai-engineering/overview.md) adds three starting points without replacing the existing plans:

- **A:** basic Python to building AI applications: 28 weeks at 12 hours/week.
- **B:** new to programming: a 12-week on-ramp before A (40 weeks total).
- **C:** solid software foundations: deeper ML, data pipelines, training and MLOps
  (32 weeks at 15 hours/week).

Each route links selected readings directly beside practical assignments and
completion gates. One public/synthetic project connects the outcomes; tools are
examples rather than an employer-specific stack. Budgets are estimates, not guarantees.

The [capability guide](docs/ai-engineering/capability-guide.md) supports self-review.
[Optional delivery practice](docs/ai-engineering/delivery-practice.md) adds 16 shared
weeks and one 8-week focus (360 additional hours). Courses and credentials are
optional; official provider names remain for attribution, not employer targeting.

The [source review](docs/ai-engineering/source-review.md) explains selective use of
`rohitg00/ai-engineering-from-scratch`, public-page verification and limits—not a
whole-repository code audit. Recheck current credential versions, access and prices
before paying. Matching Spanish pages live under
`i18n/es/docusaurus-plugin-content-docs/current/ai-engineering`; external resources
may remain in English.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
