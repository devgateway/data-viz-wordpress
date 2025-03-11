import React from "react";
import {Icon, Label, Popup} from 'semantic-ui-react'
import {connect} from "react-redux";

const decodeContent=(content) => {
    let result;
   try {
      result = ***REMOVED***(content)
   }  catch(err) {
      result = content
      console.error('error occurred decoding content:' + content )
    }
    return result
}

const Reference = ({
                       "data-index": index = "",
                       "data-description": description = "",
                       "data-link": link = ""

                   }) => {

    console.log("add references "+index)

    return <Popup className="reference-popup" hoverable size={"mini"} offset={[-16, 0]} content={<div>

        <p>{decodeContent(description)}</p>
        <a href={link} target="_blank">{link}</a>
    </div>}
                  trigger={<a data-index={index} data-description={description} data-link={link} href={`#ref_${index}`} className={"wp-reference"}>{index}</a>}/>
}



const ***REMOVED*** = (state, ownProps) => {
    return {random: state.getIn(["embeddable", "random"])}
}

const ***REMOVED*** = {};
export default connect(***REMOVED***, ***REMOVED***)(Reference)
