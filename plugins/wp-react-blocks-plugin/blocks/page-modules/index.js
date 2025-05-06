import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/blocks';
import { GenericIcon, BLOCKS_CATEGORY, BLOCKS_NS } from '@dg-data-viz/wp-commons';
import Edit from './BlockEdit';
import SaveComponent from './BlockSave';


***REMOVED***(`${BLOCKS_NS}/page-modules`,
    {
        title: __('Page Modules',"dg"),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        attributes: {
            count: {
                type: 'Numeric',
                default: 3,
            },
            height: {
                type: "number",
                default: 400
            },
            width: {
                type: "number",
                default: 800
            },
            topTopLabel: {
                type: 'String',
                default: "TO THE TOP",
            },
            navLabel: {
                type: 'String',
                default: "Sections",
            },
            previewMode: {
                type: 'string',
                default: 'Desktop'
            }
        }
        ,
        edit: Edit,
        save: SaveComponent,
    }
)
;
