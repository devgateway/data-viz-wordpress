import {useBlockProps} from '@wordpress/block-editor';

const SaveComponent = (props) => {

    const {
        attributes: {
            layers,
            height,
            width,
            group,
            ***REMOVED***,
            mapPosition,
            projection,
            zoomEnabled,
            ***REMOVED***
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
             data-back-ground-color={***REMOVED***}
             data-map-position={***REMOVED***(JSON.stringify(mapPosition))}
             data-component={"newMap"}
             data-zoom-enabled={zoomEnabled}
             data-rotation-enabled={***REMOVED***}
             data-layers={***REMOVED***(JSON.stringify(layers))}
             >
        </div>
    );
}


export default SaveComponent;