import React, {Component} from 'react';

import ReactGA from "react-ga4";




ReactGA.initialize('#REACT_APP_GA_CODE#');

const withTracker = (***REMOVED***, options = {}) => {


    const HOC = class extends Component {
        ***REMOVED***() {

            const page = this.props.location.pathname;
            ReactGA.send({hitType: "pageview", page});

            //trackPage(page);
        }

        ***REMOVED*** = prevPros => {
            const currentPage = prevPros.location.pathname;
            const nextPage = this.props.location.pathname;

            if (currentPage !== nextPage) {
                ReactGA.send({hitType: "pageview", page: nextPage});

            }
        };

        render() {

            return <***REMOVED*** {...this.props} />;
        }
    };

    return HOC;
};

export default withTracker;
