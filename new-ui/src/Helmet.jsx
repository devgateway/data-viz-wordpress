import React from 'react';
import { Helmet, ***REMOVED*** } from "react-helmet-async";
import ***REMOVED*** from 'html-react-parser';

console.log("env==>",process.env)

const useHash = process.env.REACT_APP_USE_HASH_LINKS === true;

export const ***REMOVED*** = (html, locale) => {

    const ***REMOVED*** = process.env.REACT_APP_WP_HOSTS.split(",");

    const all = new RegExp("^(http|https)://(" + ***REMOVED***.join('|') + ")", "ig");
    let link;
    const regex = /(['"])(https?:\/\/.+?)\1/ig;
    let newHtml = html;

    while ((link = regex.exec(html)) !== null) {

        const href = link[2];
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

const helmetContext = {}


const ***REMOVED*** = ({pages, locale}) => {

    const {yoast_head_json} = pages[0];


    return (
        <***REMOVED*** context={helmetContext}>
            <Helmet>
                {/* {***REMOVED***(pages[0].yoast_head)} */}
            </Helmet>
        </***REMOVED***>

    );

}

export default ***REMOVED***
