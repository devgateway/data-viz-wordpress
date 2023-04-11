const SaveComponent = (props) => {

    const {
        attributes: {
            ***REMOVED***,
            group,
            label,
            app,
        }
    } = props;


    return (<div className={"tcdi-component"}
                 data-component={"measures"}
                 data-app={app}
                 data-label={label}
                 data-group={group}
                 data-measures-groups={***REMOVED***(JSON.stringify(***REMOVED***))}>
    </div>);
}


export default SaveComponent