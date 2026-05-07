# Contributing to data-viz-wordpress

Thank you for your interest in contributing. This project is maintained by [Development Gateway](https://www.developmentgateway.org/) and welcomes contributions from the community.

This is a pnpm monorepo containing WordPress plugins, shared npm packages, and CLI tools for data visualization on WordPress.

Published packages:
- [`@devgateway/dvz-wp-commons`](packages/commons) — shared React components and utilities for WordPress blocks
- [`@devgateway/create-wp-customizer`](packages/create-wp-customizer) — CLI scaffolding tool for new customizer projects
- [`@devgateway/upgrade-wp-customizer`](packages/upgrade-wp-customizer) — CLI upgrade tool for customizer projects

## Table of Contents

- [Development Setup](#development-setup)
- [Branching Model](#branching-model)
  - [Long-running project branches](#long-running-project-branches)
- [Making Changes](#making-changes)
- [Commit Messages](#commit-messages)
- [Code Style](#code-style)
- [Opening a Pull Request](#opening-a-pull-request)
- [License](#license)
- [Security](#security)

---

## Development Setup

### Prerequisites

- Node.js v22+
- pnpm v10+
- Docker (needed to run the full WordPress stack locally)

### Install

```bash
git clone --recurse-submodules git@github.com:devgateway/data-viz-wordpress.git
cd data-viz-wordpress
pnpm install
```

### Secrets scanning (pre-commit hook)

This project uses [Gitleaks](https://github.com/gitleaks/gitleaks) to prevent secrets from being accidentally committed. Install the hook after cloning:

```bash
pip install pre-commit
pre-commit install
```

### Build all packages

```bash
pnpm build
```

### Build only published npm packages

```bash
pnpm build:npm-packages
```

### Run the full WordPress stack

```bash
docker compose up -d
```

---

## Branching Model

- `main` is the stable branch and the base for all pull requests.
- Create a branch off `main` for every change, using a prefix that matches the Conventional Commits type:
  - `feat/short-description`
  - `fix/short-description`
  - `chore/short-description`
  - `docs/short-description`
  - `refactor/short-description`
- For long-running project integrations use `project/short-description` (see below).
- Do not push directly to `main`.

### Long-running project branches

Projects that contribute work incrementally over time can maintain a `project/` branch and merge into `main` via PR when ready. Use a generic description with no client name or internal identifier — e.g. `project/multilingual-blocks`, `project/superset-embedded-charts`. All commits on a `project/` branch must follow the same conventions as any other branch. Only generic, reusable code belongs here — client-specific customisations must stay in the project's own private repository.

---

## Making Changes

### Adding a changeset

Every PR that changes a published package must include a changeset:

```bash
pnpm changeset
```

Select the affected packages, choose the bump type (`major` / `minor` / `patch`), and write a one-line description for the changelog. Commit the generated file alongside your changes.

| Change type | Bump |
|---|---|
| Breaking API change | `major` |
| New component, hook, or feature | `minor` |
| Bug fix, refactor, dependency update | `patch` |

Changes to `plugins/` that are not published to npm do not need a changeset.

---

## Commit Messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/). Use a prefix that reflects the nature of the change:

| Prefix | When to use |
|---|---|
| `feat:` | New block, component, hook, or user-facing feature |
| `fix:` | Bug fix |
| `chore:` | Dependency update, tooling, config |
| `docs:` | Documentation only |
| `refactor:` | Code restructure with no behaviour change |
| `ci:` | CI/CD workflow changes |

For breaking changes append `!` to the prefix, and add a `BREAKING CHANGE:` footer in the commit body:

```
feat(dvz-wp-commons)!: rename block attribute

BREAKING CHANGE: the `dataSource` attribute on FilterBlock has been renamed to `data-source`
```

Examples:
```
feat(dvz-wp-commons): add grouped-bar chart block
fix(wp-react-blocks-plugin): correct SSR guard in usePost
chore: upgrade @wordpress/scripts to 30.1.0
ci: add changeset check to test-pr workflow
```

---

## Code Style

- TypeScript for all new source files in published packages
- Keep components generic — no application-specific or client-specific logic
- No inline comments unless the reason is non-obvious
- Keep blocks and components focused; avoid adding features beyond what the PR describes

---

## Opening a Pull Request

**External contributors:** fork the repo, create a branch off `main` on your fork, then open a PR.

**Organisation members:** create a branch directly in this repo off `main` — forking is not required.

1. Create a branch off `main` (see [Branching Model](#branching-model))
2. Make your changes and add a changeset if a published package was modified (see above)
3. Ensure `pnpm build` passes locally — CI runs the same check
4. Open a PR against `main` with a clear description of what changed and why
5. At least one maintainer approval is required before merging
6. All CI checks must pass

Do not introduce hardcoded credentials, internal URLs, client-specific identifiers, or PII. Ensure any new dependency has an Apache-2.0-compatible license.

---

## License

By contributing you agree that your contributions are licensed under the [Apache License 2.0](LICENSE).

---

## Security

Please do not report security vulnerabilities through public GitHub issues. See [SECURITY.md](SECURITY.md) for the responsible disclosure process.
