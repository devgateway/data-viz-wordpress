<?php

namespace YoastSEO_Vendor\WordProof\SDK\Controllers;

use YoastSEO_Vendor\WordProof\SDK\Support\Settings;
class ***REMOVED***
{
    /**
     * Redirects user to the settings page. Returns false if not authenticated.
     *
     * @param null|string $redirectUrl
     * @return false
     */
    public function redirect($redirectUrl = null)
    {
        return \YoastSEO_Vendor\WordProof\SDK\Support\Settings::redirect($redirectUrl);
    }
    /**
     * Adds admin page that will redirect the user to a predefined url.
     *
     * @action admin_menu
     */
    public function ***REMOVED***()
    {
        \add_submenu_page(null, 'WordProof Settings', 'WordProof Settings', 'publish_pages', 'wordproof-redirect-settings', [$this, '***REMOVED***']);
    }
    /**
     * The content for the redirect page. Triggered by ***REMOVED***().
     */
    public function ***REMOVED***()
    {
        return;
    }
    /**
     * Redirects user on admin page load to the settings page on the WordProof My.
     *
     * @action load-admin_page_settings
     */
    public function ***REMOVED***()
    {
        $***REMOVED*** = \admin_url('admin.php?page=wordproof-close-after-redirect');
        if ($this->redirect($***REMOVED***) === \false) {
            \do_action('wordproof_authenticate', $***REMOVED***);
        }
    }
}
