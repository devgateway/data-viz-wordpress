import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/blocks';
import {
    withColors
} from '@wordpress/block-editor';
import EditComponent from './BlockEdit';
import SaveComponent from './BlockSave';
import { BLOCKS_NS, BLOCKS_CATEGORY, GenericIcon } from '@devgateway/dvz-wp-commons';

***REMOVED***(BLOCKS_NS+'/prevalence-map', {
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
        ***REMOVED***: {
            type: 'string'
        },

    },
    edit: withColors('***REMOVED***', {textColor: 'color'})(EditComponent),
    save: SaveComponent,
});
