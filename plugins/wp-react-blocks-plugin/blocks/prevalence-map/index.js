import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {
    withColors
} from '@wordpress/block-editor';
import EditComponent from './BlockEdit';
import SaveComponent from './BlockSave';
import { BLOCKS_NS, BLOCKS_CATEGORY, GenericIcon } from '@dg-data-viz/wp-commons';

registerBlockType(BLOCKS_NS+'/prevalence-map', {
    title: __('Prevalence Map',"dg"),
    icon: GenericIcon,
    category: BLOCKS_CATEGORY,
    attributes: {
        width: {
            type: 'Numeric',
            default: 900,
        },
        height: {
            type: 'Numeric',
            default: 400,
        },
        backgroundColor: {
            type: 'string'
        },

    },
    edit: withColors('backgroundColor', {textColor: 'color'})(EditComponent),
    save: SaveComponent,
});
