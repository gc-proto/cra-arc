//Function to add title and menu of guide and footer
"use strict";
var index = [];
if (document.documentElement.lang === "en") {
	index = ["/design/assets/includes/menu-include-en.html", "/design/assets/includes/footer-include-en.html"];
}
if (document.documentElement.lang === "fr") {
	index = ["/design/assets/includes/menu-include-fr.html", "/design/assets/includes/footer-include-fr.html"];
}
var injectSpot = ["menu-include", "footer-include"];
var request = new XMLHttpRequest();

document.addEventListener('DOMContentLoaded', () => {
	(function loop(i, length) {
		if (i>= length) {
			return;
		}
		var url = index[i];

		request.open("GET", url, true);
		request.onload = () => {
			if(request.readyState === XMLHttpRequest.DONE)
			{
				if (request.status === 200) {
					document.getElementById(injectSpot[i]).innerHTML = request.responseText;
					loop(i + 1, length);
				}
			}
		};
		request.send(null);
	})(0, index.length);
});
//function to create inline overlay and to delay button switch to close menu (due to propagation in close event that cannot be properly stopped by JS
//script also pre-emptively opens details menu by default

window.onload = function() {

	$(document).on( "opened.wb-overlay", "#mb-pnl", function() {
		const myTimeout = setTimeout(showClose, 200);
		function showClose() {
			$("#mb-tggl-open, #mb-tggl-close").toggle();
		}
		console.log("it's open");
	});

	$(document).on( "closed.wb-overlay", "#mb-pnl", function() {
		const myTimeout = setTimeout(showOpen, 200);
		function showOpen() {
			$("#mb-tggl-close, #mb-tggl-open").toggle();
		}
		console.log("it's closed");
	});

	$( ".wb-menu" ).on( "wb-ready.wb-menu", function( event ) {
		$("#mb-pnl .mb-menu details").attr("open", "open");
		$("#mb-pnl .mb-menu details>ul").attr("aria-hidden", "false");
	});
};
