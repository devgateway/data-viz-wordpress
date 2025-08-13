import React from 'react';
import {
    ***REMOVED***,
} from '@wordpress/block-editor';
import {
    ***REMOVED***,
    Panel,
    PanelBody,
    PanelRow,
    RangeControl,
    TextControl,
    ToggleControl,
    ResizableBox,
    SearchControl,
    SelectControl,
    __experimentalDivider as Divider,
    __experimentalScrollable as Scrollable,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { ComponentWithSettings } from "../commons";
import apiFetch from '@wordpress/api-fetch';
import { ***REMOVED*** } from './utils';


class ***REMOVED*** extends ComponentWithSettings {

    constructor(props) {
        super(props);
        this.iframe = React.createRef();
        this.state = {
            categories: [],
            ***REMOVED***: null,
            ***REMOVED***: '',
            ...this.state
        };
        window.wp = window.wp || {};

    }

    ***REMOVED***() {
        super.***REMOVED***();
        this.***REMOVED***();
    }

    ***REMOVED***() {

        ***REMOVED***().then(categories => {
            const ***REMOVED*** = [];
            categories.forEach(category => {
                ***REMOVED***.push({ label: category.name, value: category.id });
            });
            this.setState({ categories: ***REMOVED*** });
        });

    }

    getCategories() {
        const categories = this.props.attributes.categories;
        if (categories.length === 0) {
            return [];
        }
        return categories.map(category => ({ label: category.name, value: category.id }));
    }

    render() {
        const {
            setAttributes,
            ***REMOVED***,
            attributes: {
                height,
                ***REMOVED***,
                postsPerPage,
                showFilters,
                ***REMOVED***,
                ***REMOVED***,
                ***REMOVED***,
                categories,
                ***REMOVED***,
                ***REMOVED***,
                ***REMOVED***
            }
        } = this.props;
        const ***REMOVED*** = this.state.categories;
        const ***REMOVED*** = ***REMOVED***.filter(category =>
            category.label.toLowerCase().includes(this.state.***REMOVED***.toLowerCase())
        );
        return (
            <div>
                <***REMOVED***>
                    <Panel>
                        <PanelBody title={__("Filters")}>
                            <PanelRow>
                                <div style={{ width: "100%" }}>
                                    <ToggleControl
                                        label={__("Show Filters")}
                                        checked={showFilters}
                                        onChange={(showFilters) => setAttributes({ showFilters })}
                                    />
                                    {showFilters && (
                                        <>
                                            <ToggleControl
                                                label={__("Show Year Filter")}
                                                checked={***REMOVED***}
                                                onChange={(***REMOVED***) => setAttributes({ ***REMOVED*** })}
                                            />
                                            <ToggleControl
                                                label={__("Show Category Filter")}
                                                checked={***REMOVED***}
                                                onChange={(***REMOVED***) => setAttributes({ ***REMOVED*** })}
                                            />
                                            {***REMOVED*** && (
                                                <>
                                                    <SearchControl
                                                        label={__("Search Categories")}
                                                        value={this.state.***REMOVED***}
                                                        onChange={(***REMOVED***) => this.setState({ ***REMOVED*** })}
                                                        placeholder={__("Search categories...")}
                                                    />
                                                    <Scrollable style={{ maxHeight: '240px', padding: '10px 0', margin: '12px 0' }}>
                                                    {***REMOVED***.map(category => (
                                                        <***REMOVED***
                                                            label={category.label}
                                                            checked={categories.indexOf(category.value) > -1}
                                                            onChange={() => {
                                                                const newCategories = [...categories];
                                                                if (newCategories.indexOf(category.value) > -1) {
                                                                    newCategories.splice(newCategories.indexOf(category.value), 1);
                                                                } else {
                                                                    newCategories.push(category.value);
                                                                }

                                                                setAttributes({ categories: newCategories });
                                                            }}
                                                        />
                                                    ))}
                                                    </Scrollable>
                                                    <div style={{ display: 'flex', height: '8px' }}></div>


                                                    <TextControl
                                                        label={__("Category Placeholder")}
                                                        value={***REMOVED***}
                                                        onChange={(***REMOVED***) => setAttributes({ ***REMOVED*** })}
                                                    />
                                                </>
                                            )}

                                            {***REMOVED*** && <Divider />}

                                            <ToggleControl
                                                label={__("Show Country Filter")}
                                                checked={***REMOVED***}
                                                onChange={(***REMOVED***) => setAttributes({ ***REMOVED*** })}
                                            />

                                            {/* Select the Category that has the countries */}
                                            {***REMOVED*** && (
                                                <>
                                                    <SelectControl
                                                        label={__("Country Category")}
                                                        options={this.state.categories.map(category => ({
                                                            label: category.label,
                                                            value: category.value
                                                        }))}
                                                        help={__("Select the category that has the countries")}
                                                        value={***REMOVED***}
                                                        onChange={(***REMOVED***) => {
                                                            setAttributes({ ***REMOVED***: parseInt(***REMOVED***) });
                                                        }}
                                                    />

                                                    <TextControl
                                                        label={__("Country Placeholder")}
                                                        value={***REMOVED***}
                                                        onChange={(***REMOVED***) => setAttributes({ ***REMOVED*** })}
                                                    />

                                                </>
                                            )}
                                        </>
                                    )}

                                </div>
                            </PanelRow>
                        </PanelBody>

                        <PanelBody title={__("Pagination")}>
                            <PanelRow>
                                <div>
                                    <ToggleControl
                                        label={__("Show Pagination Options")}
                                        checked={***REMOVED***}
                                        onChange={(***REMOVED***) => setAttributes({ ***REMOVED*** })}
                                    />
                                    {***REMOVED*** && (

                                        <RangeControl
                                            label={__("Posts per page")}
                                            value={postsPerPage}
                                            min={1}
                                            max={100}
                                            defaultValue={10}
                                            help={__("Number of posts to show per page")}
                                            onChange={(postsPerPage) => setAttributes({ postsPerPage })}
                                        />
                                    )}
                                </div>

                            </PanelRow>
                        </PanelBody>
                    </Panel>
                </***REMOVED***>

                <ResizableBox
                    size={{ height }}
                    style={{ "margin": "auto", width: "100%", height: height + 'px' }}
                    minHeight="500"
                    minWidth="500"
                    enable={{
                        top: false,
                        right: false,
                        bottom: true,
                        left: false,
                        topRight: false,
                        bottomRight: false,
                        bottomLeft: false,
                        topLeft: false,
                    }}
                    onResizeStop={(event, direction, elt, delta) => {
                        setAttributes({
                            height: parseInt(height + delta.height, 10),

                        });
                        ***REMOVED***(true);
                    }}
                    onResizeStart={() => {
                        ***REMOVED***(false);
                    }}
                >
                    <div>
                        {this.state.react_ui_url && <iframe
                            width={"100%"}
                            ref={this.iframe}
                            scrolling={"no"}
                            height={height}
                            src={this.state.react_ui_url + "/embeddable/***REMOVED***"} />}
                    </div>

                </ResizableBox>



            </div>
        );
    }
}

// const BlockEdit = (props) => {
//     const blockProps = useBlockProps();
//     return (
//         <div {...blockProps}>

//         </div>
//     );
// };

export default ***REMOVED***;