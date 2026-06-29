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
    autoSwitch: { type: 'Boolean', default: false },
    interval: { type: 'Numeric', default: 10000 },
    panelStatus: { type: "Object", default: {} },
};

registerBlockType(BLOCKS_NS+'/post-carousel',
    {
        title: __('Posts Carousel',"dg"),
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
            height:{
                type: 'Numeric',
                default: 500,
            },
            autoSwitch:{
                type:'Boolean',
                default:false
            },
            interval:{
                type: 'Numeric',
                default: 10000,
            },
            panelStatus: {
                type: "Object",
                default: {}
            }
        },
        edit: BlockEdit,
        save: BlockSave,
        deprecated: [
            {
                attributes: v1Attributes,
                migrate({ count, ...rest }) {
                    return { ...rest, items: count };
                },
                save({ attributes: { count, type, taxonomy, categories, height, autoSwitch, interval } }) {
                    return (
                        <div>
                            <div data-items={count} data-type={type} data-taxonomy={taxonomy}
                                 data-categories={categories.toString()}
                                 className={"viz-component"}
                                 data-height={height}
                                 data-component={"postsCarousel"}
                                 data-auto-switch={autoSwitch}
                                 data-interval={interval}>
                            </div>
                        </div>
                    );
                }
            }
        ],
    }
)
;
