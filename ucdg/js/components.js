/*Selects default radio button in a field flow */
$( ".wb-fieldflow" ).on( "wb-ready.wb-fieldflow", function( event ) {
	$(".radioselected .radio:first-of-type label input").prop("checked", true);
	}
);


/*Data-inview */
!function(e)
{"use strict";wb.doc.on("all.wb-inview partial.wb-inview none.wb-inview",
function(i)
{"wb-inview"===i.namespace&&e(i.target).find(".view-state-status").html(i.type)})}
(jQuery);	

