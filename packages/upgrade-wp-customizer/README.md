# @devgateway/upgrade-wp-customizer

Upgrade and modernize your WordPress Customizer projects to use the latest block-based structure and best practices, with automated code ***REMOVED*** and dependency management.

## Features

- **Automated migration** of legacy WordPress Customizer projects to a modern block-based structure.
- **Transforms import paths** to use `@devgateway/dvz-wp-commons` and updates environment variable usage.
- **Copies and merges template files** (JS, PHP, CSS, config) into your project.
- **Backs up your project** before making changes, with easy rollback on cancel.
- **Prompts for dependency installation** in the new `blocks` directory.


## Installation

```bash
npm install -g @devgateway/upgrade-wp-customizer
# or
yarn global add @devgateway/upgrade-wp-customizer
# or
pnpm add -g @devgateway/upgrade-wp-customizer
```


## Usage

Navigate to the root of your WordPress Customizer project and run:
```bash
npx @devgateway/upgrade-wp-customizer
```

### Options

- `--force`  
  Proceed even if your git directory has uncommitted changes.


## What does it do?

1. **Backs up your project** (creates a backup directory with a timestamp).
2. **Checks for uncommitted git changes** (unless `--force` is used).
3. **Prompts for confirmation** before making changes.
4. **Copies template files** (from the package's `template/` updated directory) into your project, including:
   - `blocks/` directory with a modern block setup (JS, PHP, CSS, Webpack config, etc.)
   - Updated `index.php` and other supporting files.
5. **Transforms your source files**:
   - Updates import paths for commons and icons to use `@devgateway/dvz-wp-commons`.
   - Replaces `process.env.BLOCKS_NS` and `process.env.BLOCKS_CATEGORY` with direct imports.
   - Converts CommonJS `require` statements in `blocks/index.js` or `index.jsx` to ES imports.
6. **Deletes unused files**.
7. **Prompts you to install dependencies** in the new `blocks` directory (supports npm, yarn, pnpm, or skip).
8. **Cleans up the backup** if migration is successful.


## After Migration

- Your project will have a new `blocks/` directory with a modern block setup.
- All relevant imports will use `@devgateway/dvz-wp-commons`.
- You may need to review and test your project to ensure everything works as expected.
- If you skipped dependency installation, run the following in the `blocks/` directory:

  ```bash
  npm install
  npm install @devgateway/dvz-wp-commons
  # or use yarn/pnpm as appropriate
  ```


## Template Structure

The template includes:

- `blocks/`
  - `index.php` – Registers the block and enqueues scripts/styles.
  - `webpack.config.js` – Webpack config for block JS.
  - `package.json` – With recommended dependencies and scripts for block development.
  - `editor.css`, `style.css` – Editor and frontend styles.
- `index.php` – Main entry for the plugin.


## Safety & Rollback

- If you cancel during the migration, your original project is restored from backup.
- If anything goes wrong, you can manually restore from the backup directory created at the start of the process.


## Requirements

- Node.js v20+ recommended.
- Your project should be under git version control for safety checks.



## License

MIT

---
