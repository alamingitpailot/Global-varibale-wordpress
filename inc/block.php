<?php
class PREFIXBlockName{
	public function __construct(){
		add_action( 'enqueue_block_assets', [$this, 'enqueueBlockAssets'] );
		add_action( 'init', [$this, 'onInit'] );

		add_action('admin_init', [$this, 'registerMCBSetting']);
        add_action('rest_api_init', [$this, 'registerMCBSetting']);

		add_action('wp_ajax_open_stream_api_key', [$this, 'open_stream_api_key']);
	}

	public function open_stream_api_key(){
		if(!wp_verify_nonce(sanitize_text_field($_POST['nonce']), 'wp_rest')){
			wp_send_json_error('invalid request');
		}

		$data = json_decode(wp_kses_stripslashes(sanitize_text_field($_POST['data'])), true);
		$db_data = get_option('open_stream_api_key', []);
		if(!$data && $db_data){
			wp_send_json_success($db_data);
		}

		update_option('open_stream_api_key', $data);

		wp_send_json_success($data);
	}

	public function registerMCBSetting()
    {
        register_setting('global-value-check', 'global-value-check', array(
            'show_in_rest' => array(
                'name' => 'global-value-check',
                'schema' => array(
                    'type' => 'string',
                ),
            ),
            'type' => 'string',
            'default' => '',
            'sanitize_callback' => 'sanitize_text_field',
        ));
    }

	function enqueueBlockAssets(){
		wp_register_style( 'fontAwesome', PREFIX_DIR_URL . 'assets/css/font-awesome.min.css', [], '6.4.2' ); // Icon
	}

	function onInit() {
		wp_register_style( 'prefix-block-name-style', PREFIX_DIR_URL . 'dist/style.css', [ 'fontAwesome' ], PREFIX_VERSION ); // Style
		wp_register_style( 'prefix-block-name-editor-style', PREFIX_DIR_URL . 'dist/editor.css', [ 'prefix-block-name-style' ], PREFIX_VERSION ); // Backend Style

		register_block_type( __DIR__, [
			'editor_style'		=> 'prefix-block-name-editor-style',
			'render_callback'	=> [$this, 'render']
		] ); // Register Block

		wp_set_script_translations( 'prefix-block-name-editor-script', 'textdomain', PREFIX_DIR_PATH . 'languages' );
	}

	function render( $attributes ){
		extract( $attributes );

		wp_enqueue_style( 'prefix-block-name-style' );
		wp_enqueue_script( 'prefix-block-name-script', PREFIX_DIR_URL . 'dist/script.js', [ 'react', 'react-dom' ], PREFIX_VERSION, true );
		wp_set_script_translations( 'prefix-block-name-script', 'textdomain', PREFIX_DIR_PATH . 'languages' );

		$className = $className ?? '';
		$blockClassName = "wp-block-prefix-block-name $className align$align";

		$clientId = wp_unique_id('prefix-');

		ob_start(); ?>
		<div class='<?php echo esc_attr( $blockClassName ); ?>' id='prefixBlockName-<?php echo esc_attr( $clientId ) ?>' data-attributes='<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>'></div>

		<?php return ob_get_clean();
	}
}
new PREFIXBlockName();