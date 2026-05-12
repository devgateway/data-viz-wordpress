import React, { useEffect } from "react";
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow, SelectControl, TextControl, ToggleControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BlockEditWithFilters } from '@devgateway/dvz-wp-commons';
import apiFetch from "@wordpress/api-fetch";
const DEFAULT_VALUE_INPUT = 'DEFAULT_VALUE_INPUT';
const LOWEST_VALUE = 'LOWEST_VALUE';
const HIGHEST_VALUE = 'HIGHEST_VALUE';


class BlockEdit extends BlockEditWithFilters {
    constructor(props) {
        super(props);
        this.iframe = React.createRef();
        this.getYearRange();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot);
        const newPreviewMode = this.state?.previewMode;
        if (newPreviewMode !== prevState.previewMode) {
            this.props.setAttributes({ previewMode: newPreviewMode });
        }
    }

    getYearRange() {
        apiFetch({
            path: '/util-api/v1/year-range',
            method: 'GET'
        }).then((response) => {
            this.setState({ yearRange: response });
        });
    }
    render() {
        const {
            toggleSelection,
            setAttributes,
            attributes: {
                group,
                placeholder,
                allLabel,
                alphabeticalSort,
                ascOrder,
                noneLabel,
                useSingleColumn,
                enableTextSearch,
                allNoneSameBehaviour,
                autoApply,
                closeOnSelect,
                filterType,
                showNoDataOption,
                type,
                taxonomy,
                categories,
                isCountryFilter,
                isYearFilter,
                selectedYear,
                defaultValues,
                wordpressSource,

            }
        } = this.props;

        const iframeStyles = { height: '100%', 'width': '100%', border: 'none', 'overflow': 'hidden' };

        return ([
            <InspectorControls>
                <Panel>
                    <PanelBody initialOpen title={__("Group")}>
                        <PanelRow>
                            <TextControl
                                label={__('Name')}
                                value={group}
                                onChange={(group) => setAttributes({ group })}
                            />
                        </PanelRow>
                    </PanelBody>

                    {this.renderWordpressSource()}

                    <PanelBody title={__("Filter Configuration")}>
                        <SelectControl
                            label={__('Filter Type')}
                            value={filterType}
                            onChange={(filterType) => {
                                setAttributes({ filterType: filterType, defaultValues: [] });
                            }}
                            options={[
                                { label: "Single select", value: "single-select" },
                                { label: "Multi select", value: "multi-select" }
                            ]}
                        />

                        <ToggleControl
                            label={__("Is Country Filter")}
                            help={__("If true, the filter will be a country filter")}
                            checked={isCountryFilter}
                            onChange={() => setAttributes({
                                isCountryFilter: !isCountryFilter,
                                isYearFilter: false,
                                selectedYear: null,
                                defaultValues: []
                            })} />

                        <ToggleControl
                            label={__("Is Year Filter")}
                            help={__("If true, the filter will be a year filter")}
                            checked={isYearFilter}
                            onChange={() => setAttributes({
                                isYearFilter: !isYearFilter,
                                isCountryFilter: false,
                                selectedYear: null,
                                defaultValues: []
                            })} />

                    </PanelBody>

                    {!isYearFilter && this.renderFilters(__("Posts Filter"))}
                    {!isYearFilter && this.renderSelectDefaultValues(filterType)}

                    <PanelBody title={__("Labels")}>
                        <PanelRow>
                            <TextControl
                                label={__('Place Holder')}
                                value={placeholder}
                                onChange={(placeholder) => setAttributes({ placeholder })}
                            />
                        </PanelRow>
                        {<PanelRow>
                            <TextControl
                                label={__('All')}
                                value={allLabel}
                                onChange={(allLabel) => setAttributes({ allLabel })}
                            />
                        </PanelRow>}
                        {<PanelRow>
                            <TextControl
                                label={__('None')}
                                value={noneLabel}
                                onChange={(noneLabel) => setAttributes({ noneLabel })}
                            />
                        </PanelRow>}
                    </PanelBody>



                    <PanelBody title={__("Dropdown Options")}>
                        <PanelRow>
                            <ToggleControl
                                label={__("Alphabetical Sort")}
                                checked={alphabeticalSort}
                                onChange={() => setAttributes({ alphabeticalSort: !alphabeticalSort })} />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={__("Order Asc")}
                                checked={ascOrder}
                                onChange={() => setAttributes({ ascOrder: !ascOrder })} />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={__("Use single column to display dropdown items")}
                                checked={useSingleColumn}
                                onChange={() => setAttributes({ useSingleColumn: !useSingleColumn })} />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl label={__("Enable Text Search")}
                                checked={enableTextSearch}
                                onChange={() => setAttributes({ enableTextSearch: !enableTextSearch })} />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl label={__("Show No Data Option (if available)")}
                                checked={showNoDataOption}
                                onChange={() => setAttributes({ showNoDataOption: !showNoDataOption })} />
                        </PanelRow>
                        {filterType == "multi-select" && <>
                            <PanelRow>
                                <ToggleControl
                                    label={__("Close dropdown on item select/click")}
                                    checked={closeOnSelect}
                                    onChange={() => setAttributes({ closeOnSelect: !closeOnSelect })} />
                            </PanelRow>
                            <PanelRow>
                                <ToggleControl
                                    label={__("All and None have same behaviour")}
                                    checked={allNoneSameBehaviour}
                                    onChange={() => setAttributes({ allNoneSameBehaviour: !allNoneSameBehaviour })} />
                            </PanelRow>
                        </>}


                        <PanelBody title={__("Auto Apply")}>
                            <PanelRow>
                                <ToggleControl
                                    label={__("Enable Auto Apply")}
                                    checked={autoApply}
                                    onChange={() => setAttributes({ autoApply: !autoApply })} />
                            </PanelRow>

                        </PanelBody>
                    </PanelBody>
                </Panel>

            </InspectorControls>,

            (<div>

                {this.state.react_ui_url && <iframe ref={this.iframe} scrolling={"no"}
                    style={iframeStyles}
                    src={this.state.react_ui_url + "/embeddable/postsFilter"} />}
            </div>

            )]);

    }
}


const Edit = (props) => {

    const blockProps = useBlockProps({ className: 'wp-react-component' });
    return (<div {...blockProps}>
        <p className={"iframe container"}>
            <BlockEdit {...props} />
        </p>

    </div>);


};
export default Edit;
