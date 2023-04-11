/**
 * File customize-preview.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes ***REMOVED***.
 */

(function ($) {


    // Listen for any changes in the Customizer Preview.
    wp.customize.bind("change", function (setting) {
        if (document.***REMOVED***("react-preview") && document.***REMOVED***("react-preview").contentWindow.postMessage) {
            console.log(setting.id);
            document.***REMOVED***("react-preview").contentWindow.postMessage(
           ({"messageType": 'partial-update', 'property': setting.id, 'value': setting._value}), "*");
        }
    })




})(jQuery);
