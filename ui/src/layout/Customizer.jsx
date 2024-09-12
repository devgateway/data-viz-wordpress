import React, {useEffect, useRef, useState} from "react";
import {Container, Flag, Image, Menu} from "semantic-ui-react";

const ***REMOVED*** = {
    'blogname': 'name',
    'custom_logo': 'site_logo'
}


/*
  const readCustomizationMessage = (event) => {
            console.log("-------------------------------reading customizer message ----------------------------------------")
            const data = JSON.parse(event.data);

            const newSettings = {...customization}

            if (***REMOVED***[data.property]) {
                newSettings[***REMOVED***[data.property]] = data.value;
            } else {
                if (data.property.indexOf('menu')>-1){
                    if (!newSettings["menu_settings"]){
                        newSettings["menu_settings"]={}
                    }
                    newSettings["menu_settings"][data.property] = data.value;
                }
            }

            window.settings=newSettings;
        };
* */
const ***REMOVED*** = (props) => {


    const [customization, ***REMOVED***] = useState(props.settings)

    const ref = useRef({})

    const setValue = (event) => {
        //const data = JSON.parse(event.data);
        const data = event.data;
        if (data.messageType && data.messageType == 'partial-update') {
            const ***REMOVED*** = ref.current
            if (***REMOVED***[data.property]) {
                ***REMOVED***[***REMOVED***[data.property]] = data.value;
            } else {
                if (data.property.indexOf('menu') > -1) {
                    if (!***REMOVED***["menu_settings"]) {
                        ***REMOVED***["menu_settings"] = {}
                    }
                    ***REMOVED***["menu_settings"][data.property] = data.value;
                }
            }


            ref.current = ***REMOVED***
            ***REMOVED***({...ref.current, random: Math.random()})
        }
    }

    useEffect(() => {
        window.***REMOVED***("message", setValue, false);
        return () => {
            window.***REMOVED***('message', setValue);
        };
    }, [])


    return React.Children.map(props.children, (child => React.cloneElement(child, {
        ...props,
        settings: {...customization}
    })))
}

export default ***REMOVED***
