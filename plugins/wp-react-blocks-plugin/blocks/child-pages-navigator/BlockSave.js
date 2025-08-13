const SaveComponent = (props) => {

    const {
        attributes: {
            title,
            showIcon,
            showLabel
        }
    } = props;

    const divClass = {}
    const divStyles = {}

    const urlParams = new ***REMOVED***(window.location.search);
    const parent = urlParams.get('post');


    return (<div className={"viz-component"}
                 data-component={"***REMOVED***"}
                 data-parent={parent}
                 data-title={title}
                 data-show-icons={showIcon}
                 data-show-labels={showLabel}>
    </div>);
}


export default SaveComponent