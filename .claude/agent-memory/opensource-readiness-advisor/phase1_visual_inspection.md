---
name: Phase 1 findings — visual inspection
description: Results of the initial manual sensitive data scan performed on 2026-04-21; items cleared and items requiring follow-up
type: project
---

**Date of inspection:** 2026-04-21
**Inspector:** Claude (automated visual scan via agent)
**Phase:** Phase 1 — Sanitize and Remove Sensitive Data (Initial Review)

## CLEARED — No issues found

- No `.env` file present in working tree (`.gitignore` correctly lists `.env`)
- No `wp-config.php` present (WordPress runtime config is injected via Docker env vars — correct pattern)
- No private keys, certificates, or PEM files anywhere in the tree
- No `.sql` database dumps
- No hardcoded AWS/GCP/Azure credentials or API key patterns in source files
- GitHub Actions workflows use `${{ secrets.GITHUB_TOKEN }}` (automatic, safe) and `${{ vars.DOCKER_REGISTRY }}` (a repo variable, not a secret) — no hardcoded registry hostnames found even in earliest workflow commits
- Docker Compose files use placeholder credentials (`wordpress`/`wordpress`, root password `somewordpress`) — clearly development-only defaults, not real credentials
- `nginx/nginx.conf` — clean, no credentials, no internal hostnames
- `custom/custom.ini` — only upload limits and PHP security settings
- `custom/_function.php` — empty file (just `<?php`)
- `packages/commons/src/APIConfig.jsx` and `APIutils.js` — no hardcoded endpoints
- No internal IP addresses (192.168.x, 10.x, 172.16-31.x) in source files
- No internal hostnames (`.internal`, `.local`, `.corp`) in source files
- Deleted `.env` files confirmed to contain only two non-sensitive build variables (`BLOCKS_CATEGORY=wp-react-lib-blocks`, `BLOCKS_NS=viz`/`viz-components`/`tcdi-components`) — no real secrets

## REQUIRES ATTENTION — Items to investigate further

### MEDIUM — Docker Compose default credentials in git history
`docker-compose.yml` and `docker-compose.override.yml` contain `WORDPRESS_DB_PASSWORD: wordpress` and `MYSQL_ROOT_PASSWORD: somewordpress`. These are obviously development defaults, not real credentials. However, if any deployment ever used this compose file directly against a real database with these passwords, that would be a separate operational issue. **The values themselves are safe to publish** but add a comment in the README warning users to change all passwords before production deployment.

### LOW — Third-party email address in bundled plugin
`plugins/wp-react-custom-multilang/includes/admin/settings/class-wpm-settings-support.php` (line 48) and `class-wpm-ajax.php` (lines 294, 376) contain `team@magazine3.in` — this is a support email from the upstream WP Multilang plugin (magazine3 is the original publisher). Not a team secret, but publishing it as-is means you are redistributing a third party's support email in your fork. Recommend removing or replacing the support email panel entirely.

### LOW — Jira URL in a code comment
`plugins/wp-react-blocks-plugin/blocks/charts/Sort.jsx` line 22 contains `https://devgateway.atlassian.net/browse/TCDIKE-767` — an internal Jira ticket reference in a comment. This is not a security issue but exposes the internal project management tool URL. Recommend removing or replacing this comment before publication.

### LOW-MEDIUM — "alive/" block namespace inconsistency in big-filter
`plugins/wp-react-blocks-plugin/blocks/big-filter/BlockEdit.js` and `index.js` register a block as `alive/big-filter` rather than using the `BLOCKS_NS` variable like all other blocks. The string `alive` appears to be a leftover from a previous project name or client project. This is not a security issue but is a potential reputational/attribution concern. Confirm with the team whether `alive` is a prior client project name that should be scrubbed.

### INFO — TCDI project code references in commit messages and filenames
Commit messages reference `TCDICORE-*` and `TCDIKE-*` Jira tickets. These are internal project tracking references. They are in git history and cannot be removed without a full history rewrite. Assess whether the client name "TCDI" should be hidden before making the repo public; if so, `git-filter-repo` would need to rewrite commit messages (complex and lossy).

### INFO — `wp-react-custom-multilang` is a modified fork
The plugin header says `(DO NOT UPDATE THIS PLUGIN)` and author is listed as `TCDI Team` but the original is from `ahmedkaludi/wp-multilang`. This is a bundled fork. The license compatibility must be verified in Phase 2 (it declares GPL2).

## Next step
Run Gitleaks to complete the automated portion of Phase 1 initial review:
`gitleaks detect --source . --report-format json --report-path gitleaks-report.json`
