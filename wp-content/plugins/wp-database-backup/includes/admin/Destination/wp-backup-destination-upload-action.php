<?php
/**
 * Include destination files.
 *
 * @package wpdbbkp
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}


	require plugin_dir_path( __FILE__ ) . '/FTP/class-wpdbbackupftp.php';
	require plugin_dir_path( __FILE__ ) . '/SFTP/class-***REMOVED***.php';
	require plugin_dir_path( __FILE__ ) . '/Local/class-***REMOVED***.php';
	require plugin_dir_path( __FILE__ ) . '/Email/class-***REMOVED***.php';
	require plugin_dir_path( __FILE__ ) . '/Google/class-***REMOVED***.php';
	require plugin_dir_path( __FILE__ ) . '/S3/class-***REMOVED***.php';
	require plugin_dir_path( __FILE__ ) . '/Dropbox/class-***REMOVED***.php';
	require plugin_dir_path( __FILE__ ) . '/CloudDrive/class-***REMOVED***.php';
	require plugin_dir_path( __FILE__ ) . '/Backblaze/class-***REMOVED***.php';
