=== Tailwind Classes for Gutenberg ===
Contributors: devgateway
Tags: gutenberg, tailwind, css, block-editor
Requires at least: 6.4
Tested up to: 7.1
Requires PHP: 8.0
Stable tag: 0.1.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Type Tailwind CSS utility classes onto any Gutenberg block, with autocomplete, live editor preview, and frontend output.

== Description ==

Adds a "Tailwind Classes" panel to every block's inspector sidebar. Classes typed there apply live in the editor canvas and are carried through to the saved markup, so the block looks the same while editing and once published.

This is a text field with autocomplete for people who already know Tailwind — not a visual style builder, and not a theme. It ships with no Tailwind Preflight reset by default, since that would visibly conflict with most themes' own base styles.

= How the two halves work =

* **Editor preview**: `@tailwindcss/browser` runs inside the post-editor iframe and compiles utilities from whatever classes are actually present in the canvas, live, as you type.
* **Frontend output**: this deployment has no Node.js runtime, so there is no server-side compile step. The editor's own compiled CSS is uploaded to a REST endpoint on save and written to a hashed file in `wp-content/uploads/twg/`. Since WordPress is used headless here, that file's URL is exposed via `GET /wp-json/twg/v1/css` for the external frontend application to link to directly — there's no `wp_enqueue_style()` frontend page to attach it to. A `cdn` mode is also available, where the frontend app compiles Tailwind itself from the class-bearing HTML it already receives.

== Installation ==

1. This plugin lives in `plugins/tailwind-gutenberg/` in the `data-viz-wordpress` monorepo and is built as part of its normal pnpm workspace build.
2. Activate it like any other plugin.
3. Visit Settings → Tailwind Classes to choose a frontend mode and review the class index.

== Frequently Asked Questions ==

= Why is there no "Rebuild CSS" button? =

There's no server-side Tailwind compiler in this deployment at all — the frontend stylesheet is always whatever the block editor most recently compiled and uploaded. Opening and saving any post refreshes it. "Rebuild index" (which only rescans which classes exist across your content) is still available.

= Does this include Tailwind's Preflight reset? =

Not by default — it resets default margins, borders, and typography, which usually conflicts with the active theme. It can be turned on in Settings → Tailwind Classes for both the editor and, once uploaded, the frontend stylesheet.

= What happens to my classes if I deactivate or delete the plugin? =

Deactivating stops the compiled stylesheet from being served, but every class stays exactly where it is in your post content. Deleting the plugin also leaves post content untouched; it only optionally removes the generated files and settings, and only if "Delete generated files and settings when this plugin is deleted" was turned on beforehand.

== Development ==

= File layout =

* `src/` — PHP, namespaced `Twg\`, autoloaded via the committed `vendor/` (Composer PSR-4, no third-party packages — there's no Composer step in this monorepo's Docker build, so `vendor/` is committed rather than generated).
* `js/editor.js`, `js/canvas.js`, `js/worker.js` — the three build entries (inspector panel/attributes, iframe live preview, autosuggest matching).
* `js/components/` — React components used by `editor.js`.
* `tools/generate-index.mjs` — generates `assets/class-index.json`. Slow (compiles thousands of candidates against Tailwind's real compiler) and its output is committed, so it's run manually, not as part of `build`.

= Building =

From the monorepo root:

`pnpm --filter="tailwind-gutenberg" build` — builds all three JS entries and copies the `@tailwindcss/browser` vendor bundle into `build/`.
`pnpm --filter="tailwind-gutenberg" start` — the same, in watch mode.
`pnpm --filter="tailwind-gutenberg" lint:js` — ESLint/Prettier via `wp-scripts`.
`pnpm --filter="tailwind-gutenberg" build:index` — regenerates `assets/class-index.json`. Only needs re-running if the candidate list in `tools/generate-index.mjs` changes; review the diff before committing it.

If `composer.json` ever changes (new dependency, PSR-4 mapping change), regenerate the committed autoloader from `plugins/tailwind-gutenberg/`: `composer install` (or `composer dump-autoload` for a mapping-only change).

= REST routes =

* `GET /wp-json/twg/v1/css` — current compiled stylesheet's `{ url, hash, updated_at }`. Public; returns `{}` if "Load on frontend" is off.
* `POST /wp-json/twg/v1/css` — `{ css }`, writes it to `wp-content/uploads/twg/`. Requires `edit_posts`; this is what `canvas.js` calls after a save, not something to call by hand.

= Testing =

There's no automated test suite. Verification during development used an isolated, throwaway WordPress instance (`wordpress:php8.2-apache` + wp-cli, brought up via a scratch `docker-compose.yml` — not this repo's own `docker-compose.yml`, and never the shared dev stack) exercised through actual browser interaction, plus standalone PHP scripts stubbing the relevant WP functions to check pure logic (block-tree recursion, file hashing/pruning, settings sanitization) without needing a live database. `php -l` and `pnpm lint:js` catch syntax/style issues; neither substitutes for opening the block editor.

== Changelog ==

= 0.1.0 =
Initial implementation: block attribute and inspector panel, live editor preview, frontend CSS upload pipeline, autocomplete index and token field, dynamic block support, settings page.
