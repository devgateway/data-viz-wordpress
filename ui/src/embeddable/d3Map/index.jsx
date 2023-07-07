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
            "data-map-position": ***REMOVED*** = {},
            intl
        } = props
        debugger;
        const layers = parse(dataLayers)
        const layerCreated = []

        const ref = useRef(null);
        const zoomRef = useRef(null);


        return (
            <div ref={ref} className={"d3map-container"}>
                <***REMOVED*** ***REMOVED***={decode(bgColorParam)}
                                    height={height}
                                    width={width}
                                    editing={editing} ***REMOVED***={parse(***REMOVED***, editing)}>
                    <Map>
                        {layers.map((layer, i) => {
                            if (layer.type === 'base') {
                                return <BaseLayer intl={intl}  zoom={zoomRef} unique={unique}
                                                  key={i} {...layer} />
                            }
                            if (layer.type === 'data') {
                                return <DataLayer intl={intl} group={group} zoom={zoomRef} unique={unique}
                                                  key={i} {...layer} />
                            }

                        })}
                    </Map>
                    <ZoomControl ref={zoomRef} group={group} editing={editing}/>
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
