/**
 * @deprecated
 *
 * THIS FILE IS DEPRECATED AND MUST NOT BE USED.
 *
 * Use the Format component from the shared commons package instead:
 *
 *   import { Format } from '@devgateway/dvz-wp-commons';
 *
 * This file exists only to surface a loud runtime error if it is accidentally
 * re-introduced. It does NOT contain the real implementation — that lives in:
 *
 *   data-viz-wordpress/packages/commons/src/Format.jsx
 *
 * To expose Prefix / Suffix fields, pass the showPrefixSuffix={true} prop.
 */

import { Format as CommonsFormat } from '@devgateway/dvz-wp-commons';

const DeprecatedFormat = (props) => {
    console.error(
        '[DEPRECATED] charts/Format.jsx is deprecated and must not be used.\n' +
        'Import Format from @devgateway/dvz-wp-commons instead:\n' +
        "  import { Format } from '@devgateway/dvz-wp-commons';\n" +
        'To expose Prefix/Suffix fields pass showPrefixSuffix={true}.'
    );
    return CommonsFormat(props);
};

export default DeprecatedFormat;
