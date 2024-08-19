import {connect} from "react-redux";
import React, {useEffect, useState} from 'react'
import {PostContent} from "@devgateway/wp-react-lib";
import {postLoaded} from '../reducers/embeddable'

const Connected = (props) => {
    return (<PostContent  onLoad={props.onLoad} {...props}/>)
}

const ***REMOVED*** = (state, ownProps) => {

}

const ***REMOVED*** = {
    onLoad:postLoaded
};



export default connect(***REMOVED***, ***REMOVED***)(Connected)
