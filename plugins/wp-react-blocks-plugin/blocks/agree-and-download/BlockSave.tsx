import React from 'react';

interface AgreeAndDownloadSaveProps {
    setAttributes: (attributes: any) => void;
    attributes: {
        type: string;
        taxonomy: string;
        categories: string[];
        post_id: number;
        post_slug: string;
        media: {
            id: number;
        };
        download_style: string;
        text: string;
        cancel: string;
        agree: string;
    };
}

const SaveComponent = (props: AgreeAndDownloadSaveProps) => {
    const {
        setAttributes,
        attributes: {
            type,
            taxonomy,
            categories,
            post_id,
            post_slug,
            media,
            download_style,
            text,
            cancel,
            agree


        },
    } = props;

    const divClass = {} as string;
    const divStyles = {} as React.CSSProperties;

    return (
        <div className={divClass} style={divStyles}>
            <div
                data-download-style={download_style}
                data-post-slug={post_slug}
                data-post-id={post_id}
                data-media-id={media ? media.id : null}
                data-text={text}
                data-agree={agree}
                data-cancel={cancel}
                data-post-type={type}
                className={"viz-component"}
                data-component={"***REMOVED***"}>

            </div>
        </div>
    );
}


export default SaveComponent

