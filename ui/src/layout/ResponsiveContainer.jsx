import React from 'react'

import {Container,} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import {***REMOVED***} from '@devgateway/wp-react-lib'
import {Media} from "../AppMedia.js"
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import TopNavigator from "./TopNavigator.jsx";
import ***REMOVED*** from "./Customizer.jsx";


const ***REMOVED*** = ({ children, fixed }) => {
    return (
        <Container fluid>
            <***REMOVED***>
                <***REMOVED***>
                    <Header></Header>
                </***REMOVED***>
            </***REMOVED***>
            <Container className="desktop">
                {children}
            </Container>
            <TopNavigator/>
        </Container>
    )
}

***REMOVED***.propTypes = {
    children: PropTypes.node,
}


function ***REMOVED*** (props) {

    const {children, fixed, locale, pages} = props
    const page = pages ? pages[0] : null;

        return (<div>
            <style>
                {Media.mediaStyles}
            </style>
            <***REMOVED*** fixed={fixed}>
                {children}
            </***REMOVED***>
            {page && page.template === "noofoter.php" ? "" : <Footer></Footer>}
        </div>)
}


export default ***REMOVED***
