import {
    ***REMOVED***
} from '@wordpress/block-editor';

const SaveComponent = (props) => {
    const {setAttributes} = props;
    const {
        customBackgroundColor,
        ***REMOVED***,
        width,
        height,
        alignment
    } = props.attributes;

    const divClass = ***REMOVED***('background-color', ***REMOVED***);

    const divStyles = {
        "background-color": customBackgroundColor,
        "text-align": alignment,
        "margin": 'auto'
    };
    return (<div className={divClass} style={divStyles}>
            <div {...props.attributes} className={"tcdi-component"} data-component={"showCaseForm"}></div>
        </div>
    );
}

export default SaveComponent