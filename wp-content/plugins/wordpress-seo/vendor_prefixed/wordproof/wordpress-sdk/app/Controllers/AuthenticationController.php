<?php

namespace YoastSEO_Vendor\WordProof\SDK\Controllers;

use YoastSEO_Vendor\WordProof\SDK\Support\***REMOVED***;
class AuthenticationController
{
    /**
     * Triggers the ***REMOVED*** flow.
     *
     * @param null $redirectUrl
     */
    public function authenticate($redirectUrl = null)
    {
        return \YoastSEO_Vendor\WordProof\SDK\Support\***REMOVED***::authorize($redirectUrl);
    }
    /**
     * Adds admin page that redirects to the ***REMOVED*** flow.
     */
    public function ***REMOVED***()
    {
        \add_submenu_page(null, 'WordProof Authenticate', 'WordProof Authenticate', 'publish_pages', 'wordproof-redirect-authenticate', [$this, '***REMOVED***']);
    }
    /**
     * The content for the redirect page.
     */
    public function ***REMOVED***()
    {
    }
    /**
     * Gets triggered by the 'load-admin_page_' hook of the redirect page
     */
    public function ***REMOVED***()
    {
        \do_action('wordproof_authenticate', \admin_url('admin.php?page=wordproof-close-after-redirect'));
    }
    /**
     * Adds self destruct admin page.
     */
    public function ***REMOVED***()
    {
        \add_submenu_page(null, 'WordProof After Authenticate', 'WordProof After Authenticate', 'publish_pages', 'wordproof-close-after-redirect', [$this, '***REMOVED***']);
    }
    /**
     * Adds a script to the loaded page to close on load.
     */
    public function ***REMOVED***()
    {
        echo '<script type="text/javascript">';
        echo 'window.close();';
        echo '</script>';
    }
}
