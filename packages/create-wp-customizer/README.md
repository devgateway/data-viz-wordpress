# @devgateway/create-wp-customizer

Scaffold a new Data Visualization WordPress Customizer project with a single command.

[![npm version](https://img.shields.io/npm/v/@devgateway/create-wp-customizer.svg)](https://www.npmjs.com/package/@devgateway/create-wp-customizer)
[![GPL-2.0-or-later License](https://img.shields.io/badge/license-GPL--2.0--or--later-blue.svg)](https://github.com/devgateway/data-viz-wordpress/blob/main/LICENSE)

## Overview

`create-wp-customizer` generates a ready-to-develop WordPress plugin project pre-wired with Gutenberg block infrastructure, `@devgateway/dvz-wp-commons`, and a Webpack build pipeline. It supports both JavaScript and TypeScript project templates.

## Prerequisites

- Node.js 22+
- pnpm, npm, or yarn

## Usage

Run with `npx` — no installation required:

```bash
npx @devgateway/create-wp-customizer
```

Or install globally:

```bash
npm install -g @devgateway/create-wp-customizer
create-wp-customizer
```

## Interactive Prompts

The CLI will ask:

1. **Project name** — used as the plugin directory name and WordPress plugin slug
2. **Template** — choose between JavaScript (`template-js`) or TypeScript (`template-ts`)

After confirming, the tool generates the project structure. Install dependencies afterward using the commands in [After Scaffolding](#after-scaffolding).

## Generated Structure

```
my-plugin/
├── blocks/
│   ├── index.php          # Registers blocks and enqueues scripts
│   ├── webpack.config.js  # Webpack config for block JS
│   ├── package.json       # Block dependencies including @devgateway/dvz-wp-commons
│   ├── editor.css         # Block editor styles
│   └── style.css          # Block frontend styles
└── index.php              # Main plugin entry point
```

## After Scaffolding

```bash
cd my-plugin/blocks
pnpm install      # or npm install / yarn
pnpm build        # compile blocks
```

Then copy the plugin directory into your WordPress `wp-content/plugins/` and activate it from the WordPress admin.

## Related Packages

- [`@devgateway/dvz-wp-commons`](../commons/README.md) — shared React components and utilities
- [`@devgateway/upgrade-wp-customizer`](../upgrade-wp-customizer/README.md) — migrate an existing project to the latest structure

## License

GPL-2.0-or-later — see the [LICENSE](../../LICENSE) file for details.
