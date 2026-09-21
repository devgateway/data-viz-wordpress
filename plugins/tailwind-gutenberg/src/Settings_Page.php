<?php

namespace Twg;

defined( 'ABSPATH' ) || exit;

class Settings_Page {

	const OPTION_NAME = 'twg_settings';
	const PAGE_SLUG   = 'tailwind-gutenberg';

	const DEFAULTS = array(
		'frontend_mode'            => 'local',
		'theme_css'                => '',
		'safelist'                 => '',
		'preflight'                => false,
		'load_on_frontend'         => true,
		'suggest_limit'            => 50,
		'delete_data_on_uninstall' => false,
	);

	public static function init(): void {
		add_action( 'admin_menu', array( self::class, 'add_menu' ) );
		add_action( 'admin_init', array( self::class, 'register_settings' ) );
		add_action( 'admin_post_twg_rebuild_index', array( self::class, 'handle_rebuild_index' ) );
	}

	public static function get(): array {
		return wp_parse_args( get_option( self::OPTION_NAME, array() ), self::DEFAULTS );
	}

	public static function get_safelist_classes(): array {
		$lines = preg_split( '/\r\n|\r|\n/', self::get()['safelist'] );

		return array_values( array_filter( array_map( 'trim', $lines ) ) );
	}

	public static function add_menu(): void {
		add_options_page(
			__( 'Tailwind Classes', 'tailwind-gutenberg' ),
			__( 'Tailwind Classes', 'tailwind-gutenberg' ),
			'manage_options',
			self::PAGE_SLUG,
			array( self::class, 'render_page' )
		);
	}

	public static function register_settings(): void {
		register_setting(
			self::PAGE_SLUG,
			self::OPTION_NAME,
			array(
				'type'              => 'array',
				'sanitize_callback' => array( self::class, 'sanitize' ),
				'default'           => self::DEFAULTS,
			)
		);
	}

	public static function sanitize( mixed $value ): array {
		$value = is_array( $value ) ? $value : array();

		return array(
			'frontend_mode'    => in_array( $value['frontend_mode'] ?? '', array( 'local', 'cdn' ), true )
				? $value['frontend_mode']
				: self::DEFAULTS['frontend_mode'],
			'theme_css'        => sanitize_textarea_field( $value['theme_css'] ?? '' ),
			'safelist'         => sanitize_textarea_field( $value['safelist'] ?? '' ),
			'preflight'        => ! empty( $value['preflight'] ),
			'load_on_frontend' => ! empty( $value['load_on_frontend'] ),
			'suggest_limit'    => max( 1, absint( $value['suggest_limit'] ?? self::DEFAULTS['suggest_limit'] ) ),
			'delete_data_on_uninstall' => ! empty( $value['delete_data_on_uninstall'] ),
		);
	}

	public static function handle_rebuild_index(): void {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'You do not have permission to do this.', 'tailwind-gutenberg' ) );
		}

		check_admin_referer( 'twg_rebuild_index' );

		Class_Index::rebuild();

		wp_safe_redirect(
			add_query_arg( 'twg-rebuilt', '1', admin_url( 'options-general.php?page=' . self::PAGE_SLUG ) )
		);
		exit;
	}

	public static function render_page(): void {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$settings    = self::get();
		$current_css = Compiler::get_current();
		$index_count = count( Class_Index::get() );
		?>
		<div class="wrap">
			<h1><?php esc_html_e( 'Tailwind Classes', 'tailwind-gutenberg' ); ?></h1>

			<h2><?php esc_html_e( 'Status', 'tailwind-gutenberg' ); ?></h2>
			<table class="widefat striped" style="max-width: 640px;">
				<tbody>
					<tr>
						<th scope="row"><?php esc_html_e( 'Frontend mode', 'tailwind-gutenberg' ); ?></th>
						<td><?php echo esc_html( $settings['frontend_mode'] ); ?></td>
					</tr>
					<tr>
						<th scope="row"><?php esc_html_e( 'Current stylesheet', 'tailwind-gutenberg' ); ?></th>
						<td>
							<?php if ( ! empty( $current_css['url'] ) ) : ?>
								<a href="<?php echo esc_url( $current_css['url'] ); ?>"><?php echo esc_html( $current_css['url'] ); ?></a>
								<br />
								<?php
								printf(
									/* translators: %s: human-readable time since the CSS file was last written, e.g. "3 hours". */
									esc_html__( 'Updated %s ago', 'tailwind-gutenberg' ),
									esc_html( human_time_diff( (int) $current_css['updated_at'] ) )
								);
								?>
							<?php else : ?>
								<?php esc_html_e( 'Not generated yet — open and save any post in the block editor.', 'tailwind-gutenberg' ); ?>
							<?php endif; ?>
						</td>
					</tr>
					<tr>
						<th scope="row"><?php esc_html_e( 'Classes in index', 'tailwind-gutenberg' ); ?></th>
						<td><?php echo esc_html( number_format_i18n( $index_count ) ); ?></td>
					</tr>
				</tbody>
			</table>

			<p class="description">
				<?php esc_html_e( 'There is no separate "rebuild CSS" action: the stylesheet above is always whatever the block editor most recently compiled and saved. Opening and saving a post refreshes it.', 'tailwind-gutenberg' ); ?>
			</p>

			<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
				<?php wp_nonce_field( 'twg_rebuild_index' ); ?>
				<input type="hidden" name="action" value="twg_rebuild_index" />
				<?php submit_button( __( 'Rebuild index', 'tailwind-gutenberg' ), 'secondary' ); ?>
				<p class="description">
					<?php esc_html_e( 'Rescans every post (and reusable block) and replaces the class index above with exactly what it finds.', 'tailwind-gutenberg' ); ?>
				</p>
			</form>

			<h2><?php esc_html_e( 'Settings', 'tailwind-gutenberg' ); ?></h2>
			<form method="post" action="options.php">
				<?php settings_fields( self::PAGE_SLUG ); ?>
				<table class="form-table" role="presentation">
					<tr>
						<th scope="row">
							<label for="twg-frontend-mode"><?php esc_html_e( 'Frontend mode', 'tailwind-gutenberg' ); ?></label>
						</th>
						<td>
							<select id="twg-frontend-mode" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[frontend_mode]">
								<option value="local" <?php selected( $settings['frontend_mode'], 'local' ); ?>>
									<?php esc_html_e( 'Local file (compiled by the editor)', 'tailwind-gutenberg' ); ?>
								</option>
								<option value="cdn" <?php selected( $settings['frontend_mode'], 'cdn' ); ?>>
									<?php esc_html_e( 'CDN (compiled by the frontend app)', 'tailwind-gutenberg' ); ?>
								</option>
							</select>
							<p class="description">
								<?php esc_html_e( 'This deployment has no Node.js runtime, so there is no server-side CLI compile option.', 'tailwind-gutenberg' ); ?>
							</p>
						</td>
					</tr>
					<tr>
						<th scope="row">
							<label for="twg-theme-css"><?php esc_html_e( 'Custom theme', 'tailwind-gutenberg' ); ?></label>
						</th>
						<td>
							<textarea id="twg-theme-css" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[theme_css]" rows="6" class="large-text code"><?php echo esc_textarea( $settings['theme_css'] ); ?></textarea>
							<p class="description">
								<?php esc_html_e( 'A raw @theme { ... } block merged into the editor compile.', 'tailwind-gutenberg' ); ?>
							</p>
						</td>
					</tr>
					<tr>
						<th scope="row">
							<label for="twg-safelist"><?php esc_html_e( 'Safelist', 'tailwind-gutenberg' ); ?></label>
						</th>
						<td>
							<textarea id="twg-safelist" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[safelist]" rows="6" class="large-text code"><?php echo esc_textarea( $settings['safelist'] ); ?></textarea>
							<p class="description">
								<?php esc_html_e( 'Classes always compiled, one per line — for classes added by PHP or JS at runtime.', 'tailwind-gutenberg' ); ?>
							</p>
						</td>
					</tr>
					<tr>
						<th scope="row"><?php esc_html_e( 'Preflight', 'tailwind-gutenberg' ); ?></th>
						<td>
							<label>
								<input type="checkbox" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[preflight]" value="1" <?php checked( $settings['preflight'] ); ?> />
								<?php esc_html_e( "Include Tailwind's CSS reset", 'tailwind-gutenberg' ); ?>
							</label>
							<p class="description">
								<?php esc_html_e( 'Warning: this usually breaks themes — it resets default margins, borders, and typography.', 'tailwind-gutenberg' ); ?>
							</p>
						</td>
					</tr>
					<tr>
						<th scope="row"><?php esc_html_e( 'Load on frontend', 'tailwind-gutenberg' ); ?></th>
						<td>
							<label>
								<input type="checkbox" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[load_on_frontend]" value="1" <?php checked( $settings['load_on_frontend'] ); ?> />
								<?php esc_html_e( 'Expose the compiled stylesheet via GET /wp-json/twg/v1/css', 'tailwind-gutenberg' ); ?>
							</label>
							<p class="description">
								<?php esc_html_e( 'Turn off if your frontend app already bundles Tailwind itself.', 'tailwind-gutenberg' ); ?>
							</p>
						</td>
					</tr>
					<tr>
						<th scope="row">
							<label for="twg-suggest-limit"><?php esc_html_e( 'Suggestion limit', 'tailwind-gutenberg' ); ?></label>
						</th>
						<td>
							<input
								type="number"
								min="1"
								id="twg-suggest-limit"
								name="<?php echo esc_attr( self::OPTION_NAME ); ?>[suggest_limit]"
								value="<?php echo esc_attr( $settings['suggest_limit'] ); ?>"
							/>
						</td>
					</tr>
					<tr>
						<th scope="row"><?php esc_html_e( 'On uninstall', 'tailwind-gutenberg' ); ?></th>
						<td>
							<label>
								<input type="checkbox" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[delete_data_on_uninstall]" value="1" <?php checked( $settings['delete_data_on_uninstall'] ); ?> />
								<?php esc_html_e( 'Delete generated files and settings when this plugin is deleted', 'tailwind-gutenberg' ); ?>
							</label>
							<p class="description">
								<?php esc_html_e( 'Off by default. Post content and its Tailwind classes are never deleted either way.', 'tailwind-gutenberg' ); ?>
							</p>
						</td>
					</tr>
				</table>
				<?php submit_button(); ?>
			</form>
		</div>
		<?php
	}
}
