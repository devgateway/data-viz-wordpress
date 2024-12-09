import {connect} from "react-redux";
import React from 'react'
import {PostIntro} from "@devgateway/wp-react-lib";
import {postLoaded} from '../reducers/embeddable'

const Connected = (props) => {
    return (<PostIntro  onLoad={props.onLoad} {...props}/>)
}

const ***REMOVED*** = (state, ownProps) => {
    return {}
}

const ***REMOVED*** = {
    onLoad:postLoaded
};



export default connect(***REMOVED***, ***REMOVED***)(Connected)