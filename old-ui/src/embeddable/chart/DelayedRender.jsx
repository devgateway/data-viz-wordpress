import React from 'react';
import PropTypes from 'prop-types';

class Delayed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {hidden : true};
    }

    ***REMOVED***() {
        setTimeout(() => {
            this.setState({hidden: false});
        }, this.props.***REMOVED***);
    }

    render() {
        return this.state.hidden ? '' : this.props.children;
    }
}

Delayed.propTypes = {
    ***REMOVED***: PropTypes.number.isRequired
};

export default Delayed;