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
            waitForFilters
        }
    } = props;

    const normalizedLayers = (layers || []).map(layer => ({
        ...layer,
        labelSettings: Array.isArray(layer.labelSettings) ? {} : (layer.labelSettings || {}),
        customMeasuresLabels: Array.isArray(layer.customMeasuresLabels) ? {} : (layer.customMeasuresLabels || {})
    }));

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
             data-layers={encodeURIComponent(JSON.stringify(normalizedLayers))}
             data-wait-for-filters={waitForFilters}
             >
        </div>
    );
}


export default SaveComponent;