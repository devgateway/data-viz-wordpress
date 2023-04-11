<?php
/**
 * Logo, navigation, and offset tagline Header block pattern
 */
return array(
	'title'      => __( 'Logo, navigation, and offset tagline Header', '***REMOVED***' ),
	'categories' => array( 'header' ),
	'blockTypes' => array( 'core/template-part/header' ),
	'content'    => '<!-- wp:group {"align":"full","layout":{"inherit":true}} -->
					<div class="wp-block-group alignfull"><!-- wp:group {"align":"wide","style":{"spacing":{"padding":{"bottom":"var(--wp--custom--spacing--large, 8rem)"}}}} -->
					<div class="wp-block-group alignwide" style="padding-bottom:var(--wp--custom--spacing--large, 8rem)"><!-- wp:group {"align":"wide","style":{"spacing":{"padding":{"top":"var(--wp--custom--spacing--small, 1.25rem)"}}},"layout":{"type":"flex","***REMOVED***":"space-between"}} -->
					<div class="wp-block-group alignwide" style="padding-top:var(--wp--custom--spacing--small, 1.25rem)"><!-- wp:site-logo {"width":64} /-->

					<!-- wp:navigation {"layout":{"type":"flex","setCascadingProperties":true,"***REMOVED***":"right"}} -->
					<!-- wp:page-list {"***REMOVED***":true,"***REMOVED***":true,"***REMOVED***":false} /-->
					<!-- /wp:navigation --></div>
					<!-- /wp:group -->

					<!-- wp:columns {"***REMOVED***":false,"align":"wide"} -->
					<div class="wp-block-columns alignwide is-not-stacked-on-mobile"><!-- wp:column {"width":"64px"} -->
					<div class="wp-block-column" style="flex-basis:64px"></div>
					<!-- /wp:column -->

					<!-- wp:column {"width":"380px"} -->
					<div class="wp-block-column" style="flex-basis:380px"><!-- wp:site-tagline {"fontSize":"small"} /--></div>
					<!-- /wp:column --></div>
					<!-- /wp:columns --></div>
					<!-- /wp:group --></div>
					<!-- /wp:group -->',
);
