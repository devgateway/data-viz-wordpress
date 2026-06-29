const SaveComponent = (props) => {
    const {
        attributes: {
            items,
            type,
            taxonomy,
            categories,
            height,
            width,
            showLabels,
            showIcons,
            useScrolls,
            theme,
            previewMode
        },
    } = props;

    const divClass = {}
    const divStyles = {}

    return (<div className={divClass} style={divStyles}>
            <div
                data-items={items}
                data-height={height}
                data-width={width}
                data-type={type}
                data-taxonomy={taxonomy}
                data-categories={categories.toString()}
                data-show-labels={showLabels}
                data-show-icons={showIcons}
                data-use-scrolls={useScrolls}
                data-theme={theme}
                data-preview-mode={previewMode}
                className={"viz-component"}
                data-component={"tabbedPosts"}>
            </div>
        </div>


    );
}


export default SaveComponent
