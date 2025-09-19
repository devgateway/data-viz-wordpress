import React from 'react';
import {
    InspectorControls,
} from '@wordpress/block-editor';
import {
    CheckboxControl,
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
import { fetchAllCategories } from './utils';


class BlockEditComponent extends ComponentWithSettings {

    constructor(props) {
        super(props);
        this.iframe = React.createRef();
        this.state = {
            categories: [],
            countryCategory: null,
            categorySearch: '',
            ...this.state
        };
        window.wp = window.wp || {};

    }

    componentDidMount() {
        super.componentDidMount();
        this.getSystemCategories();
    }

    getSystemCategories() {

        fetchAllCategories().then(categories => {
            const categoriesList = [];
            categories.forEach(category => {
                categoriesList.push({ label: category.name, value: category.id });
            });
            this.setState({ categories: categoriesList });
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
            toggleSelection,
            attributes: {
                height,
                showPagination,
                postsPerPage,
                showFilters,
                showDateFilter,
                showCategoryFilter,
                showCountryFilter,
                categories,
                categoryPlaceholder,
                countryCategory,
                countryPlaceholder
            }
        } = this.props;
        const systemCategories = this.state.categories;
        const filteredCategories = systemCategories.filter(category =>
            category.label.toLowerCase().includes(this.state.categorySearch.toLowerCase())
        );
        return (
            <div>
                <InspectorControls>
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
                                                checked={showDateFilter}
                                                onChange={(showDateFilter) => setAttributes({ showDateFilter })}
                                            />
                                            <ToggleControl
                                                label={__("Show Category Filter")}
                                                checked={showCategoryFilter}
                                                onChange={(showCategoryFilter) => setAttributes({ showCategoryFilter })}
                                            />
                                            {showCategoryFilter && (
                                                <>
                                                    <SearchControl
                                                        label={__("Search Categories")}
                                                        value={this.state.categorySearch}
                                                        onChange={(categorySearch) => this.setState({ categorySearch })}
                                                        placeholder={__("Search categories...")}
                                                    />
                                                    <Scrollable style={{ maxHeight: '240px', padding: '10px 0', margin: '12px 0' }}>
                                                    {filteredCategories.map(category => (
                                                        <CheckboxControl
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
                                                        value={categoryPlaceholder}
                                                        onChange={(categoryPlaceholder) => setAttributes({ categoryPlaceholder })}
                                                    />
                                                </>
                                            )}

                                            {showCountryFilter && <Divider />}

                                            <ToggleControl
                                                label={__("Show Country Filter")}
                                                checked={showCountryFilter}
                                                onChange={(showCountryFilter) => setAttributes({ showCountryFilter })}
                                            />

                                            {/* Select the Category that has the countries */}
                                            {showCountryFilter && (
                                                <>
                                                    <SelectControl
                                                        label={__("Country Category")}
                                                        options={this.state.categories.map(category => ({
                                                            label: category.label,
                                                            value: category.value
                                                        }))}
                                                        help={__("Select the category that has the countries")}
                                                        value={countryCategory}
                                                        onChange={(countryCategory) => {
                                                            setAttributes({ countryCategory: parseInt(countryCategory) });
                                                        }}
                                                    />

                                                    <TextControl
                                                        label={__("Country Placeholder")}
                                                        value={countryPlaceholder}
                                                        onChange={(countryPlaceholder) => setAttributes({ countryPlaceholder })}
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
                                        checked={showPagination}
                                        onChange={(showPagination) => setAttributes({ showPagination })}
                                    />
                                    {showPagination && (

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
                </InspectorControls>

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
                        toggleSelection(true);
                    }}
                    onResizeStart={() => {
                        toggleSelection(false);
                    }}
                >
                    <div>
                        {this.state.react_ui_url && <iframe
                            width={"100%"}
                            ref={this.iframe}
                            scrolling={"no"}
                            height={height}
                            src={this.state.react_ui_url + "/embeddable/postswithFilters"} />}
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

export default BlockEditComponent;