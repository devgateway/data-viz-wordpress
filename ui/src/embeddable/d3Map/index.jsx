import React, {***REMOVED***, useRef, useState} from 'react';
import {connect} from "react-redux";
import {decode, parse} from "../utils/parseUtils";
import Map from "./Map"
import BaseLayer from './BaseLayer'
import DataLayer from './DataLayer'
import ZoomControl from "./ZoomControl";
import {Container} from "semantic-ui-react";
import ***REMOVED*** from "./***REMOVED***";

const MapWrapper = (props) => {
        const {
            unique,
            editing,
            "data-group": group,
            "data-layers": dataLayers,
            "data-height": height = 400,
            "data-width": width = 1000,
            "data-back-ground-color": bgColorParam = '#88e8dc',
            "data-map-position": ***REMOVED*** = {}
        } = props

        const layers = parse(dataLayers)
        const [readyState, setReadyState] = React.useState(false)
        const layerCreated = []

        const ref = useRef(null);
        const ***REMOVED*** = (layer) => {
            layerCreated.push(layer)
            if (layerCreated.length == layers.length) {
                setReadyState(true)
            }
        }


        return (
            <div ref={ref} className={"d3map-container"}>

                <***REMOVED*** ***REMOVED***={decode(bgColorParam)}
                                    height={height}
                                    width={width}
                                    editing={editing} ***REMOVED***={parse(***REMOVED***, editing)}>
                    <Map>
                        {layers.map((layer, i) => {
                            if (layer.type === 'base') {
                                return <BaseLayer unique={unique} ***REMOVED***={e => ***REMOVED***(layer)}
                                                  key={i} {...layer} />
                            }
                            if (layer.type === 'data') {
                                return <DataLayer unique={unique} ***REMOVED***={e => ***REMOVED***(layer)}
                                                  key={i} {...layer} />
                            }

                        })}
                    </Map>
                    <ZoomControl group={group} readyState={readyState} editing={editing}/>
                </***REMOVED***>
            </div>
        );

    }
;

const ***REMOVED*** = (state, ownProps) => {
    return {}
}

const ***REMOVED*** = {};

export default connect(***REMOVED***, ***REMOVED***)(MapWrapper)
