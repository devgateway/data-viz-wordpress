const SaveComponent = (props) => {
    const {
        setAttributes,
        attributes: {
            buttonLabel,
            height,
            width,
            ***REMOVED***,
            fontColor
        },
    } = props;

    const divClass = {}
    const divStyles = {}
    return (<div className={divClass} style={divStyles}>
            <div 
                 className={"viz-component"}
                 data-button-label={buttonLabel}
                 data-height={height}
                 data-width={width}
                 data-background-color={***REMOVED***}
                 data-font-color={fontColor}
                 data-component={"backToTop"}>
            </div>
        </div>


    );
}


export default SaveComponent