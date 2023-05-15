window.addEventListener("load", disableSearch);
const linkClick = document.querySelector("a");

linkClick.addEventListener("click", reDirect);

function disableSearch() {
const trgtInputs = document.querySelector("#wb-srch-q, #wb-srch-sub").setAttribute('disabled', true);
for (const trgtInput of trgtInputs) {
trgtInput.setAttribute('disabled', true);
	}
}

function reDirect(e) {
    if(linkClick.href.indexOf('canada.ca') > -1) { 
        e.preventDefault();
      window.location.href = '/cra-arc/subway/validation/404.html';
	}
}
