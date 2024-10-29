import React from 'react'
import {***REMOVED***} from './DataContext'

const ***REMOVED*** = (props) => {


    return (
        <***REMOVED***.Consumer>
            {(data) => {

                return data && <React.Fragment>
                    {React.Children.map(props.children, (child => {
                        return React.cloneElement(child, {...props,data} )
                    }))}
                </React.Fragment>
            }}
        </***REMOVED***.Consumer>
    )
}


export default ***REMOVED***
