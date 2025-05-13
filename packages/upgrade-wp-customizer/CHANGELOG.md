# @devgateway/upgrade-wp-customizer

## 1.0.1

### Patch Changes

- [#18](https://github.com/devgateway/data-viz-wordpress/pull/18) [`e9d753d`](https://github.com/devgateway/data-viz-wordpress/commit/e9d753d7f2a589a998b789a6a2805b0a516da64d) Thanks [@***REMOVED***](https://github.com/***REMOVED***)! - - Initial release of `@devgateway/upgrade-wp-customizer`.
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
