# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## AI engineering learning paths

The [AI engineering track](docs/ai-engineering/overview.md) adds three starting points without replacing the existing plans:

- **A:** basic Python to AI application engineering, with a detailed 28-week sequence.
- **B:** complete beginner, with a 12-week programming on-ramp before A.
- **C:** experienced software engineer, with deeper ML, data pipelines, training, and MLOps.

Courses, official exam status, portfolio gates, and the review of
`rohitg00/ai-engineering-from-scratch` are documented in the track. Matching Spanish
pages live under `i18n/es/docusaurus-plugin-content-docs/current/ai-engineering`.
Recheck provider pages before changing certification recommendations or paying for an exam.

The [EPAM reality check](docs/ai-engineering/epam-reality-check.md) maps four senior
vacancies to curriculum coverage and separate experience requirements. Experienced
engineers can use the [Senior Delivery Bridge](docs/ai-engineering/senior-delivery-bridge.md):
16 shared weeks and one 8-week specialization, with
[verified research](docs/ai-engineering/senior-resources.md). It does not replace professional tenure.

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
