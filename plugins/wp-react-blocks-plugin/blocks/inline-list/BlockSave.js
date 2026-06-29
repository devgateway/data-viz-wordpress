const SaveComponent = (props) => {
    const {
        attributes: {
            items,
            type,
            taxonomy,
            categories,
            height,
            colors,
            showPostIcons,
            showContentToggle,
            contentToggleHPosition,
            readMoreLabel,
            readLessLabel
        },
    } = props;

    const colorsParams = Object.keys(colors).map(k => colors[k]).join(",");
    return (
        <div>
            <div data-items={items}
                 data-height={height}
                 data-color={colorsParams}
                 data-type={type} data-taxonomy={taxonomy} data-categories={categories.toString()}
                 className={"viz-component"}
                 data-show-post-icons={showPostIcons}
                 data-show-content-toggle={showContentToggle}
                 data-content-toggle-h-position={contentToggleHPosition}
                 data-read-more-label={readMoreLabel}
                 data-read-less-label={readLessLabel}
                 data-component={"inlineList"}>
            </div>
        </div>
    );
}


export default SaveComponent
