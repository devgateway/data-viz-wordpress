import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {CHART_ATTRIBUTES} from "./chartAttributes";
import {ChartIcon, BLOCKS_NS, BLOCKS_CATEGORY} from '@devgateway/dvz-wp-commons'

registerBlockType(BLOCKS_NS + '/chart',
    {
        title: __('Data Chart'),
        icon: ChartIcon,
        category: BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: CHART_ATTRIBUTES,
        edit: BlockEdit,
        save: BlockSave,
    }
);
