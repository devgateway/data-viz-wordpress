# @devgateway/upgrade-wp-customizer

Upgrade and modernize your WordPress Customizer projects to use the latest block-based structure and best practices, with automated code transformations and dependency management.

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

You can run the tool from anywhere by specifying the target folder, or navigate to your project root and run without arguments:

```bash
# Specify a target folder (relative or absolute path)
npx @devgateway/upgrade-wp-customizer custom/wp-customizer

# Relative path
npx @devgateway/upgrade-wp-customizer ../other-project

# Run in current directory
npx @devgateway/upgrade-wp-customizer


# With force flag
npx @devgateway/upgrade-wp-customizer custom/wp-customizer --force
```

### Arguments

- `[folder]` (optional)
  Path to the WordPress Customizer project directory. Can be a relative or absolute path.
  Defaults to the current directory (`.`) if not specified.

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

- Before migration starts, a backup directory is created in the same parent directory as your target folder (e.g., `custom/wp-customizer-backup-[timestamp]`).
- If you cancel during the migration, your original project is automatically restored from backup.
- If anything goes wrong, you can manually restore from the backup directory created at the start of the process.
- The backup is automatically deleted after a successful migration.


## Requirements

- Node.js v20+ recommended.
- Your project should be under git version control for safety checks.



## License

GPL-2.0-or-later — see the [LICENSE](../../LICENSE) file for details.

---
