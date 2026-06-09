# data-viz-wordpress

A **pnpm monorepo** that packages all WordPress plugins, themes, shared npm libraries, and CLI tools required to run a **Data Visualization dashboard** on WordPress. It is maintained by Development Gateway and produces both published npm packages and a Docker image for self-hosted deployments.

---

## Table of Contents

- [Overview](#overview)
- [Repository Structure](#repository-structure)
- [Packages](#packages)
- [Plugins](#plugins)
- [Theme](#theme)
- [Docker Image](#docker-image)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Release Management](#release-management)
- [CI/CD](#cicd)
- [Contributing & Support](#contributing--support)
- [License](#license)

---

## Overview

This repository brings together everything needed to extend a WordPress site into a full-featured data visualization platform:

| Layer | What lives here |
|---|---|
| **React / Gutenberg blocks** | Custom blocks that embed charts, maps, and filters directly in the WordPress editor |
| **REST API extensions** | Custom endpoints that feed data to those blocks |
| **Multilingual support** | Full i18n layer via a bundled WP Multilang plugin |
| **Shared npm packages** | Reusable React components and utility types published to npm under `@devgateway/` |
| **Scaffolding CLIs** | `create-wp-customizer` and `upgrade-wp-customizer` for bootstrapping new customizer projects |
| **Custom WordPress theme** | `dg-semantic` — a block-compatible theme pre-wired for data viz pages |
| **Docker image** | A ready-to-run `wordpress:fpm-alpine`-based image with all plugins and the theme pre-installed |

---

## Repository Structure

```
data-viz-wordpress/
├── packages/                      # Published npm packages
│   ├── commons/                   # @devgateway/dvz-wp-commons
│   ├── create-wp-customizer/      # @devgateway/create-wp-customizer CLI
│   └── upgrade-wp-customizer/     # @devgateway/upgrade-wp-customizer CLI
├── plugins/                       # WordPress plugins (pnpm workspace members)
│   ├── wp-react-blocks-plugin/    # Gutenberg blocks for data visualization
│   ├── wp-react-custom-api/       # Custom REST API endpoints
│   ├── wp-react-custom-multilang/ # Multilingual plugin (WP Multilang fork)
│   └── wp-react-custom-rest-menu/ # Menu REST API endpoints
├── wp-content/                    # Third-party plugins and language files
├── wp-theme/                      # dg-semantic WordPress theme
├── custom/                        # PHP runtime config (upload limits, etc.)
├── Dockerfile                     # Multi-stage production image
├── wordpress.sh                   # Container entrypoint script
├── pnpm-workspace.yaml
└── package.json
```

---

## Packages

All packages are versioned and released with [Changesets](https://github.com/changesets/changesets) and published to npm under the `@devgateway` scope.

### `@devgateway/dvz-wp-commons`

> `packages/commons`

Shared React components and utilities used across the Gutenberg blocks. Includes:

- **API & data configuration** — `APIConfig`, `CSVSourceConfig`, `DataFilters`
- **Chart primitives** — `ChartColors`, `ChartLegends`, `ChartMeasures`, `Tooltip`, `Format`
- **Block editor helpers** — `BlockEditWithAPIMetadata`, `BlockEditWithFilters`, `ComponentWithSettings`

Built with TypeScript; exports both JS and `.d.ts` type definitions.

### `@devgateway/create-wp-customizer`

> `packages/create-wp-customizer`

CLI (`create-wp-customizer`) that scaffolds a new WordPress customizer project from an interactive prompt. Uses `@clack/prompts` for the UX and `cross-spawn` to bootstrap the project.

### `@devgateway/upgrade-wp-customizer`

> `packages/upgrade-wp-customizer`

CLI that upgrades an existing customizer project to the latest conventions. Parses and transforms existing source files using `@babel/parser`.

---

## Plugins

### `wp-react-blocks-plugin`

The core plugin. Contains all custom [Gutenberg blocks](https://developer.wordpress.org/block-editor/) built with React and [`@wordpress/scripts`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/). Each block is a self-contained React component that fetches data from the REST API and renders charts, maps, or filter controls.

**Environment variables consumed at build time:**

| Variable | Default | Description |
|---|---|---|
| `BLOCKS_CATEGORY` | `wp-react-lib-blocks` | Block category slug in the editor |
| `BLOCKS_NS` | `viz` | Namespace prefix for block names |

### `wp-react-custom-api`

Extends the WordPress REST API with custom endpoints required by the data viz blocks. Register your data sources here.

### `wp-react-custom-multilang`

A bundled fork of [WP Multilang](https://wordpress.org/plugins/wp-multilang/) with configuration for the data viz content types. Provides per-language versions of posts, terms, meta, menus, and widgets — without creating duplicate database rows.

> **Note:** This plugin is excluded from the pnpm workspace because it has no npm build step.

### `wp-react-custom-rest-menu`

Adds REST endpoints for WordPress nav menus:

| Endpoint | Description |
|---|---|
| `GET /menus/v1/menus` | List all registered menus |
| `GET /menus/v1/menus/{slug}` | Get a single menu by slug or ID |
| `GET /menus/v1/locations` | List all menu locations |
| `GET /menus/v1/locations/{slug}` | Get the menu assigned to a location |

Compatible with ACF menu attributes and the Menu Image plugin.

---

## Theme

### `dg-semantic`

> `wp-theme/` → deployed to `wp-content/themes/dg-semantic/`

A custom block-compatible WordPress theme built for data visualization pages. Key features:

- `theme.json` v2 — spacing, font sizes, and layout tokens
- WP Multilang integration (`wpm-config.json`)
- Custom post type and taxonomy registration
- ACF field registration (`_custom_fields.php`)
- Custom admin styles and MIME type support (SVG, etc.)

---

## Docker Image

The repository ships a multi-stage `Dockerfile` that produces a minimal, production-ready image.

| Stage | Base image | What it does |
|---|---|---|
| `base` | `node:22-slim` | Sets up pnpm / corepack |
| `installer` | — | `pnpm install --frozen-lockfile` |
| `builder` | — | Builds all npm packages and plugins; assembles `wp-content/` |
| `runtime` | `wordpress:6.8.2-fpm-alpine` | Copies PHP config, `wp-content.tgz`, and entrypoint |

The final image exposes ports **80** and **443** and runs via `php-fpm`.

### Entrypoint: `wordpress.sh`

On startup the script:

1. Extracts `/tmp/wp-content.tgz` into the WordPress root (skipped when `SKIP_WP_UPDATE=1`).
2. Delegates to the official WordPress Docker entrypoint.
3. Sets write permissions on `wp-content/uploads/`.

**Development tip:** Set `SKIP_WP_UPDATE=1` to mount your local `wp-content/` without it being overwritten on every restart.

---

## Getting Started

### Prerequisites

- [Node.js 22+](https://nodejs.org/)
- [pnpm 10+](https://pnpm.io/) (`corepack enable && corepack prepare pnpm@latest --activate`)
- [Docker](https://www.docker.com/) (for the full WordPress stack)

### Install dependencies

```bash
pnpm install
```

### Build all packages and plugins

```bash
pnpm build
```

### Build only the npm packages

```bash
pnpm build:npm-packages
```

### Run with Docker

```bash
docker build -t data-viz-wordpress .
```

> **Warning — Production Deployments:** The default `docker-compose.yml` uses placeholder credentials (`WORDPRESS_DB_PASSWORD: wordpress`, `MYSQL_ROOT_PASSWORD: somewordpress`). These are for local development only. Before any internet-facing deployment, replace all default passwords with strong, unique values.

---

## Scripts

| Script | Description |
|---|---|
| `pnpm build` | Build every workspace member recursively |
| `pnpm build:npm-packages` | Build only the published npm packages |
| `pnpm version` | Bump versions from pending changesets (`changeset version`) |
| `pnpm release` | Publish packages to npm (`changeset publish`) |

---

## Release Management

Versioning is handled by [Changesets](https://github.com/changesets/changesets).

1. After making changes, run `pnpm changeset` and follow the prompts to describe what changed.
2. When ready to release, run `pnpm version` to apply version bumps and update changelogs.
3. Run `pnpm release` (or let CI do it) to publish to npm.

Changelogs are generated in GitHub format and linked to the `devgateway/data-viz-wordpress` repository.

---

## CI/CD

Three GitHub Actions workflows live in `.github/workflows/`:

| Workflow | Trigger | What it does |
|---|---|---|
| `build-and-release-wordpress.yml` | Manual dispatch | Builds the Docker image and pushes it to the registry with a semantic version tag |
| `build-and-pre-release-wordpress.yml` | Manual dispatch | Same, but for pre-release tags |
| `release-npm-packages.yml` | Push to `main` (packages/\* or .changeset/\* changed) or manual dispatch | Publishes updated npm packages via Changesets |

Dependabot is configured to open weekly PRs for npm dependency updates (max 1 open at a time).

---

## Contributing & Support

Contributions are welcome. Please read [CONTRIBUTING.md](.github/CONTRIBUTING.md) before opening a pull request.

| Channel | Purpose |
|---------|---------|
| [GitHub Issues](https://github.com/devgateway/data-viz-wordpress/issues) | Bug reports and feature requests |
| [GitHub Discussions](https://github.com/devgateway/data-viz-wordpress/discussions) | Questions and general discussion |
| [info@developmentgateway.org](mailto:info@developmentgateway.org) | Direct contact with the Development Gateway team |
| [SECURITY.md](.github/SECURITY.md) | Reporting security vulnerabilities privately |

This project is maintained by [Development Gateway](https://www.developmentgateway.org/).

---

## License

GPL-2.0-or-later — see [LICENSE](./LICENSE).
