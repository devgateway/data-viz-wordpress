import {useBlockProps} from '@wordpress/block-editor';

const SaveComponent = (props) => {

    const {
        attributes: {
            layers,
            height,
            width,
            group,
            ***REMOVED***,
            mapPosition
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
             data-back-ground-color={***REMOVED***}
             data-map-position={***REMOVED***(JSON.stringify(mapPosition))}
             data-component={"newMap"}
             data-layers={***REMOVED***(JSON.stringify(layers))}
             >
        </div>
    );
}


export default SaveComponent