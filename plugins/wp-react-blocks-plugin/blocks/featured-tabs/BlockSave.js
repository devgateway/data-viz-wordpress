const SaveComponent = (props) => {
    const {
        attributes: {
            items,
            type,
            taxonomy,
            categories,
            height,
            color,
            useScrolls,
            readMoreLabel,
            closeLabel,
            previewMode
        },
    } = props;

    const divStyles = {
        height: `${height}px`,
    };

    return (
        <div style={divStyles}>
            <div
                data-items={items}
                data-height={height}
                data-color={color}
                data-type={type}
                data-taxonomy={taxonomy}
                data-categories={categories.toString()}
                className={"viz-component"}
                data-read-more-label={readMoreLabel}
                data-close-label={closeLabel}
                data-use-scrolls={useScrolls}
                data-component={"featuredTabs"}
                data-preview-mode={previewMode}
            />
        </div>
    );
}

export default SaveComponent;
