<?php

class PSOURCE_Field_Colorpicker extends PSOURCE_Field {
	/**
	 * Use this to setup your child form field instead of __construct()
	 *
	 * @since 1.0
	 * @access public
	 * @param array $args
	 */
	public function on_creation( $args ) {
		$this->args['class'] .= ' psource-field-colorpicker-input';
		$this->args['style'] .= 'width:100px;';
	}

	/**
	 * Enqueue scripts
	 *
	 * @since 1.0
	 * @access public
	 */
	   public function enqueue_scripts() {
		   wp_enqueue_script('psource-field-colorpicker-pickr', PSOURCE_Metabox::class_url('ui/colorpicker/pickr.min.js'), array(), PSOURCE_METABOX_VERSION);
	   }
	
	/**
	 * Enqueue styles
	 *
	 * @since 1.0
	 * @access public
	 */
	   public function enqueue_styles() {
		   wp_enqueue_style('psource-field-colorpicker-pickr', PSOURCE_Metabox::class_url('ui/colorpicker/pickr.min.css'), array(), PSOURCE_METABOX_VERSION);
	   }

	/**
	 * Prints inline javascript
	 *
	 * @since 1.0
	 * @access public
	 */	
	   public function print_scripts() {
		   ?>
		   <script type="text/javascript">
		   document.addEventListener('DOMContentLoaded', function() {
			   document.querySelectorAll('.psource-field-colorpicker-input').forEach(function(input) {
				   // Container für Pickr erzeugen
				   var pickrContainer = document.createElement('span');
				   pickrContainer.className = 'psource-colorpicker-pickr';
				   input.parentNode.insertBefore(pickrContainer, input.nextSibling);

				   // Pickr initialisieren
				   var pickr = Pickr.create({
					   el: pickrContainer,
					   theme: 'classic',
					   default: input.value || '#ffffff',
					   swatches: [
						   '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
						   '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
						   '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
						   '#FF5722', '#795548', '#607D8B', '#000000', '#ffffff'
					   ],
					   components: {
						   preview: true,
						   opacity: true,
						   hue: true,
						   interaction: {
							   hex: true,
							   rgba: true,
							   input: true,
							   save: true
						   }
					   }
				   });

				   // Synchronisiere Pickr mit Input
				   pickr.on('save', (color) => {
					   var hex = color.toHEXA().toString();
					   input.value = hex;
					   pickr.hide();
				   });
				   pickr.on('change', (color) => {
					   var hex = color.toHEXA().toString();
					   input.value = hex;
				   });
				   input.addEventListener('input', function() {
					   pickr.setColor(input.value);
				   });
			   });
		   });
		   </script>
		   <?php
		   parent::print_scripts();
	   }
	
	/**
	 * Displays the field
	 *
	 * @since 1.0
	 * @access public
	 * @param int $post_id
	 */
	public function display( $post_id ) {
		$this->before_field();
		?>
		<input type="text" <?php echo $this->parse_atts(); ?> value="<?php echo $this->get_value($post_id); ?>" />
		<?php
		$this->after_field();
	}
}