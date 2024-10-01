import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'

function ***REMOVED***(state: any) {
  const { intl } = state
  return {
    key: intl.locale,
    ...intl
  }
}

const ***REMOVED*** = (state: any, { intlSelector = ***REMOVED*** }) =>
  intlSelector(state)

export default connect(***REMOVED***)(IntlProvider)