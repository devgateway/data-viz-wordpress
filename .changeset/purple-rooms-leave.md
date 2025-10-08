---
"@devgateway/upgrade-wp-customizer": patch
---

### Features

- Allow specifying a target folder when running the CLI, e.g. `npx @devgateway/upgrade-wp-customizer custom/wp-customizer`.
- Validate the target directory and show helpful usage when it does not exist.
- Improve intro/confirmation messaging to display the resolved target path.

### Fixes

- Preserve `.git` (and `node_modules`) during rollback to prevent repository deinitialization when cancelling the migration.
- Run safety checks in the intended target directory.
