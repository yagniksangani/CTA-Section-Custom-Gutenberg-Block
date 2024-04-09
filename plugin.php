<?php
/**
 * Plugin Name: CTA Section Custom GB Block
 * Plugin URI: https://github.com/yagniksangani
 * Description: Used for add call to action section block in gutenberg.
 * Author: Yagnik Sangani
 * Author URI: https://profiles.wordpress.org/yagniksangani/
 * Version: 1.1
 * Tested up to: 6.5
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CTASection
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
