import React, {Component} from 'react'

export default function ***REMOVED***(***REMOVED***) {
    class ***REMOVED*** extends Component {
        constructor(props) {
            super(props)

            this.state = {
                component: null
            }
        }

        async ***REMOVED***() {
            const {default: component} = await ***REMOVED***()

            this.setState({
                component: component
            })
        }

        render() {
            const C = this.state.component

            return C ? <C {...this.props} /> : null
        }
    }

    return ***REMOVED***
}
