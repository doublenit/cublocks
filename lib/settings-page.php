<?php
/* CU Socials Options Settings Page */
class cusocialsoptions_Settings_Page {
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'wph_create_settings' ) );
		add_action( 'admin_init', array( $this, 'wph_setup_sections' ) );
		add_action( 'admin_init', array( $this, 'wph_setup_fields' ) );
	}
	public function wph_create_settings() {
		$page_title = 'Clemson University Social Blocks';
		$menu_title = 'CU Socials Options';
		$capability = 'manage_options';
		$slug = 'cusocialsoptions';
		$callback = array($this, 'wph_settings_content');
		add_options_page($page_title, $menu_title, $capability, $slug, $callback);
	}
	public function wph_settings_content() { ?>
		<div class="wrap">
			<h1>Clemson University Social Blocks</h1>
			<?php settings_errors(); ?>
			<form method="POST" action="options.php">
				<?php
					settings_fields( 'cusocialsoptions' );
					do_settings_sections( 'cusocialsoptions' );
					submit_button();
				?>
			</form>
		</div> <?php
	}

	public function wph_setup_sections() {
		add_settings_section( 'cusocialsoptions_section', 'Test description', array(), 'cusocialsoptions' );
	}
	public function wph_setup_fields() {
		$fields = array(
			array(
				'label' => 'Twitter',
				'id' => 'twitter',
				'type' => 'text',
				'section' => 'cusocialsoptions_section',
			),
			array(
				'label' => 'Instagram',
				'id' => 'instagram',
				'type' => 'text',
				'section' => 'cusocialsoptions_section',
			),
			array(
				'label' => 'Facebook',
				'id' => 'facebook',
				'type' => 'text',
				'section' => 'cusocialsoptions_section',
			),
			array(
				'label' => 'website',
				'id' => 'website',
				'type' => 'text',
				'section' => 'cusocialsoptions_section',
			),
		);
		foreach( $fields as $field ){
			add_settings_field( $field['id'], $field['label'], array( $this, 'wph_field_callback' ), 'cusocialsoptions', $field['section'], $field );
			register_setting( 'cusocialsoptions', $field['id'] );
		}
	}
	public function wph_field_callback( $field ) {
		$value = get_option( $field['id'] );
		switch ( $field['type'] ) {
			default:
				printf( '<input name="%1$s" id="%1$s" type="%2$s" placeholder="%3$s" value="%4$s" />',
					$field['id'],
					$field['type'],
					$field['placeholder'],
					$value
				);
		}
		if( $desc = $field['desc'] ) {
			printf( '<p class="description">%s </p>', $desc );
		}
	}
}
new cusocialsoptions_Settings_Page();