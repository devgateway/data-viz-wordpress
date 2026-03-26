import {useBlockProps} from '@wordpress/block-editor';

const SaveComponent = (props) => {

    const {
        attributes: {
            layers,
            height,
            width,
            group,
            backGroundColor,
            mapPosition,
            projection,
            zoomEnabled,
            rotationEnabled,
            enableMeasureSelector,
            measureSelectorLabel,
            defaultMeasure,
            waitForFilters
        }
    } = props;

    const blockProps = useBlockProps.save({
        className: 'viz component map'
    });


    return (
        <div {...blockProps}
             className={"viz-component"}
             data-height={height}
             data-width={width}
             data-group={group}
             data-projection={projection}
             data-back-ground-color={backGroundColor}
             data-map-position={encodeURIComponent(JSON.stringify(mapPosition))}
             data-component={"newMap"}
             data-zoom-enabled={zoomEnabled}
             data-rotation-enabled={rotationEnabled}
             data-enable-measure-selector={enableMeasureSelector}
             data-measure-selector-label={encodeURIComponent(measureSelectorLabel || '')}
             data-measure-selector-default-measure={defaultMeasure}
             data-layers={encodeURIComponent(JSON.stringify(layers))}
             data-wait-for-filters={waitForFilters}
             >
        </div>
    );
}


export default SaveComponent;