import React from 'react';
import { PageGalleryAttributes } from './types';
const SaveComponent = (props: { attributes: PageGalleryAttributes }) => {
    const { attributes: { height, style, columns } } = props;
    const urlParams = new URLSearchParams(window.location.search);

    const parent = urlParams.get('post');

    const divClass = ""
    const divStyles = {}
    
    return (
        <div className={divClass} style={divStyles}>
            <div data-style={style}
                data-parent={parent}
                data-columns={columns}
                data-height={height}
                className={"viz-component"}
                data-component={"pageGallery"}></div>
        </div>


    );
}

export default SaveComponent;