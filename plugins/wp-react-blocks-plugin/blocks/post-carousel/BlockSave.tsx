import React from 'react';
import { PostCarouselAttributes } from './types';

const SaveComponent = (props: { attributes: PostCarouselAttributes}) => {
    const {
        attributes: {
            count,
            type,
            taxonomy,
            categories,
            height,
            autoSwitch,
            interval
        },
    } = props;

    const divStyles = {}

    return (
        <div style={divStyles}>
            <div data-items={count} data-type={type} data-taxonomy={taxonomy} data-categories={categories.toString()}
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