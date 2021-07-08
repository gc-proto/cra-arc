(function( $, wb ) {
"use strict";

var $document = wb.doc;

$document.on( "click vclick", "#overlay-open-btn", function( event ) {

	var value = $( "fieldset[data-test=name-test] input:checked" ).val();

	if ( value === "Left panel" ) {
		$( "#left-panel" ).trigger( "open.wb-overlay");
	} else if ( value === "Right panel" ) {
		$( "#right-panel" ).trigger( "open.wb-overlay");
	} else if ( value === "Top bar" ) {
			$( "#top-bar" ).trigger( "open.wb-overlay");
	} else if ( value === "Bottom bar" ) {
			$( "#bottom-bar" ).trigger( "open.wb-overlay");
	} else if ( value === "Middle screen" ) {
			$( "#mid-screen" ).trigger( "open.wb-overlay");
	} else if ( value === "Full screen" ) {
			$( "#full-screen" ).trigger( "open.wb-overlay");
	} else if ( value === "Full screen (hidden header)" ) {
			$( "#hidden-header" ).trigger( "open.wb-overlay");
		
	} else if ( value === "Centred popup" ) {
	$document.trigger( "open.wb-lbx", [
			[
				{
					src: "#centred-popup",
					type: "inline"
				}
			]
		]);
	} else if ( value === "Centred popup (modal)" ) {
	$document.trigger( "open.wb-lbx", [
			[
				{
					src: "#centred-popup-modal",
					type: "inline"
				}
			]
		]);
	} else if ( value === "Middle screen (with black background)" ) {
	$document.trigger( "open.wb-lbx", [
			[
				{
					src: "#mid-screen-bg",
					type: "inline"
				}
			]
		]);
	}
});

})( jQuery, wb );