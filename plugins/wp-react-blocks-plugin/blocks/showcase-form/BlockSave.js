import {
    getColorClassName
} from '@wordpress/block-editor';

const SaveComponent = (props) => {
    const {
        customBackgroundColor,
        backgroundColor,
        alignment,
        organization,
        name,
        email,
        country,
        message,
        submitLabel,
        resetLabel,
        successMessage,
        failureMessage,
    } = props.attributes;

    const divClass = getColorClassName('background-color', backgroundColor);

    const divStyles = {
        "background-color": customBackgroundColor,
        "text-align": alignment,
        "margin": 'auto'
    };
    return (
        <div className={divClass} style={divStyles}>
            <div
                className={"viz-component"}
                data-component={"showCaseForm"}
                data-organization={organization}
                data-name={name}
                data-email={email}
                data-country={country}
                data-message={message}
                data-submit-label={submitLabel}
                data-reset-label={resetLabel}
                data-success-message={successMessage}
                data-failure-message={failureMessage}
            />
        </div>
    );
}

export default SaveComponent
