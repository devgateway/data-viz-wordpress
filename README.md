# Data Viz WordPress Monorepo

Welcome to the **Data Viz WordPress** repository. This project is a monorepo managed with `pnpm` that houses the WordPress theme, custom plugins, and shared React blocks used across the Data Viz ecosystem.

## 🚀 Overview

This repository is designed to streamline the development and deployment of WordPress-based data visualization dashboards. It leverages modern tooling like `pnpm` workspaces and `@wordpress/scripts` to build high-performance, interactive blocks and plugins.

## 📂 Project Structure

```text
data-viz-wordpress/
├── custom/           # Custom Docker configurations
├── packages/         # Shared NPM packages (commons, builders)
├── plugins/          # Custom WordPress plugins and Gutenberg blocks
├── wp-theme/         # Custom WordPress theme (dg-semantic)
├── Dockerfile        # Production WordPress build configuration
└── pnpm-workspace.yaml
```

### Key Components

- **`packages/commons`**: Shared utilities and logic for WordPress integration.
- **`plugins/wp-react-blocks-plugin`**: The core plugin for custom React-based Gutenberg blocks.
- **`wp-theme/dg-semantic`**: A custom WordPress theme tailored for data viz layouts.

## 🛠 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v22+)
- [pnpm](https://pnpm.io/) (v10+)
- [Docker](https://www.docker.com/) (for containerized environment)

### Installation

Install all dependencies across the workspace:

```bash
pnpm install
```

### Development

To build all packages and plugins in development mode with watchers (if configured):

```bash
pnpm recursive run dev
```

## 🏗 Build & Release

### Manual Build

Build all packages and plugins for production:

```bash
pnpm run build
```

### Release Workflow

This project uses **Changesets** for versioning and releases:

- To add a new version change: `pnpm changeset`
- To version packages: `pnpm version`

## 🐳 Dockerization

The project includes a multi-stage Dockerfile that:
1. Builds all JS/React assets.
2. Packages them into a lightweight WordPress FPM image.
3. Optimizes the `wp-content` directory into a tarball for easy deployment.

Build the image locally:

```bash
docker build -t data-viz-wordpress .
```

## 🧩 Required External Plugins

The following plugins are required for full functionality (documented in `plugins-required.md`):

- **Advanced Custom Fields (ACF)**
- **WP Multilang**
- **Custom Post Type UI**
- **Yoast SEO**
- ... and others listed in the supplementary documentation.

---
Developed by **Development Gateway**
