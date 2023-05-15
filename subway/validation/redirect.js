$( document ).on( "wb-ready.wb", function( event ) {

//Renders search disabled
$('#wb-srch-sub').attr("disabled", true);

//Seperate script to null all canada.ca links to a 404 page (including GC menu) and redirect some in menu
	//custom redirects
	//$("a[href='urlonpage']").attr("href", "urltoredirect");

//Redirect of government pages	
$("a[href*='canada.ca']").attr("href", "/cra-arc/subway/validation/404.html");
$("a[href*='.gc.ca/']").attr("href", "/cra-arc/subway/validation/404.html");
//});

//Remove visited link design from 404 pages
var visited_link_styling = "<style> a[href*='404.html']:visited{ color:#284162; } </style>"; $('head').append( visited_link_styling );
//Hiding menu and search from navigation
//$(".gcweb-menu>.container, #wb-srch").addClass("hidden");
});

