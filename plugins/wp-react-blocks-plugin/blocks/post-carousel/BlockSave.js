const SaveComponent = (props) => {
    const {
        attributes: {
            items,
            type,
            taxonomy,
            categories,
            height,
            autoSwitch,
            interval
        },
    } = props;

    return (
        <div>
            <div data-items={items} data-type={type} data-taxonomy={taxonomy} data-categories={categories.toString()}
                 className={"viz-component"}
                 data-height={height}
                 data-component={"postsCarousel"}
                 data-auto-switch={autoSwitch}
                 data-interval={interval}>
            </div>
        </div>
    );
}


export default SaveComponent
