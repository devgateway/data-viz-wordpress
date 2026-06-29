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
    height: { type: 'Numeric', default: 500 },
    readMoreLabel: { type: "String", default: "READ More" },
    closeLabel: { type: "String", default: "Close" },
    useScrolls: { type: "boolean", default: false },
    colors: { type: "object", default: {color_0: '#FFFF', color_1: '#FFFF', color_2: '#FFFF'} },
    previewMode: { type: "string", default: "Desktop" },
};

registerBlockType(`${BLOCKS_NS}/featured-tabs`,
    {
        title: __('Featured Tabs'),
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
                default: 500,
            },
            readMoreLabel:{
                type:"String",
                default:"READ More"
            },
            closeLabel:{
                type:"String",
                default:"Close"
            },
            useScrolls: {
                type: "boolean",
                default: false
            },
            color: {
                type: "string",
                default: '#FFFF,#FFFF,#FFFF'
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
                migrate({ count, colors, ...rest }) {
                    const color = Object.keys(colors).map(k => colors[k]).join(',');
                    return { ...rest, items: count, color };
                },
                save({ attributes: { count, type, taxonomy, categories, height, colors, useScrolls, readMoreLabel, closeLabel, previewMode } }) {
                    const colorsParams = Object.keys(colors).map(k => colors[k]).join(",");
                    return (
                        <div style={{ height: `${height}px` }}>
                            <div
                                data-items={count}
                                data-height={height}
                                data-color={colorsParams}
                                data-type={type}
                                data-taxonomy={taxonomy}
                                data-categories={categories.toString()}
                                className={"viz-component"}
                                data-read-more-label={readMoreLabel}
                                data-close-label={closeLabel}
                                data-use-scrolls={useScrolls}
                                data-component={"featuredTabs"}
                                data-preview-mode={previewMode}
                            />
                        </div>
                    );
                }
            }
        ],
    }
)
;
