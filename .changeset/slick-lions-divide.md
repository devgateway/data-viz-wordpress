---
"@devgateway/upgrade-wp-customizer": patch
"@devgateway/create-wp-customizer": patch
---

- Initial release of `@devgateway/upgrade-wp-customizer`.
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
