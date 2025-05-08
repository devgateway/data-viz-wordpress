import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { Icon, blockDefault } from '@wordpress/icons';

registerBlockType('viz' + 'example', {
    title: __('Example', 'wp-customizer-react-blocks'),
    icon: <Icon icon={ blockDefault } />,
    category: 'wp-customizer-react-blocks',
    attributes: {
        text: { type: 'string', default: 'Hello World' },
    },
    edit: BlockEdit,
    save: BlockSave,
});