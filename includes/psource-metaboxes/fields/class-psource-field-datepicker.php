<?php

class PSOURCE_Field_Datepicker extends PSOURCE_Field {

	/**
	 * Runs on construct of parent class
	 *
	 * @since 1.0
	 * @access public
	 */
	public function on_creation( $args ) {
		$this->args[ 'class' ] .= ' psource-datepicker-field';
	}

	/**
	 * Prints scripts
	 *
	 * @since 1.0
	 * @access public
	 */
	public function print_scripts() {
		?>
		<script type="text/javascript">
			( function( $ ) {
				$( document ).on( 'psource_repeater_field/before_add_field_group', function( e ) {
					// No jQuery UI cleanup needed for HTML5 date inputs
				} );

				$( document ).on( 'psource_repeater_field/after_add_field_group', function( e, $group ) {
					$( 'input.psource-datepicker-field' ).each( function() {
						var $this = $( this );
						// Set type to date for HTML5 date picker
						$this.attr( 'type', 'date' ).css( { 'cursor': 'pointer' } );
						// Store hidden field value
						$this.on( 'change', function() {
							$this.prev( 'input[type="hidden"]' ).val( $this.val() );
						} );
					} );
				} );

				$( document ).ready( function() {
					$( 'input.psource-datepicker-field' ).each( function() {
						var $this = $( this );
						// Set type to date for HTML5 date picker
						$this.attr( 'type', 'date' ).css( { 'cursor': 'pointer' } );
						// Store hidden field value
						$this.on( 'change', function() {
							$this.prev( 'input[type="hidden"]' ).val( $this.val() );
						} );
					} );
				} );
			}( jQuery ) );
		</script>
		<?php
	}

	/**
	 * Legacy function - previously converted PHP date format to jQuery UI dateFormat.
	 * Kept for backwards compatibility but no longer used with HTML5 date inputs.
	 *
	 * @since 1.0
	 * @access public
	 * @param string $format
	 * @return string
	 */
	public static function format_date_for_jquery( $format ) {
		$pattern = array( 'd', 'j', 'l', 'z', 'F', 'M', 'n', 'm', 'Y', 'y', 'S' );
		$replace = array( 'dd', 'd', 'DD', 'o', 'MM', 'M', 'm', 'mm', 'yy', 'y', '' );

		foreach ( $pattern as &$p ) {
			$p = '/' . $p . '/';
		}

		return preg_replace( $pattern, $replace, $format );
	}

	/**
	 * Checks if provided string is a valid timestamp
	 *
	 * @since 1.0
	 * @access public
	 * @param string $value
	 * @return bool
	 */
	public function is_timestamp( $value ) {
		return ( is_numeric( $value ) && (int) $value == $value );
	}

	/**
	 * Formats the field value for display
	 *
	 * @since 1.0
	 * @access public
	 * @param mixed $value
	 * @param mixed $post_id
	 */
	public function format_value( $value, $post_id ) {
		if ( !empty( $value ) ) {
			$value	 = $this->is_timestamp( $value ) ? $value : strtotime( $value );
			$value	 = date_i18n( get_option( 'date_format' ), $value );
		}

		// These filters are defined in class-psource-field.php
		$value = apply_filters( 'psource_field/format_value', $value, $post_id, $this );
		return apply_filters( 'psource_field/format_value/' . $this->args[ 'name' ], $value, $post_id, $this );
	}

	/**
	 * Sanitizes the field value before saving to database
	 *
	 * @since 1.0
	 * @access public
	 * @param mixed $value
	 * @param mixed $post_id
	 */
	public function sanitize_for_db( $value, $post_id ) {
		$value	 = $this->is_timestamp( $value ) ? date( 'Y-m-d', $value ) : $value;
		// These filters are defined in class-psource-field.php
		$value	 = apply_filters( 'psource_field/sanitize_for_db', $value, $post_id, $this );
		return apply_filters( 'psource_field/sanitize_for_db/' . $this->args[ 'name' ], $value, $post_id, $this );
	}

	/**
	 * Enqueue styles
	 *
	 * @since 1.0
	 * @access public
	 */

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
		<input type="hidden" <?php echo $this->parse_atts(); ?> value="<?php echo $this->get_value( $post_id, null, true ); ?>" />
		<input type="text" class="psource-datepicker-field" value="<?php echo $this->get_value( $post_id ); ?>" />
		<?php
		$this->after_field();
	}

}
