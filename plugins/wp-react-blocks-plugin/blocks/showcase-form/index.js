import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {GenericIcon, BLOCKS_NS, BLOCKS_CATEGORY} from '@devgateway/dvz-wp-commons';
import {getColorClassName, withColors} from '@wordpress/block-editor';

const attributes = {
    width: {
        type: 'string',
        default: "100%",
    },
    height: {
        type: 'string',
        default: "1200px",
    },
    backgroundColor: {
        type: 'string'
    },
    alignment: {type: 'string', default: 'center'},
    organization: {type: 'string', default: 'Organization'},
    name: {type: 'string', default: 'Name'},
    email: {type: 'string', default: 'Email'},
    country: {
        type: 'string', default: 'Country'
    },
    message: {type: 'string', default: 'Please write a message'},
    submitLabel: {type: 'string', default: 'Send'},
    resetLabel: {type: 'string', default: 'Reset'},
    successMessage: {type: 'string', default: "Thanks for submitting"},
    failureMessage: {type: 'string', default: "Something didn't go well, please try again later"},
};

registerBlockType(BLOCKS_NS + '/showcase',
    {
        title: __('Showcase Form',"dg"),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        attributes,
        deprecated: [
            {
                attributes,
                save({attributes}) {
                    const {customBackgroundColor, backgroundColor, alignment} = attributes;
                    const divClass = getColorClassName('background-color', backgroundColor);
                    const divStyles = {
                        "background-color": customBackgroundColor,
                        "text-align": alignment,
                        "margin": 'auto'
                    };
                    return (
                        <div className={divClass} style={divStyles}>
                            <div {...attributes} className={"viz-component"} data-component={"showCaseForm"}></div>
                        </div>
                    );
                }
            }
        ],
        edit: withColors('backgroundColor', {textColor: 'color'})(BlockEdit),
        save: BlockSave
    }
)
;
