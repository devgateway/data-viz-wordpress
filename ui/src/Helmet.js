import React from 'react';
import {Helmet} from "react-helmet";
import ***REMOVED*** from 'react-html-parser'

const useHash = process.env.REACT_APP_USE_HASH_LINKS.toLowerCase() === "true";

export const ***REMOVED*** = (html, locale) => {

    const ***REMOVED*** = process.env.REACT_APP_WP_HOSTS.split(",");

    let all = new RegExp("^(http|https)://(" + ***REMOVED***.join('|') + ")", "ig");
    let link;
    let regex = /(['"])(https?:\/\/.+?)\1/ig;
    let newHtml = html;

    while ((link = regex.exec(html)) !== null) {

        let href = link[2];
        let newLink;

        if (href.indexOf("wp-content") === -1) {
            if (useHash) {
                newLink = href.replace(all, '#' + locale); //TODO:fix it!
            } else {
                newLink = href.replace(all, '/' + locale); //TODO:fix it!
            }
            newHtml = newHtml.replaceAll(link[2], newLink);
        } else {
            console.log(href)
        }
    }

    return newHtml;
};


const ***REMOVED*** = ({pages, locale}) => {

    const {yoast_head_json} = pages[0]

    return (<Helmet>
        {***REMOVED***(pages[0].yoast_head)}
    </Helmet>)

}

export default ***REMOVED***
