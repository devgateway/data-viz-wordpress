---
name: Project overview
description: Core facts about this repository — stack, owner, structure, and open source intent
type: project
---

**Repository:** `data-viz-wordpress` at `/Volumes/External/projects/data-viz-wordpress`
**Owner / maintainer:** Development Gateway (`devgateway` GitHub org)
**Primary contact explored:** Timothy Mugo (tmugo@developmentgateway.org), git author seen in commits
**Git user in this session:** Sebastian Dimunzio (sdimunzio@gmail.com)

**Stack:** pnpm monorepo — PHP (WordPress plugins + theme), React/TypeScript (Gutenberg blocks), Docker (multi-stage build, nginx + wordpress:fpm-alpine + mariadb)

**Key directories:**
- `packages/` — published npm packages under `@devgateway/` scope (commons, create-wp-customizer, upgrade-wp-customizer)
- `plugins/` — four WordPress plugins (wp-react-blocks-plugin, wp-react-custom-api, wp-react-custom-multilang, wp-react-custom-rest-menu)
- `wp-theme/` — custom theme `dg-semantic`
- `.github/workflows/` — CI/CD for Docker image builds and npm releases via GitHub Actions
- `custom/` — PHP runtime INI override

**License file present:** Yes — `LICENSE` at repo root (content not yet verified for which license)
**README present:** Yes — well-structured, describes architecture and usage

**Why:** Project is being prepared for open source publication; Phase 1 visual inspection performed on 2026-04-21.
**How to apply:** Frame all future guidance around this specific stack. Docker credentials use `vars.DOCKER_REGISTRY` (a GitHub repo variable, not a secret), which is appropriate.
