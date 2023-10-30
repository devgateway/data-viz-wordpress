import React, {***REMOVED***, useRef, useState} from 'react';
import {connect} from "react-redux";
import {decode, parse} from "../utils/parseUtils";
import Map from "./Map"
import BaseLayer from './BaseLayer'
import DataLayer from './DataLayer'
import LatLongLayer from './LatLongLayer'
import ZoomControl from "./ZoomControl";
import {Container} from "semantic-ui-react";
import ***REMOVED*** from "./***REMOVED***";
import Legends from "./Legends"
import FlowLayer from "./FlowLayer";

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
            "data-projection": ***REMOVED*** = "geoMercator",

            intl
        } = props

        const [layers, setLayers] = useState(parse(dataLayers))
        const layerCreated = []
        const ref = useRef(null);
        const zoomRef = useRef(null);
        const [transform, setTransform] = useState(null)

        const ***REMOVED*** = (id) => {
          const newLayers = layers.slice()
          const ly = newLayers.find(l => l.id == id);
          if (ly) {
            ly.visible = !ly.visible
          }
          setLayers(newLayers)
        }

        return (
            <div ref={ref} className={"d3map-container"}>
                <***REMOVED*** ***REMOVED***={decode(bgColorParam)}
                                    height={height}
                                    width={width}
                                    ***REMOVED***={***REMOVED***}
                                    editing={editing} ***REMOVED***={parse(***REMOVED***, editing)}>
                    <Map>
                        {layers.filter(l => l.visible).map((layer, i) => {
                            if (layer.type === 'base') {
                                return <BaseLayer transform={transform} intl={intl} zoom={zoomRef} unique={unique}
                                                  key={i} {...layer} />
                            }
                            if (layer.type === 'data') {
                                return <DataLayer  transform={transform} intl={intl} group={group} zoom={zoomRef}
                                                  unique={unique}
                                                  key={i} {...layer} />
                            }
                            if (layer.type === 'flow') {
                                return <FlowLayer  transform={transform} intl={intl} group={group} zoom={zoomRef}
                                                   unique={unique}
                                                   key={i} {...layer} />
                            }
                            if (layer.type === 'dataPoints') {
                                return <LatLongLayer transform={transform} intl={intl} group={group} zoom={zoomRef}
                                                     unique={unique}
                                                     key={i} {...layer} />
                            }

                        })}
                    </Map>

                    <ZoomControl onZoomed={setTransform} width={width} height={height} ref={zoomRef} group={group} editing={editing}/>
                    <Legends layers={layers} onItemClick={***REMOVED***}></Legends>

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
