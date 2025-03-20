import React, { useEffect } from 'react';
import ReactGA from "react-ga4";
import { useLocation } from 'react-router-dom';
import { Config } from './conf';
import { ***REMOVED*** } from '@devgateway/wp-react-lib';


const withTracker = (***REMOVED***, options = {}) => {
    const HOC = (props) => {
        const settings = React.useContext(***REMOVED***) ||  {};
        const gaCode = settings?.data?.google_analytics_code || Config.GA_CODE;
        console.log('gaCode', gaCode);
        const location = useLocation();

        ReactGA.initialize(gaCode || '#REACT_APP_GA_CODE#');


        useEffect(() => {
            if (gaCode) {
                const page = location.pathname;
                ReactGA.send({ hitType: "pageview", page });
            }
           
        }, [location.pathname]);

        
        return <***REMOVED*** {...props} />;
    };

    return HOC;
};

export default withTracker;