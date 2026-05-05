# License Selection Policy

This document captures the criteria used to select licenses for dual-licensed third-party
dependencies in GPL-2.0-or-later projects. Apply these rules when updating NOTICE.md or
evaluating new dependencies.

> **Note:** This project is a WordPress plugin and is therefore licensed under
> GPL-2.0-or-later. The compatibility rules here are the **inverse** of an Apache-2.0
> project — see the Apache-2.0 policy in `data-viz-api` for the other context.

---

## Quick Reference

| License options | Choose | Reason |
|---|---|---|
| GPL-2.0 / BSD-3-Clause | **GPL-2.0** | Consistent with GPL ecosystem |
| GPL-2.0 / MIT | **GPL-2.0** | Consistent with GPL ecosystem |
| Apache-2.0 / GPL-2.0 | **GPL-2.0** | Consistent with GPL ecosystem |
| LGPL / anything | **LGPL** | Weak copyleft; keeps more freedoms |
| MIT or BSD only | No choice needed | Always compatible with GPL |

---

## Compatible Licenses (no documentation required)

These licenses are unconditionally compatible with GPL-2.0-or-later and require no
justification in NOTICE.md:

- MIT
- ISC
- BSD-2-Clause, BSD-3-Clause, BSD (informal)
- Apache-2.0 (compatible with GPL-2.0-or-later via the "or later" clause)
- GPL-2.0, GPL-2.0-or-later, GPL-3.0, GPL-3.0-or-later
- LGPL-2.1, LGPL-2.1-or-later, LGPL-3.0, LGPL-3.0-only
- MPL-2.0 (FSF confirmed compatible with GPL)
- CC0-1.0, Public Domain
- 0BSD, Unlicense

---

## Licenses That Require Documentation

Document in NOTICE.md if present, even if compatible:

| License | Reason to document |
|---|---|
| GPL-2.0 (without "or later") | Compatible but worth noting the version constraint |
| Apache-2.0 WITH LLVM-exception | Unusual form; clarify the exception doesn't affect compatibility |
| MPL-2.0 | Less common; confirm compatibility explicitly |
| "SEE LICENSE IN LICENSE" | Ambiguous; verify and document actual license |
| BSD (informal, no version) | Clarify it's BSD-2 or BSD-3 |

---

## Incompatible Licenses (must not be bundled into plugin output)

These licenses are **not compatible** with GPL-2.0-or-later and must not appear in
runtime/bundled dependencies:

| License | Why incompatible |
|---|---|
| EPL-1.0, EPL-2.0 | Copyleft terms conflict with GPL |
| CDDL-1.0, CDDL-1.1 | Copyleft terms conflict with GPL |
| JSON License | "Good, not Evil" clause incompatible with any copyleft |
| Proprietary / Commercial | Cannot be redistributed under GPL |

> **Dev-only exception:** Incompatible licenses in build tools or test runners that are
> never bundled into the plugin output do not create a distribution conflict, but should
> still be documented in NOTICE.md.

---

## WordPress-specific rules

- All WordPress plugins **must** declare `"license": "GPL-2.0-or-later"` in `package.json`
  and include a GPL-2.0-or-later `LICENSE` file.
- Standalone CLI tools in this monorepo (e.g. `create-wp-customizer`,
  `upgrade-wp-customizer`) are not WordPress plugins and may use MIT.
- Template scaffolding packages may use ISC or MIT.
