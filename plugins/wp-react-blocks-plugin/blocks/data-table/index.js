import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import BlockSave from './BlockSave';
import BlockEdit from './BlockEdit';
import {
	GenericIcon,
	BLOCKS_NS,
	BLOCKS_CATEGORY,
} from '@devgateway/dvz-wp-commons';
registerBlockType(BLOCKS_NS + '/datatable', {
	title: __('Data Table'),
	icon: GenericIcon,
	category: BLOCKS_CATEGORY,
	apiVersion: 2,
	attributes: {
		/* ---- data source ---- */
		app: {
			type: 'String',
			default: 'csv',
		},
		csv: {
			type: 'String',
			default: 'Dimension,Measure1\nRow A,100\nRow B,200',
		},
		dvzProxyDatasetId: {
			type: 'String',
			default: '',
		},
		/* ---- dimension / measures ---- */
		dimension1: {
			type: 'String',
			default: 'none',
		},
		dimension2: {
			type: 'String',
			default: 'none',
		},
		dimensionLabel: {
			type: 'String',
			default: '',
		},
		dimensionLabel2: {
			type: 'String',
			default: '',
		},
		measures: {
			type: 'Object',
			default: {},
		},
		_measures: {},
		filters: {
			type: 'Array',
			default: [],
		},
		/* ---- behaviour ---- */
		group: {
			type: 'String',
			default: 'default',
		},
		waitForFilters: {
			type: 'Boolean',
			default: false,
		},
		panelStatus: {
			type: 'Object',
			default: {},
		},
		/* ---- display ---- */
		height: {
			type: 'number',
			default: 400,
		},
		fontSize: {
			type: 'Numeric',
			default: 14,
		},
		headerBgColor: {
			type: 'string',
			default: '#f0f4f8',
		},
		headerTextColor: {
			type: 'string',
			default: '#2d3748',
		},
		stripedRows: {
			type: 'Boolean',
			default: true,
		},
		borderStyle: {
			type: 'String',
			default: 'rows', // 'rows' | 'full' | 'none'
		},
		noDataText: {
			type: 'String',
			default: 'No data available',
		},
		showExportButton: {
			type: 'Boolean',
			default: false,
		},
		exportFileName: {
			type: 'String',
			default: '',
		},
		defaultSortColumn: {
			type: 'String',
			default: '',
		},
		defaultSortDirection: {
			type: 'String',
			default: 'none',
		},
		/* ---- internal ---- */
		types: {
			type: 'Array',
			default: [
				{
					label: 'Data Table',
					value: 'data-table',
					supports: { singleMeasure: false, singleDimension: false },
				},
			],
		},
	},
	edit: BlockEdit,
	save: BlockSave,
});
