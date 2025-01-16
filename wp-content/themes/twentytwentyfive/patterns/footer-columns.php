<?php
/**
 * Title: Footer with columns
 * Slug: ***REMOVED***/footer-columns
 * Categories: footer
 * Block Types: core/template-part/footer
 * Description: Footer columns with title, tagline and links.
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_Five
 * @since Twenty Twenty-Five 1.0
 */

?>
<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="padding-top:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50)">
	<!-- wp:group {"align":"wide","layout":{"type":"default"}} -->
	<div class="wp-block-group alignwide">
		<!-- wp:group {"align":"full","layout":{"type":"flex","flexWrap":"wrap","***REMOVED***":"space-between","***REMOVED***":"top"}} -->
		<div class="wp-block-group alignfull">
			<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20","padding":{"top":"0","bottom":"0","left":"0","right":"0"}}},"layout":{"type":"constrained"}} -->
			<div class="wp-block-group" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
				<!-- wp:site-title {"level":2,"fontSize":"xx-large"} /-->
				<!-- wp:site-tagline /-->
			</div>
			<!-- /wp:group -->

			<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|80"}},"layout":{"type":"flex","flexWrap":"wrap"}} -->
			<div class="wp-block-group">
				<!-- wp:group {"style":{"spacing":{"padding":{"right":"0","left":"0"}}},"layout":{"type":"constrained"}} -->
				<div class="wp-block-group" style="padding-right:0;padding-left:0">
					<!-- wp:heading {"level":3,"style":{"typography":{"fontStyle":"normal","fontWeight":"700"}},"fontSize":"medium"} -->
					<h3 class="wp-block-heading has-medium-font-size" style="font-style:normal;font-weight:700"><?php esc_html_e( 'Stories', '***REMOVED***' ); ?></h3>
					<!-- /wp:heading -->
					<!-- wp:navigation {"overlayMenu":"never","style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"fontSize":"medium","layout":{"type":"flex","orientation":"vertical"},"ariaLabel":"<?php esc_attr_e( 'Stories', '***REMOVED***' ); ?>"} -->
						<!-- wp:navigation-link {"label":"<?php esc_html_e( 'Blog', '***REMOVED***' ); ?>","url":"#"} /-->
						<!-- wp:navigation-link {"label":"<?php esc_html_e( 'About', '***REMOVED***' ); ?>","url":"#"} /-->
						<!-- wp:navigation-link {"label":"<?php esc_html_e( 'FAQs', '***REMOVED***' ); ?>","url":"#"} /-->
						<!-- wp:navigation-link {"label":"<?php esc_html_e( 'Authors', '***REMOVED***' ); ?>","url":"#"} /-->
					<!-- /wp:navigation -->
				</div>
				<!-- /wp:group -->
				<!-- wp:group {"style":{"spacing":{"padding":{"right":"0","left":"0"}}},"layout":{"type":"constrained"}} -->
				<div class="wp-block-group" style="padding-right:0;padding-left:0">
					<!-- wp:heading {"level":3,"style":{"typography":{"fontStyle":"normal","fontWeight":"700"}},"fontSize":"medium"} -->
					<h3 class="wp-block-heading has-medium-font-size" style="font-style:normal;font-weight:700"><?php echo esc_html_x( 'Fleurs', 'Example brand name.', '***REMOVED***' ); ?></h3>
					<!-- /wp:heading -->
					<!-- wp:navigation {"overlayMenu":"never","style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"fontSize":"medium","layout":{"type":"flex","orientation":"vertical"},"ariaLabel":"<?php esc_attr_e( 'Featured', '***REMOVED***' ); ?>"} -->
						<!-- wp:navigation-link {"label":"<?php esc_html_e( 'Events', '***REMOVED***' ); ?>","url":"#"} /-->
						<!-- wp:navigation-link {"label":"<?php esc_html_e( 'Shop', '***REMOVED***' ); ?>","url":"#"} /-->
						<!-- wp:navigation-link {"label":"<?php esc_html_e( 'Patterns', '***REMOVED***' ); ?>","url":"#"} /-->
						<!-- wp:navigation-link {"label":"<?php esc_html_e( 'Themes', '***REMOVED***' ); ?>","url":"#"} /-->
					<!-- /wp:navigation -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:group -->
		<!-- wp:spacer {"height":"var:preset|spacing|60"} -->
		<div style="height:var(--wp--preset--spacing--60)" aria-hidden="true" class="wp-block-spacer"></div>
		<!-- /wp:spacer -->
		<!-- wp:group {"align":"full","layout":{"type":"flex","flexWrap":"wrap","***REMOVED***":"space-between"}} -->
		<div class="wp-block-group alignfull">
			<!-- wp:paragraph {"fontSize":"small"} -->
			<p class="has-small-font-size"><?php esc_html_e( 'Twenty Twenty-Five', '***REMOVED***' ); ?></p>
			<!-- /wp:paragraph -->
			<!-- wp:paragraph {"fontSize":"small"} -->
			<p class="has-small-font-size">
			<?php
			printf(
				/* translators: Designed with WordPress. %s: WordPress link. */
				esc_html__( 'Designed with %s', '***REMOVED***' ),
				'<a href="' . esc_url( __( 'https://wordpress.org', '***REMOVED***' ) ) . '" rel="nofollow">WordPress</a>'
			);
			?>
			</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
