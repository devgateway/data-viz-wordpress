# @devgateway/dvz-wp-commons

Common utilities for Data Visualization in WordPress that can also be used in other projects.

[![npm version](https://img.shields.io/npm/v/@devgateway/dvz-wp-commons.svg)](https://www.npmjs.com/package/@devgateway/dvz-wp-commons)
[![MIT License](https://img.shields.io/npm/l/@devgateway/dvz-wp-commons.svg)](https://github.com/devgateway/data-viz-wordpress/blob/main/packages/commons/LICENSE)

## Installation

```bash
npm install @devgateway/dvz-wp-commons
# or
yarn add @devgateway/dvz-wp-commons
# or
pnpm add @devgateway/dvz-wp-commons
```

## Overview

This package provides a collection of reusable components, utilities, and type definitions for data-viz WordPress. It facilitates consistent handling of chart ***REMOVED***, data formatting, API connections, and more.

This package is used internally by DevGateway projects and is designed to be compatible with the project customizer, allowing for easy integration and extension in custom ***REMOVED***.

## Components

### API and Data Configuration

- **APIConfig**: Configuration component for API connections.
- **CSVConfig**: Configuration for CSV data sources.
- *****REMOVED*****: Configuration for CSV data sources specific to maps.
- **DataFilters**: Components for filtering data in ***REMOVED***.

### Chart Components

- **ChartColors**: Provides color schemes (categorical, sequential, diverging) for charts.
- **ChartLegends**: Customizable legend components for charts.
- **ChartMeasures**: Components for configuring chart measures.
- **Measures**: Utilities for handling data measures.
- **Tooltip**: Customizable tooltip component for charts.

### Block Components

- **BlockEditWithAPIMetadata**: Block editor component with API metadata support.
- *****REMOVED*****: Block editor component with filter capabilities.
- **ComponentWithSettings**: Component wrapper with settings panel.
- **SizeConfig**: Configuration component for size settings.

### Formatting Components

- **Format**: Advanced formatting utilities for chart data.

### Post Type Components

- **Post**: Components and utilities for handling WordPress post data.

## Utilities

### API Utilities

- **APIutils**: Utility functions for API operations.
  - `***REMOVED***`
  - `***REMOVED***`
  - `isSupersetAPI`

### Mobile Utilities

- *****REMOVED*****: Utilities for mobile ***REMOVED***.
  - `***REMOVED***`
  - `getSelectedLabelsForApp`
  - `transformDataToAppObject`
  - `***REMOVED***`
  - `getSelectedItemsForApp`
  - `***REMOVED***`

### UI Utilities

- **Util**: General UI utilities.
  - `panelFocus`
  - `togglePanel`

### Constants

- **BLOCKS_CATEGORY**: Category definition for blocks.
- **BLOCKS_NS**: Namespace for blocks.
- **DEFAULT_FORMAT_SETTINGS**: Default settings for formatting.

## Icons

- **GenericIcon**: Generic icon component.
- **ChartIcon**: Chart-specific icon component.

## Types

### Core Types

- **Options**: Basic option type with label, value, and optional labels.
- **Dimension**: Interface for data dimensions.
- **Category/CategoryItem**: Types for data ***REMOVED***.
- **Measure**: Interface for data measures.
- **Filter**: Interface for data filters.
- **FileContent**: Interface for file content metadata.

### Chart Types

- *****REMOVED*****: Props for chart colors component.
- *****REMOVED*****: Props for chart legends component.
- *****REMOVED*****: Props for chart measures component.
- **FormatProps**: Props for format component.
- **MeasuresProps**: Props for measures component.
- *****REMOVED*****: Props for data filters component.
- **MapCSVSourceConfigProps**: Props for map CSV source config component.

### Block Types

- **BlockEditWithAPIMetadataProps/State**: Props and state for BlockEditWithAPIMetadata.
- **BlockEditWithFiltersProps/State**: Props and state for ***REMOVED***.
- **ComponentWithSettingsProps/State**: Props and state for ComponentWithSettings.
- *****REMOVED*****: Props for SizeConfig component.

### Data Types

- **DgSettings**: Interface for global settings.
- *****REMOVED*****: Interface for Eureka service responses.
- **Menu**: Interface for menu structure.
- **Media**: Interface for media attachments.
- **SearchResult/SearchResults**: Types for search functionality.
- **Taxonomy/Taxonomies**: Types for WordPress taxonomies.
- **Wp_Types**: Types for WordPress content types.

### Post Types

- **Post**: Interface for WordPress posts.
- **PostContent**: Interface for post content.
- **PostLinks**: Interface for post links.
- *****REMOVED*****: Interface for Yoast SEO data.
- *****REMOVED*****: Enum for schema action types.
- **PostSchema**: Interface for structured data schema.

## Integration with Project Customizer

This package is designed to be integrated with the project customizer, allowing for:

- Custom component ***REMOVED***
- Theme-specific styling overrides
- Extension of data types for project-specific needs
- Custom visualization ***REMOVED***

When used with the project customizer, components from this package can be easily configured and extended to meet specific project requirements.

## Usage Examples

### Basic Chart Configuration

```jsx
import { ChartColors, ChartLegends, Format } from '@devgateway/dvz-wp-commons';

const ***REMOVED*** = ({ attributes, setAttributes }) => {
  return (
    <div>
      <ChartColors
        attributes={attributes}
        setAttributes={setAttributes}
      />
      <ChartLegends
        attributes={attributes}
        setAttributes={setAttributes}
      />
      <Format
        attributes={attributes}
        setAttributes={setAttributes}
      />
    </div>
  );
};
```

### API Configuration

```jsx
import { APIConfig } from '@devgateway/dvz-wp-commons';

const ***REMOVED*** = ({ attributes, setAttributes }) => {
  return (
    <APIConfig
      attributes={attributes}
      setAttributes={setAttributes}
    />
  );
};
```

## License

MIT
