import React from 'react';
import {connect} from "react-redux";
import {parse} from "../utils/parseUtils";
import Map from "./Map"
import BaseLayer from './BaseLayer'
import DataLayer from './DataLayer'

const MapWrapper = (props) => {
    const {
        unique,
        editing,
        "data-layers": dataLayers,
        "data-height": height = 600,
    } = props

    const layers = parse(dataLayers)
    debugger
    return (
        <div>
            <Map height={height}>
                {layers.map((layer, i) => {
                    if (layer.type === 'base') {
                        return <BaseLayer key={i} {...layer} />
                    }
                    if (layer.type === 'data') {
                        return <DataLayer key={i} {...layer} />
                    }

                })}

            </Map>
        </div>
    );

};

const ***REMOVED*** = (state, ownProps) => {
    return {}
}

const ***REMOVED*** = {};

export default connect(***REMOVED***, ***REMOVED***)(MapWrapper)
