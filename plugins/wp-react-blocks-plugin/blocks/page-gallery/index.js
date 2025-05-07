import {registerBlockType} from '@wordpress/blocks';
import EditComponent from './BlockEdit';
import SaveComponent from './BlockSave';
import { __ } from '@wordpress/i18n';
import { BLOCKS_CATEGORY, BLOCKS_NS, GenericIcon } from '@devgateway/dvz-wp-commons';

registerBlockType(BLOCKS_NS + '/page-gallery',
    {
        title: __('Child Pages Gallery',"dg"),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        attributes: {
            columns: {
                type: 'Numeric',
                default: 2,
            },
            height: {
                type: "number",
                default: 400
            }
        },
        edit: EditComponent,
        save: SaveComponent,
    }
);
