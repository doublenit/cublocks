<?php
/**
 * Plugin's bootstrap file to launch the plugin.
 *
 * @package     clemson_university_UR
 * @author      Jon Harp/Zac Gordon (@zgordon)
 * @license     GPL2+
 *
 * @wordpress-plugin
 * Plugin Name: Clemson University - Brand blocks
 * Plugin URI:  https://clemson.edu
 * Description: A plugin containing Clemson University branded blocks for use with Clemson WordPress installs.
 * Version:     0.0.1
 * Author:      Jon Harp/Zac Gordon
 * Author URI:  https://clemson.edu
 * Text Domain: clemson
 * Domain Path: /languages
 * License:     GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

namespace clemson_university_UR;

//  Exit if accessed directly.
defined('ABSPATH') || exit;

/**
 * Gets this plugin's absolute directory path.
 *
 * @since  2.1.0
 * @ignore
 * @access private
 *
 * @return string
 */
function _get_plugin_directory() {
	return __DIR__;
}

/**
 * Gets this plugin's URL.
 *
 * @since  2.1.0
 * @ignore
 * @access private
 *
 * @return string
 */
function _get_plugin_url() {
	static $plugin_url;

	if ( empty( $plugin_url ) ) {
		$plugin_url = plugins_url( null, __FILE__ );
	}

	return $plugin_url;
}

// Enqueue JS and CSS
include __DIR__ . '/lib/enqueue-scripts.php';

// Register meta boxes
include __DIR__ . '/lib/meta-boxes.php';

// Block Templates
include __DIR__ . '/lib/block-templates.php';

// Settings Page
include __DIR__ . '/lib/settings-page.php';

// Dynamic Blocks
// include __DIR__ . '/blocks/experts/index.php';