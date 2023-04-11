<?php

namespace YoastSEO_Vendor\WordProof\SDK\Controllers;

use YoastSEO_Vendor\WordProof\SDK\Helpers\***REMOVED***;
use YoastSEO_Vendor\WordProof\SDK\Helpers\***REMOVED***;
use YoastSEO_Vendor\WordProof\SDK\Helpers\***REMOVED***;
use YoastSEO_Vendor\WordProof\SDK\Helpers\***REMOVED***;
use YoastSEO_Vendor\WordProof\SDK\Helpers\***REMOVED***;
class CertificateController
{
    /**
     * Add scripts and schema to the head of the current page.
     *
     * @action wp_head
     */
    public function head()
    {
        if (!\YoastSEO_Vendor\WordProof\SDK\Helpers\***REMOVED***::show()) {
            return;
        }
        global $post;
        $schema = "\n";
        if (\YoastSEO_Vendor\WordProof\SDK\Helpers\***REMOVED***::***REMOVED***() === \true) {
            $schema .= '<script type="module" src="https://unpkg.com/@wordproof/uikit@1.0.*/dist/uikit/uikit.esm.js"></script>';
            $schema .= "\n";
            $schema .= '<script nomodule src="https://unpkg.com/@wordproof/uikit@1.0.*/dist/uikit/uikit.js"></script>';
            $schema .= "\n";
        }
        $schema .= '<script type="application/ld+json" class="' . \esc_attr('wordproof-schema-graph') . '">';
        $schema .= \json_encode(\YoastSEO_Vendor\WordProof\SDK\Helpers\***REMOVED***::get($post->ID, '_wordproof_schema'), \JSON_UNESCAPED_SLASHES | \JSON_UNESCAPED_UNICODE);
        $schema .= "</script>";
        $schema .= "\n";
        // phpcs:ignore WordPress.Security.EscapeOutput.***REMOVED***
        echo $schema;
    }
    /**
     * Adds the certificate tag to the content before rendering it.
     *
     * @param $content
     * @return mixed|string Content string from 'the_content' filter
     * @filter the_content
     */
    public function ***REMOVED***($content)
    {
        if (!\YoastSEO_Vendor\WordProof\SDK\Helpers\***REMOVED***::show()) {
            return $content;
        }
        if (\YoastSEO_Vendor\WordProof\SDK\Helpers\***REMOVED***::***REMOVED***()) {
            return $content;
        }
        global $post;
        $identifier = $post->ID;
        $text = \YoastSEO_Vendor\WordProof\SDK\Helpers\***REMOVED***::***REMOVED***();
        $showRevisions = \YoastSEO_Vendor\WordProof\SDK\Helpers\***REMOVED***::showRevisions() ? 'true' : 'false';
        $debug = \YoastSEO_Vendor\WordProof\SDK\Helpers\***REMOVED***::development() ? 'true' : 'false';
        $lastModified = \get_the_modified_date('c', $post->ID);
        $content .= "\n" . '<w-certificate debug="' . $debug . '" shared-identifier="' . $identifier . '" render-without-button="true" show-revisions="' . $showRevisions . '" last-modified="' . $lastModified . '"></w-certificate>';
        $content .= "\n" . '<p><w-certificate-button shared-identifier="' . $identifier . '" icon="shield" shape="text" text="' . $text . '"></w-certificate-button></p>';
        $content .= "\n";
        return $content;
    }
}
