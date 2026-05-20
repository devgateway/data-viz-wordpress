import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {ChartIcon, BLOCKS_NS, BLOCKS_CATEGORY} from '@devgateway/dvz-wp-commons';
import {CHART_ATTRIBUTES} from "./chartAttributes";

const SPECIALIZED_CHART_BLOCKS = [
    {
        name: 'bar-chart',
        title: __('Bar Chart'),
        forcedType: 'bar',
        componentName: 'barChart',
    },
    {
        name: 'line-chart',
        title: __('Line Chart'),
        forcedType: 'line',
        componentName: 'lineChart',
    },
    {
        name: 'pie-chart',
        title: __('Pie Chart'),
        forcedType: 'pie',
        componentName: 'pieChart',
    },
    {
        name: 'radar-chart',
        title: __('Radar Chart'),
        forcedType: 'radar',
        componentName: 'radarChart',
    },
    {
        name: 'bump-chart',
        title: __('Bump Chart'),
        forcedType: 'bump',
        componentName: 'bumpChart',
    },
    {
        name: 'waterfall-chart',
        title: __('Waterfall Chart'),
        forcedType: 'waterfall',
        componentName: 'waterfallChart',
    },
    {
        name: 'dumbbell-chart',
        title: __('Dumbbell Chart'),
        forcedType: 'dumbbell',
        componentName: 'dumbbellChart',
    },
    {
        name: 'histogram-chart',
        title: __('Histogram Chart'),
        forcedType: 'histogram',
        componentName: 'histogramChart',
    },
    {
        name: 'scatter-chart',
        title: __('Scatter Chart'),
        forcedType: 'scatter',
        componentName: 'scatterChart',
    },
    {
        name: 'heatmap-chart',
        title: __('Heatmap Chart'),
        forcedType: 'heatmap',
        componentName: 'heatmapChart',
    },
    {
        name: 'sunburst-chart',
        title: __('Sunburst Chart'),
        forcedType: 'sunburst',
        componentName: 'sunburstChart',
    },
    {
        name: 'interval-plot',
        title: __('Interval Plot'),
        forcedType: 'intervalPlot',
        componentName: 'intervalPlot',
    },
    {
        name: 'diverging-chart',
        title: __('Diverging Chart'),
        forcedType: 'diverging',
        componentName: 'divergingChart',
    },
];

const createEdit = ({forcedType, componentName}) => (props) => (
    <BlockEdit
        {...props}
        forcedType={forcedType}
        previewComponentName={componentName}
    />
);

const createSave = ({forcedType, componentName}) => (props) => (
    <BlockSave
        {...props}
        forcedType={forcedType}
        componentName={componentName}
    />
);

SPECIALIZED_CHART_BLOCKS.forEach((block) => {
    registerBlockType(`${BLOCKS_NS}/${block.name}`, {
        title: block.title,
        icon: ChartIcon,
        category: BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: CHART_ATTRIBUTES,
        edit: createEdit(block),
        save: createSave(block),
    });
});

