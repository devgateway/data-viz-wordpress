# Contributing to data-viz-wordpress

Thank you for your interest in contributing. This project is maintained by [Development Gateway](https://www.developmentgateway.org/) and welcomes contributions from the community.

## Table of Contents

- [Development Setup](#development-setup)
- [Branching Model](#branching-model)
- [Making Changes](#making-changes)
- [Code Style](#code-style)
- [Changesets (versioning)](#changesets-versioning)
- [Opening a Pull Request](#opening-a-pull-request)
- [License](#license)
- [Security](#security)

---

## Development Setup

### Prerequisites

- [Node.js 22+](https://nodejs.org/)
- [pnpm 10+](https://pnpm.io/) — `corepack enable && corepack prepare pnpm@latest --activate`
- [Docker](https://www.docker.com/) — for the full WordPress stack

### Install dependencies

```bash
pnpm install
```

### Build all packages and plugins

```bash
pnpm build
```

### Run the full WordPress stack locally

```bash
docker compose up
```

> **Warning:** The default `docker-compose.yml` uses placeholder passwords (`wordpress`, `somewordpress`). These are for local development only. Never use these defaults in a production or internet-facing deployment.

### Environment variables

The block namespace and category are configured via constants exported from `@devgateway/dvz-wp-commons`:

- `BLOCKS_NS` — WordPress block namespace (e.g. `viz`)
- `BLOCKS_CATEGORY` — WordPress block category slug

When extending this project, import these constants rather than hardcoding strings:

```js
import { BLOCKS_NS, BLOCKS_CATEGORY } from '@devgateway/dvz-wp-commons';
```

---

## Branching Model

- `main` is the stable branch and the base for all pull requests.
- Create a feature branch off `main` for every change: `task/short-description` or `fix/short-description`.
- Do not push directly to `main`.

---

## Making Changes

1. Fork the repository and create a branch off `main`.
2. Make your changes and ensure all tests and linting pass.
3. Run `pnpm changeset` to document your change (see [Changesets](#changesets-versioning)).
4. Open a pull request against `main`.

---

## Code Style

This project uses `@wordpress/scripts` for linting and formatting.

```bash
# Lint JavaScript/TypeScript
pnpm lint

# Format code
pnpm format
```

Please ensure your changes pass linting before opening a PR.

---

## Changesets (versioning)

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and changelog generation.

After making any change that should appear in a changelog (features, fixes, breaking changes):

```bash
pnpm changeset
```

Follow the interactive prompts to select the affected packages and describe the change. Commit the generated changeset file alongside your code changes.

> PRs without a changeset file will not trigger a version bump or changelog entry.

---

## Opening a Pull Request

- Target branch: `main`
- At least one reviewer approval is required before merging.
- All CI checks must pass.
- Include a changeset file for any user-facing change.
- Do not introduce hardcoded credentials, internal URLs, client-specific identifiers, or PII.
- Ensure any new npm dependency has a GPL-compatible license (MIT, BSD, ISC, Apache-2.0, LGPL, or GPL).

---

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project: **GPL-2.0-or-later**.

---

## Security

Please do not report security vulnerabilities through public GitHub issues. See [SECURITY.md](SECURITY.md) for the responsible disclosure process.
