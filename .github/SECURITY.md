# Security Policy

## Supported Versions

Only the latest release on the `main` branch receives security fixes.

| Version | Supported |
|---------|-----------|
| Latest (main) | Yes |
| Older releases | No |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues, pull requests, or discussions.**

To report a vulnerability privately, use the following method:

### GitHub Private Vulnerability Reporting (preferred)

Use GitHub's built-in [private vulnerability reporting](https://github.com/devgateway/data-viz-wordpress/security/advisories/new) feature. Your report will be visible only to repository maintainers.

## What to Expect

- **Acknowledgement:** within 5 business days of receipt
- **Status update:** within 15 business days
- **Fix timeline:** depends on severity; critical issues are prioritized
- **Credit:** reporters will be credited in the security advisory unless they request anonymity

## Scope

This policy covers vulnerabilities in code maintained in this repository:

- `plugins/wp-react-blocks-plugin`
- `plugins/wp-react-custom-api`
- `plugins/wp-react-custom-multilang`
- `plugins/wp-react-custom-rest-menu`
- `packages/commons`
- `packages/create-wp-customizer`
- `packages/upgrade-wp-customizer`
- `wp-theme/`

### Out of Scope

- Vulnerabilities in third-party plugins listed in `plugins-required.md` — report these to their respective maintainers.
- WordPress core vulnerabilities — report to the [WordPress security team](https://wordpress.org/about/security/).
- Vulnerabilities only exploitable with administrator-level access to the WordPress installation.
