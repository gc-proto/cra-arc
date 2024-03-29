(function( $, wb ) {
"use strict";

wb.doc.on( "click vclick", "#overlay-open-slct", function( event ) {
	if ( event.stopPropagation ) {
		event.stopImmediatePropagation();
	} else {
		event.cancelBubble = true;
	}

	$( "#" + $( "#overlay-select" ).val() ).trigger( "open.wb-overlay" );
});

})( jQuery, wb );



(function( $, wb ) {
"use strict";

var $document = wb.doc;

$document.on( "click vclick", "#lbx-open-btn", function( event ) {
	var value = $( "#lbx-select" ).val();

	if ( value === "1" ) {
		$document.trigger( "open.wb-lbx", [
			[
				{
					src: "demo/1_b.jpg",
					type: "image"
				}
			],
			false,
			[
				"Image 1"
			]
		]);
	} else if ( value === "2" ) {
		$document.trigger( "open.wb-lbx", [
			[
				{
					src: "ajax/ajax1-en.html",
					type: "ajax"
				}
			]
		]);
	} else if ( value === "3" ) {
		$document.trigger( "open.wb-lbx", [
			[
				{
					src: "#inline_content",
					type: "inline"
				}
			]
		]);
	} else if ( value === "4" ) {
		$document.trigger( "open.wb-lbx", [
			[
				{
					src: "#inline_content_modal",
					type: "inline"
				}
			],
			true
		]);
	} else if ( value === "5" ) {
		$document.trigger( "open.wb-lbx", [
			[
				{
					src: "demo/1_b.jpg",
					type: "image"
				}, {
					src: "demo/2_b.jpg",
					type: "image"
				}, {
					src: "demo/3_b.jpg",
					type: "image"
				}
			],
			false,
			[
				"Image 1",
				"Image 2",
				"Image 3"
			]
		]);
	}
});

})( jQuery, wb );

