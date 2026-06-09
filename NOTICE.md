# Third-Party License Notices

This project (Data Viz WordPress) is licensed under the GNU General Public License,
version 2 or later (GPL-2.0-or-later), as required by WordPress.

The following third-party libraries are included or linked as dependencies. Libraries
licensed under MIT, ISC, BSD-2-Clause, BSD-3-Clause, or GPL-2.0-or-later are omitted
as they are straightforwardly compatible with this project's GPL-2.0-or-later license.
Where a library is available under multiple licenses, the license chosen for use in this
project is noted explicitly.

License selection criteria for this project are documented in
[LICENSE-POLICY.md](./LICENSE-POLICY.md).

---

## BSD-3-Clause OR GPL-2.0

### node-forge

- **License chosen:** GPL-2.0 (dual-licensed BSD-3-Clause / GPL-2.0)
- **Used in:** wp-react-blocks-plugin (transitive via @wordpress/scripts)
- **Notes:** GPL-2.0 is chosen for consistency with this project's GPL-2.0-or-later
  license and the broader GPL ecosystem of WordPress dependencies.

---

## Apache-2.0

### mousetrap

- **License:** Apache-2.0 WITH LLVM-exception
- **Used in:** wp-react-blocks-plugin (transitive via @wordpress/components)
- **Notes:** Apache-2.0 is compatible with GPL-2.0-or-later. The LLVM exception is a
  patent retaliation carve-out and does not affect license compatibility.

---

## Mozilla Public License 2.0 (MPL-2.0)

### axe-core

- **License:** MPL-2.0
- **Used in:** transitive via @wordpress/scripts (test/development tooling only; not
  bundled into plugin output)
- **Notes:** MPL-2.0 is compatible with GPL-2.0-or-later per the FSF license list.

---

## LGPL-3.0-only

### rollup-plugin-dts

- **License:** LGPL-3.0-only
- **Used in:** build tooling only (transitive via unbuild); not bundled into plugin output
- **Notes:** LGPL-3.0 is compatible with GPL-2.0-or-later. This is a development-time
  dependency only.

---

## Packages with missing or ambiguous license declarations

### spawndamnit

- **Declared license:** "SEE LICENSE IN LICENSE"
- **Actual license:** MIT (verified from LICENSE file)
- **Used in:** build tooling (transitive via @changesets/cli)
