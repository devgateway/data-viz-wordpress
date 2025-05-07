# @devgateway/dvz-wp-commons

## 1.0.4

### Patch Changes

- [#12](https://github.com/devgateway/data-viz-wordpress/pull/12) [`fda7d1f`](https://github.com/devgateway/data-viz-wordpress/commit/fda7d1f8502b6b45c2f18221b472c8ddf97cbfb0) Thanks [@timothygachengo](https://github.com/timothygachengo)! - Internal Update: Update CI

## 1.0.3

### Patch Changes

- [`69daf22`](https://github.com/devgateway/data-viz-wordpress/commit/69daf2207789b4eea4a9317844f29ec00a8b8d34) Thanks [@timothygachengo](https://github.com/timothygachengo)! - Internal changes: Update CI

## 1.0.2

### Patch Changes

- [#8](https://github.com/devgateway/data-viz-wordpress/pull/8) [`0556d82`](https://github.com/devgateway/data-viz-wordpress/commit/0556d828488e20405e29ed6dde0e01f54e364f12) Thanks [@timothygachengo](https://github.com/timothygachengo)! - # Changelog

  ### ⚙️ Miscellaneous Tasks

  - _(DVIZ-32)_ Fix release config
  - _(DVIZ-32)_ Fix release config
  - _(DVIZ-32)_ Fix release config
  - _(DVIZ-32)_ Fix release config and update publish config
  - _(DVIZ-32)_ Update publish config
  - _(DVIZ-32)_ Update import statements across to use the npm org name. Add a README and license for the commons library
  - _(DVIZ-32)_ Update release config
  - _(DVIZ-32)_ Update release config
  - _(DVIZ-32)_ Update release config

  ## [0.0.1-snapshot-20250507.0] - 2025-05-07

  ### ⚙️ Miscellaneous Tasks

  - _(DVIZ-32)_ Fix release config
  - _(DVIZ-32)_ Fix release config
  - _(DVIZ-32)_ Remove npm plugin from release config

  ## [0.0.1-snapshot-20250506.2] - 2025-05-06

  ### ⚙️ Miscellaneous Tasks

  - _(DVIZ-32)_ Fix github workflow
  - _(DVIZ-32)_ Fix github workflow and add release config

  ## [0.0.1-snapshot-20250506.1] - 2025-05-06

  ### ⚙️ Miscellaneous Tasks

  - _(DVIZ-32)_ Add semantic release plugins
  - _(DVIZ-32)_ Add semantic release plugins

  ## [0.0.1-snapshot-20250506.0] - 2025-05-06

  ### 🚀 Features

  - Complete the skeleton of the wordpress frontend
  - Handle edge cases in measures code
  - Implement disabling x axis in one toggle
  - Update xAxisDisabled from xAxisEnabled
  - Add chart layout toggle to mobile customization settings (#78)
  - Add margins config to mobile customization settings (#80)
  - Add point label feature to line chart
  - Point labels --formating

  ### 🐛 Bug Fixes

  - Interval default value should be the same one set in Y axis settings (#82)
  - Set non-mobile default as default for mobile interval
  - Issues with line graph and prevalence data in wp
  - Hiding and unhiding series bars in french locale
  - Breaking bar charts in drc
  - Bar charts drc
  - Bar charts drc
  - Bar charts drc
  - _(TCDICORE-170)_ Vertical tabs not loading in wp
  - Data and Methods page is not loading in staging
  - Allow line chart to display Point label or not
  - Reset service data type to 'data'
  - _(TCDIZM-289)_ Little change to mobile config to test wordpress updates on build
  - _(TCDICORE-186)_ Remove max tick word length limit

  ### 💼 Other

  - Fix references not displaying in wp editor

  ### 🚜 Refactor

  - _(DVIZ-32)_ Move the commons folder into a standalone library, migrate the commons library to typescript, initialize PNPM workspaces
  - _(DVIZ-22)_ Update folder structure and init pnpm workspace
  - _(DVIZ-22)_ Update folder structure and init pnpm workspace

  ### ⚙️ Miscellaneous Tasks

  - Add logic for hiding and unhiding labels
  - Remove logs
  - Log updated measure labels
  - Handle edge cases around loading of measure and category data
  - Add toggle to enable/disable the customization setting (#79)
  - Customization settings for the pie chart
  - Add ability to hide x, y and right titles to mobile customizer
  - Add override Padding section to mobile customization
  - DVIZ-10 fix wordpress build and update wp-react-blocks-plugin
  - DVIZ-10 add mobile config for charts
  - TCDIET-445 fix map issue
  - TCDICORE-169 fix block api with metadata issue
  - TCDICORE-164 add default mapfile
  - TCDIZM-262: Mobile responsive charts
  - Separate mobile and tablet configs
  - _(DVIZ-22)_ Update the codebase with changes from data-viz-front
  - _(DVIZ-32)_ Fix some issues in the common library. Integrated the commons library into agree-and-download and ailments body. Remove unused files
  - _(DVIZ-32)_ Configure dockerfile for wordpress so that it can run standalone
  - _(DVIZ-32)_ Add upgrades of wp-custom-multilang
  - _(DVIZ-32)_ Update wp-content
  - _(DVIZ-32)_ Update wp-content plugins and themes
  - _(DVIZ-32)_ Update pnpm
  - _(DVIZ-32)_ Migrate back-to-top to typescript
  - _(DVIZ-32)_ Migrate big-number to typescript
  - _(DVIZ-32)_ Migrate big-number-trend to typescript
  - _(DVIZ-32)_ Migrate big-number-trend to typescript
  - _(DVIZ-32)_ Migrate child-pages-navigator to typescript
  - _(DVIZ-32)_ Migrate d3 map to typescript, rename commons library from @dg-data-viz/worpdress-commons to @dg-data-viz/wp-commons, fix missing types in the commons library
  - _(DVIZ-32)_ Migrate data-filters-apply to typescript
  - _(DVIZ-32)_ Migrate data-filters-reset to typescript
  - _(DVIZ-32)_ Add icons and missing types to commons
  - _(DVIZ-32)_ Migrate data-labels to typescript. Remove duplicated plugins in wp-content
  - _(DVIZ-32)_ Migrate download to typescript
  - _(DVIZ-32)_ Migrate featured tabs to typescript, add useSetting hook
  - _(DVIZ-32)_ Migrate filter to typescript
  - _(DVIZ-32)_ Migrate format bar to typescript
  - _(DVIZ-32)_ Migrate inline-list to typescript
  - _(DVIZ-32)_ Remove build folder from git
  - _(DVIZ-32)_ Add @wordpress/a11y dependency to pnpm-lock.yaml
  - _(DVIZ-32)_ Fix typings
  - _(DVIZ-32)_ Migrate map to typescript
  - _(DVIZ-32)_ Migrate measures to typescript
  - _(DVIZ-32)_ Migrate menu to typescript
  - _(DVIZ-32)_ Migrate meta-boxes to typescript
  - _(DVIZ-32)_ Migrate new-time-line to typescript
  - _(DVIZ-32)_ Migrate newsletter to typescript
  - _(DVIZ-32)_ Migrate page-gallery to typescript
  - _(DVIZ-32)_ Migrate page-modules to typescript
  - _(DVIZ-32)_ Migrate parallax-container to typescript
  - _(DVIZ-32)_ Migrate pdf to typescript
  - _(DVIZ-32)_ Migrate pdf-button to typescript
  - _(DVIZ-32)_ Migrate post-carousel to typescript
  - _(DVIZ-32)_ Migrate post-carousel to typescript
  - _(DVIZ-32)_ Migrate prevalence-map to typescript
  - _(DVIZ-32)_ Migrate redirect to typescript
  - _(DVIZ-32)_ Migrate showcase-form to typescript
  - _(DVIZ-32)_ Migrate showcase-form to typescript
  - _(DVIZ-32)_ Migrate tabbed-posts to typescript
  - _(DVIZ-32)_ Migrate time-line to typescript
  - _(DVIZ-32)_ Migrate vertical-featured-tabs to typescript
  - _(DVIZ-32)_ Migrate wrapped-components to typescript
  - _(DVIZ-32)_ Update chart component and fix import issues and remove the commons folder
  - _(DVIZ-32)_ Fix more import issues
  - _(DVIZ-32)_ Fix more import issues
  - _(DVIZ-32)_ Migrate charts to typescript and add some types in the commons
  - _(DVIZ-38)_ Add github workflows for wordpress and the commons library

  ## [1.0.0_DVZ] - 2024-06-25

  ### 💼 Other

  - Patterns, label settings, and several improvements

  ### ⚙️ Miscellaneous Tasks

  - Apply latest wordpress plugin diff
