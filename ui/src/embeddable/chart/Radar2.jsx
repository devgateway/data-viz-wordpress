import React, {useState} from 'react'
import {injectIntl} from 'react-intl';
import {ResponsivePie} from '@nivo/pie'
import Tooltip from "@/common/ChartTooltip"
import {formatContent} from '@/common/ChartTooltip'
import {
    colorSchemes,
    isCategoricalColorScheme,
    isSequentialColorScheme,
    sequentialColorInterpolators
} from "@nivo/colors";
import * as d3 from "d3";


const data=[
    {
        "taste": "fruity",
        "chardonay": 40,
        "carmenere": 92,
        "syrah": 107
    },
    {
        "taste": "bitter",
        "chardonay": 92,
        "carmenere": 83,
        "syrah": 91
    },
    {
        "taste": "heavy",
        "chardonay": 66,
        "carmenere": 89,
        "syrah": 43
    },
    {
        "taste": "strong",
        "chardonay": 87,
        "carmenere": 109,
        "syrah": 106
    },
    {
        "taste": "sunny",
        "chardonay": 42,
        "carmenere": 64,
        "syrah": 110
    }
]


// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/radar
import { ***REMOVED*** } from '@nivo/radar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const ***REMOVED*** = ({ data /* see data tab */ }) => {

    alert("radar");

 return    <***REMOVED***
        data={data}
        keys={['chardonay', 'carmenere', 'syrah']}
        indexBy="taste"
        valueFormat=">-.2f"
        margin={{top: 70, right: 80, bottom: 40, left: 80}}
        borderColor={{from: 'color'}}
        ***REMOVED***={36}
        dotSize={10}
        dotColor={{theme: 'background'}}
        ***REMOVED***={2}
        colors={{scheme: 'nivo'}}
        blendMode="multiply"
        motionConfig="wobbly"
        legends={[
            {
                anchor: 'top-left',
                direction: 'column',
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
}


export default ***REMOVED***