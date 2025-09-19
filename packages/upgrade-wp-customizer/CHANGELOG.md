# @devgateway/upgrade-wp-customizer

## 1.1.0

### Minor Changes

- [#45](https://github.com/devgateway/data-viz-wordpress/pull/45) [`bb51401`](https://github.com/devgateway/data-viz-wordpress/commit/bb51401482f77e9f275c454ba0d7dab8231c269b) Thanks [@timothygachengo](https://github.com/timothygachengo)! - - Update licenses
  - Internal improvements

## 1.0.2

### Patch Changes

- [#30](https://github.com/devgateway/data-viz-wordpress/pull/30) [`457fed6`](https://github.com/devgateway/data-viz-wordpress/commit/457fed61e0f378fe84f41678e3ff37b8fc26c41b) Thanks [@timothygachengo](https://github.com/timothygachengo)! - Fix Deletion logic in the script

## 1.0.1

### Patch Changes

- [#23](https://github.com/devgateway/data-viz-wordpress/pull/23) [`599ef82`](https://github.com/devgateway/data-viz-wordpress/commit/599ef8241283219e1e31e2f641acca035fbb7e9f) Thanks [@timothygachengo](https://github.com/timothygachengo)! - Fix file path in npm assets

## 1.0.0

### Patch Changes

- [#18](https://github.com/devgateway/data-viz-wordpress/pull/18) [`e9d753d`](https://github.com/devgateway/data-viz-wordpress/commit/e9d753d7f2a589a998b789a6a2805b0a516da64d) Thanks [@timothygachengo](https://github.com/timothygachengo)! - - Initial release of `@devgateway/upgrade-wp-customizer`.
  - Automated migration tool for upgrading legacy WordPress Customizer projects to a modern block-based structure.
  - Backs up the project before making changes, with rollback support on cancel.
  - Transforms import paths to use `@devgateway/dvz-wp-commons` and updates environment variable usage.
  - Copies and merges template files (JS, PHP, CSS, config) into the project.
  - Prompts for dependency installation in the new `blocks` directory (npm, yarn, pnpm, or skip).
  - CLI-based, interactive, and checks for uncommitted git changes for safety.
  - Deletes unused files from the project root.
  - Converts CommonJS `require` statements in `blocks/index.js` or `index.jsx` to ES imports.
  - Cleans up backup after successful migration.
  - Fix typescript output for `@devgateway/create-wp-customizer`
