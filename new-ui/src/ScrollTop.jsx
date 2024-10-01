import React from 'react';
import {withRouter} from "./withRouter";


class ***REMOVED*** extends React.Component {
    ***REMOVED***() {
        window.scrollTo(0, 0);
    }

    ***REMOVED***(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.setTimeout(e => window.scrollTo(0, 0), 200)
        }
    }


    render() {
        return null;
    }
}

export default withRouter(***REMOVED***);
