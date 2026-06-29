import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {GenericIcon, BLOCKS_NS, BLOCKS_CATEGORY} from '@devgateway/dvz-wp-commons';

const v1Attributes = {
    buttonLabel: { type: 'string', default: "Download Prevalence Factsheet" },
    height: { type: 'Numeric', default: 200 },
    fileName: { type: 'string', default: 'export.pdf' },
    url: { type: 'string' },
    post: { type: 'boolean', default: true },
    page: { type: 'boolean', default: true },
};

registerBlockType(BLOCKS_NS + 'viz-components/pdf',
    {
        title: __('PDF Export', "dg"),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        attributes: {
            buttonLabel: {
                type: 'string',
                default: "Download Prevalence Factsheet"
            },
            height: {
                type: 'Numeric',
                default: 200,
            },
            fileLabel: {
                type: 'string',
                default: 'export.pdf'
            },
            url: {
                type: 'string',
            },
            post: {
                type: 'boolean',
                default: true
            },
            page: {
                type: 'boolean',
                default: true
            },
        },
        edit: BlockEdit,
        save: BlockSave,
        deprecated: [
            {
                attributes: v1Attributes,
                migrate({ fileName, ...rest }) {
                    return { ...rest, fileLabel: fileName };
                },
                // Old save used `pdfLabel` (unregistered → undefined) and `type` (unregistered → undefined).
                // Neither was rendered in the HTML output, so the deprecated save omits them.
                save({ attributes: { height, buttonLabel, url } }) {
                    return (
                        <div>
                            <div
                                data-height={height}
                                className={"viz-component"}
                                data-component={"downloadpdf"}
                                data-button-label={buttonLabel}
                                data-url={url}
                            >
                            </div>
                        </div>
                    );
                }
            }
        ],
    }
)
;
