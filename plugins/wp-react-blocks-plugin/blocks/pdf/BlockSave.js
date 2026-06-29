import {InnerBlocks} from '@wordpress/editor'; // or wp.editor

const SaveComponent = (props) => {
    const {
        setAttributes,
        attributes: {
            height,
            buttonLabel,
            fileLabel,
            url
        },
    } = props;

    const divClass = {}
    const divStyles = {}

    return (<div className={divClass} style={divStyles}>
                <div
                     data-height={height}
                     className={"viz-component"}
                     data-component={"downloadpdf"}
                     data-button-label={buttonLabel}
                     data-file-label={fileLabel}
                     data-url={url}
                >

                    <InnerBlocks.Content></InnerBlocks.Content>
                </div>
        </div>


    );
}


export default SaveComponent