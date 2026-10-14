<?php

namespace Twg;

defined( 'ABSPATH' ) || exit;

/**
 * Writes editor-compiled CSS (received via REST) to a hashed file in
 * uploads. There is no server-side Tailwind compilation here: this
 * deployment's PHP runtime has no Node.js available, so the CSS this
 * writes is always produced by @tailwindcss/browser in the editor canvas.
 */
class Compiler {

	const SUBDIR      = 'twg';
	const KEEP_RECENT = 2;

	public static function write( string $css ): array {
		$dir = self::target_dir();

		if ( ! $dir ) {
			return array();
		}

		$hash     = substr( md5( $css ), 0, 12 );
		$filename = "twg-{$hash}.css";
		$path     = trailingslashit( $dir['path'] ) . $filename;

		if ( ! file_exists( $path ) ) {
			file_put_contents( $path, $css ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents
		}

		self::prune( $dir['path'], $filename );

		update_option(
			'twg_current_css',
			array(
				'hash'       => $hash,
				'url'        => trailingslashit( $dir['url'] ) . $filename,
				'updated_at' => time(),
			),
			false
		);

		return self::get_current();
	}

	public static function get_current(): array {
		return get_option( 'twg_current_css', array() );
	}

	private static function target_dir(): ?array {
		$upload_dir = wp_upload_dir();

		if ( ! empty( $upload_dir['error'] ) ) {
			return null;
		}

		$path = trailingslashit( $upload_dir['basedir'] ) . self::SUBDIR;

		if ( ! file_exists( $path ) && ! wp_mkdir_p( $path ) ) {
			return null;
		}

		return array(
			'path' => $path,
			'url'  => trailingslashit( $upload_dir['baseurl'] ) . self::SUBDIR,
		);
	}

	private static function prune( string $dir, string $keep_filename ): void {
		$files = glob( trailingslashit( $dir ) . 'twg-*.css' );

		if ( ! $files ) {
			return;
		}

		usort(
			$files,
			static function ( $a, $b ) {
				return filemtime( $b ) <=> filemtime( $a );
			}
		);

		$keep = array_slice( $files, 0, self::KEEP_RECENT );

		foreach ( $files as $file ) {
			if ( basename( $file ) !== $keep_filename && ! in_array( $file, $keep, true ) ) {
				wp_delete_file( $file );
			}
		}
	}
}
