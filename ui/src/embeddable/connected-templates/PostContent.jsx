import {connect} from "react-redux";
import React from 'react'
import {PostContent} from "@devgateway/wp-react-lib";
import {postLoaded} from '../reducers/embeddable'

const Connected = (props) => {
    return (<PostContent  onLoad={props.onLoad} {...props}/>)
}

const ***REMOVED*** = (state, ownProps) => {
    return {}
}

const ***REMOVED*** = {
    onLoad:postLoaded
};



export default connect(***REMOVED***, ***REMOVED***)(Connected)