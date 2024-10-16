// looks for text nodes that could be referring to relative dates
// turns them in to links that open the date-calc.js calculator (required, obviously)
var linky_links;
$(function() {
	var numbers_map = {
		'two':2,'deux':2,'three':3,'trois':3,'four':4,'quatre':4,'five':5,'cinq':5,'six':6,'seven':7,'sept':7,'eight':8,'huit':8,'nine':9,'neuf':9,'ten':10,'dix':10
	};

	var pattern = new RegExp('((?:[\\(Â«]\\s*)?(?:(next|past)\\s+)?(\\d+|' + Object.keys(numbers_map).join('|') + ')\\s*[\\)Â»]?\\s+(?:(prochains|derniers)\\s+)?(working day|business day|jours ouvrable|day|calendar day|week|month|year|jour|journÃ©e|semaine|mois|annÃ©e|ans)s?)\\b', 'i');

	function linky_link(elem) {
		// check for pathId; is only set when in edit mode
		if (typeof pathId !== 'undefined') return;

		// find matching text and make them calc links
		elem.getTextNodes().each(function() {
			if (!$(this).closest('a,h1,h2,h3,.nodatecal,.badge-date').length && pattern.test(this.nodeValue)) {
				$(this).replaceWith(this.nodeValue.replace(new RegExp(pattern, 'ig'), '<a href="#" class="date_calc" data-num="$3">$1</a>') );
			}
		});
	}
	linky_links = linky_link;

	console.info('init: date-calc-links');

	// @XXX a.datecalc is for legacy links; can be removed eventually
	$('body').on('click', 'a.date_calc,a.datecalc', function(e) {
		var elem = $(e.target);

		e.preventDefault();
		e.stopImmediatePropagation();

		$(document).trigger('open.wb-lbx', [[{'src':'#modal_date_calc', 'type':'inline'}]]);

		setTimeout(function() {
			// reset the form
			$('form', '#modal_date_calc').trigger('reset');
			$('div.wb-tabs', '#modal_date_calc').trigger({'type':'wb-select.wb-tabs','id':'date_calc_opt1'});

			// get the number
			var num = elem.attr('data-num') || elem.text().replace(/\D/g, '');
			// ... in case it's text, like "two" or "trois"
			if (numbers_map[num.toLowerCase()]) num = numbers_map[num.toLowerCase()];

			// set the parsed number in to the input field
			$("#date_calc_elapsed", "#modal_date_calc").val(num);

			// parse references to days prior/past
			if (/(past|derniers)/i.test(elem.text())) {
				$("#date_calc_dir", "#modal_date_calc").val('false');
			}

			// parse unit of time
			var unit = /(working day|business day|jours ouvrable|day|week|month|year|jour|semaine|mois|annÃ©e)/i.exec(elem.text());
			switch (unit && unit[1]) {
				case 'day': case 'jour': case 'calendar day':
					$("#date_calc_unit", "#modal_date_calc").val('days');
					break;
				case 'week': case 'semaine':
					$("#date_calc_unit", "#modal_date_calc").val('weeks');
					break;
				case 'month': case 'mois':
					$("#date_calc_unit", "#modal_date_calc").val('months');
					break;
				case 'year': case 'annÃ©e':
					$("#date_calc_unit", "#modal_date_calc").val('years');
					break;
				case 'working day': case 'business day': case 'jours ouvrable':
					$("#date_calc_unit", "#modal_date_calc").val('work');
					break;
			}
		}, 200);
	});

	// find any text in the body to make in to links
	linky_link($('body>main'));

	// watch for any injected content to be abbr'd
	var the_ring = {'subtree': true, 'childList': true, 'characterData': true, 'attributes': false};
	var eye_of_sauron = new MutationObserver(function(records, observer) {
		// if in edit mode, skip out now to save time
		if (typeof pathId !== "undefined") return;

		// disconnect the observer so we don't cause a mutation event loop when we alter DOM
		observer.disconnect();

		records.forEach((mu) => {
			if (mu.type == 'childList') {
				mu.addedNodes.forEach((elem) => {
					linky_link($(elem));
				});
			}
		});

		// DOM tweaks done; re-establish the observer
		observer.observe($('body').get(0), the_ring);
	});

	eye_of_sauron.observe($('body').get(0), the_ring);
});
