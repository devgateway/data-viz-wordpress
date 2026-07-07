import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {GenericIcon, BLOCKS_NS, BLOCKS_CATEGORY} from '@devgateway/dvz-wp-commons';

const v1Attributes = {
    count: { type: 'Numeric', default: 3 },
    type: { type: 'string', default: "posts" },
    taxonomy: { type: 'string', default: "none" },
    categories: { type: 'array', default: [] },
    height: { type: 'Numeric', default: 700 },
    theme: { type: 'string', default: "buttons" },
    useLabels: { type: "boolean", default: false },
    showIcons: { type: "boolean", default: false },
    useScrolls: { type: "boolean", default: false },
    panelStatus: { type: "Object", default: {} },
    previewMode: { type: "string", default: "Desktop" },
};

registerBlockType(BLOCKS_NS + '/tabbed-posts',
    {
        title: __('Tabbed Posts', "dg"),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        attributes: {
            items: {
                type: 'Numeric',
                default: 3,
            },
            type: {
                type: 'string',
                default: "posts",
            },
            taxonomy: {
                type: 'string',
                default: "none",
            },
            categories: {
                type: 'array',
                default: [],
            },
            height: {
                type: 'Numeric',
                default: 700,
            },
            theme: {
                type: 'string',
                default: "buttons",
            },
            showLabels: {
                type: "boolean",
                default: false
            },
            showIcons: {
                type: "boolean",
                default: false
            },
            useScrolls: {
                type: "boolean",
                default: false
            },
            panelStatus: {
                type: "Object",
                default: {}
            },
            previewMode: {
                type: "string",
                default: "Desktop"
            }
        },
        edit: BlockEdit,
        save: BlockSave,
        deprecated: [
            {
                attributes: v1Attributes,
                migrate({ count, useLabels, ...rest }) {
                    return { ...rest, items: count, showLabels: useLabels };
                },
                // Reproduces what the old BlockSave actually rendered:
                // - `width` was not a registered attribute → data-width omitted
                // - `showLabels` was not a registered attribute (was `useLabels`) → data-show-labels omitted
                // - outer div had className={} → no class attribute rendered
                save({ attributes: { count, type, taxonomy, categories, height, showIcons, useScrolls, theme, previewMode } }) {
                    return (
                        <div>
                            <div
                                data-items={count}
                                data-height={height}
                                data-type={type}
                                data-taxonomy={taxonomy}
                                data-categories={categories.toString()}
                                data-show-icons={showIcons}
                                data-use-scrolls={useScrolls}
                                data-theme={theme}
                                data-preview-mode={previewMode}
                                className={"viz-component"}
                                data-component={"tabbedPosts"}>
                            </div>
                        </div>
                    );
                }
            }
        ],
    }
)
;
