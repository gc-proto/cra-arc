
// adds a date calculator modal dialog to the page, requires button to activate
// <a href="#modal_date_calc" aria-controls="modal_date_calc" role="button" class="btn btn-default wb-lbx"><i class="fa fa-calculator"></i> Date calculator</a>
$(function() {
	$('body>main').append(`<template data-type="date-calc" lang="en">
		<section id="modal_date_calc" class="mfp-hide modal-dialog modal-content overlay-def no-print" aria-live="assertive" aria-modal="true">
			<header class="modal-header">
				<h2 class="modal-title">Date calculator</h1>
			</header>
			<div class="modal-body">
				<div class="wb-tabs ignore-session">
					<div class="tabpanels">
						<details id="date_calc_opt1" open="open">
							<summary>Date after amount of time</summary>
							<form>
							<div class="container-fluid">
								<div class="form-group row">
									<div class="col-md-6">
										<label for="date_calc_from1">Start date <span class="datepicker-format">(<abbr title="Four digits year, dash, two digits month, dash, two digits day">YYYY-MM-DD</abbr>)</span></label>
										<input class="form-control" type="date" id="date_calc_from1" name="date_calc_from" min="1900-01-01" max="2050-01-01" required/>
									</div>
								</div>
								<div class="form-group row">
									<div class="col-md-12">
										<label for="date_calc_elapsed">Elapsed time</label>
										<div class="input-group">
											<input type="number" id="date_calc_elapsed" class="form-control num" min="1" max="3653" maxlength="4" required>
											<span class="input-group-btn">
												<select id="date_calc_unit" class="btn btn-default brdr-rds-0" title="Temporal unit" required>
													<option value="days" selected>days</option>
													<option value="work">business days</option>
													<option value="weeks">weeks</option>
													<option value="months">months</option>
													<option value="years">years</option>
												</select>
											</span>
											<span class="input-group-btn">
												<select id="date_calc_dir" class="btn btn-default" title="Temporal direction" required>
													<option value="true" selected>in the future</option>
													<option value="false">in the past</option>
												</select>
											</span>
										</div>
									</div>
								</div>
								<div id="date_calc_opt1_result" class="row hidden">
									<div class="col-md-12">
										<h4>Result</h4>
										<p></p>
									</div>
								</div>
								<div class="mrgn-tp-lg mrgn-bttm-md">
									<button type="submit" class="btn btn-primary mrgn-rght-sm">Calculate</button>
									<button type="reset" class="btn btn-default">Clear</button>
								</div>
							</div>
							</form>
						</details>
						<details id="date_calc_opt2">
							<summary>Elapsed time between two dates</summary>
							<form>
							<div class="container-fluid">
								<div class="form-group row">
									<div class="col-md-6">
										<label for="date_calc_from2">Start date <span class="datepicker-format">(<abbr title="Four digits year, dash, two digits month, dash, two digits day">YYYY-MM-DD</abbr>)</span></label>
										<input class="form-control" type="date" id="date_calc_from2" name="date_calc_from" min="1900-01-01" max="2050-01-01" required>
									</div>
									<div class="col-md-6">
										<label for="date_calc_to2">End date <span class="datepicker-format">(<abbr title="Four digits year, dash, two digits month, dash, two digits day">YYYY-MM-DD</abbr>)</span></label>
										<input class="form-control" type="date" id="date_calc_to2" name="date_calc_to" min="1900-01-01" max="2050-01-01" required>
									</div>
								</div>
								<div id="date_calc_opt2_result" class="row mrgn-bttm-lg hidden">
									<div class="col-md-12">
										<h4>Time elapsed</h4>
										<p></p>
									</div>
								</div>
								<div class="mrgn-tp-lg mrgn-bttm-md">
										<button type="submit" class="btn btn-primary mrgn-rght-sm">Calculate</button>
										<button type="reset" class="btn btn-default">Clear</button>
								</div>
							</div>
							</form>
						</details>
					</div>
				</div>
			</div>
		</section>
	</template>
	<template data-type="date-calc" lang="fr">
		<section id="modal_date_calc" class="mfp-hide modal-dialog modal-content overlay-def no-print" aria-live="assertive" aria-modal="true">
			<header class="modal-header">
				<h2 class="modal-title">Calculateur de dates</h1>
			</header>
			<div class="modal-body">
				<div class="wb-tabs ignore-session">
					<div class="tabpanels">
						<details id="date_calc_opt1" open="open">
							<summary>Date aprÃ¨s un laps de temps</summary>
							<form>
							<div class="container-fluid">
								<div class="form-group row">
									<div class="col-md-6">
										<label for="date_calc_from1">Date de dÃ©but <span class="datepicker-format">(<abbr title="AnnÃ©e Ã  quatre chiffres, tiret, mois Ã  deux chiffres, tiret, jour Ã  deux chiffres">AAAA-MM-JJ</abbr>)</span></label>
										<input class="form-control" type="date" id="date_calc_from1" name="date_calc_from" min="2000-01-01" max="2030-01-01" required/>
									</div>
								</div>
								<div class="form-group row">
									<div class="col-md-12">
										<label for="date_calc_elapsed">Temps Ã©coulÃ©</label>
										<div class="input-group">
											<input type="number" id="date_calc_elapsed" class="form-control num" min="1" max="3653" maxlength="4" required>
											<span class="input-group-btn">
												<select id="date_calc_unit" class="btn btn-default brdr-rds-0" title="UnitÃ© temporelle" required>
													<option value="days" selected>jours</option>
													<option value="work">jours ouvrables</option>
													<option value="weeks">semaines</option>
													<option value="months">mois</option>
													<option value="years">ans</option>
												</select>
											</span>
											<span class="input-group-btn">
												<select id="date_calc_dir" class="btn btn-default" title="Direction temporelle" required>
													<option value="true" selected>dans le futur</option>
													<option value="false">dans le passÃ©</option>
												</select>
											</span>
										</div>
									</div>
								</div>
								<div id="date_calc_opt1_result" class="row hidden">
									<div class="col-md-12">
										<h4>RÃ©sultat</h4>
										<p></p>
									</div>
								</div>
								<div class="mrgn-tp-lg mrgn-bttm-md">
									<button type="submit" class="btn btn-primary mrgn-rght-sm">Calculer</button>
									<button type="reset" class="btn btn-default">Effacer</button>
								</div>
							</div>
							</form>
						</details>
						<details id="date_calc_opt2">
							<summary>Temps Ã©coulÃ© entre deux dates</summary>
							<form>
							<div class="container-fluid">
								<div class="form-group row">
									<div class="col-md-6">
										<label for="date_calc_from2">Date de dÃ©but <span class="datepicker-format">(<abbr title="AnnÃ©e Ã  quatre chiffres, tiret, mois Ã  deux chiffres, tiret, jour Ã  deux chiffres">AAAA-MM-JJ</abbr>)</span></label>
										<input class="form-control" type="date" id="date_calc_from2" name="date_calc_from" min="2000-01-01" max="2030-01-01" required>
									</div>
									<div class="col-md-6">
										<label for="date_calc_to2">Date de fin <span class="datepicker-format">(<abbr title="AnnÃ©e Ã  quatre chiffres, tiret, mois Ã  deux chiffres, tiret, jour Ã  deux chiffres">AAAA-MM-JJ</abbr>)</span></label>
										<input class="form-control" type="date" id="date_calc_to2" name="date_calc_to" min="2000-01-01" max="2030-01-01" required>
									</div>
								</div>
								<div id="date_calc_opt2_result" class="row mrgn-bttm-lg hidden">
									<div class="col-md-12">
										<h4>Temps Ã©coulÃ©</h4>
										<p></p>
									</div>
								</div>
								<div class="mrgn-tp-lg mrgn-bttm-md">
									<button type="submit" class="btn btn-primary mrgn-rght-sm">Calculer</button>
									<button type="reset" class="btn btn-default">Effacer</button>
								</div>
							</div>
							</form>
						</details>
					</div>
				</div>
			</div>
		</section>
	</template>`);
});

$(document).on('wb-ready.wb', function() {
	// template is a shadow root and needs to be treated special
	// @todo If we have jQuery 3.2+, we can use .contents() instead and simplify this
	var templ = $('template[data-type="date-calc"]:lang(' + wb.lang + ')')[0].content;
	// the overlay should have an id specified; we need it
	var modal = $(templ).children('section[id].modal-dialog');

	// take the modal and toss it in to the regular DOM
	$('main').append(modal);
	$(wb.allSelectors, modal).trigger('timerpoke.wb');

	console.info('init: date-calc')

	// function for comparing dates
	// this function modifies the from (and possibly to) date object(s)
	function dateDiff(from, to, method) {
		var ret = -1;

		if (from > to) {
			[from, to] = [to, from];
		}

		while (from <= to) {
			ret++;
			from['set' + method](from['get' + method]() + 1);
		}

		from['set' + method](from['get' + method]() - 1);

		return ret;
	}

	// reset the inputs
	modal.on('reset', function(e) {
		$('input,select', e.target).trigger('change');
		$('#date_calc_opt1_result,#date_calc_opt2_result').toggleClass('show hidden').hide();
		$('#date_calc_opt1_result p,#date_calc_opt2_result p').empty();
	});

	// track loading of the Moment library
	var momentLoaded = false;

	modal.on('submit', function(e) {
		e.preventDefault();

		var type = $('a[tabindex=0]', modal).attr("aria-controls");
		var result = $('#' + type + "_result");
		var format_opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

		if (type == 'date_calc_opt1') {
			var from = new Date($('input[name="date_calc_from"]', e.target).val()+'T00:00:00');
			var to = from;
			var elapsed = parseInt($('#date_calc_elapsed', e.target).val());

			if (!isNaN(from) && !isNaN(elapsed)) {
				var unit = $('#date_calc_unit', e.target).val();
				var dir = $('#date_calc_dir', e.target).val();
				var queue; // deferred queue; req'd for moment.js dynamic loading

				if (dir == 'false') {
					elapsed *= -1; // flip it negative
				}

				switch (unit) {
					case 'days':
						to.setDate(from.getDate() + elapsed);
						break;
					case 'weeks':
						to.setDate(from.getDate() + (elapsed * 7));
						break;
					case 'months':
						to.setMonth(from.getMonth() + elapsed);
						break;
					case 'years':
						to.setFullYear(from.getFullYear() + elapsed);
						break;
					case 'work': {
						if (!momentLoaded) {
							queue = $.when($.ajax({'type':"GET",'cache':true,'dataType':"script",'url':'/english/r5011204/include/jQuery/jquery.moment.js'})).then(function() {
								momentLoaded = true;
								console.log("init-text moment.js");
							});
						}

						$.when(queue).then(function() {
							to = moment(from.valueOf()).businessAdd(elapsed).toDate();
						});
					}
				}

				$.when(queue).then(function() {
					$('p', result).html(to.toLocaleDateString(wb.lang == 'fr' ? 'fr-CA' : 'en-CA',  format_opts));

					if (unit == "work") $('p', result).append(wb.lang == 'fr' ? '<br><div class="alert alert-info"><p>Veuillez noter que le calcul des jours ouvrables ne tient compte que des jours fÃ©riÃ©s fÃ©dÃ©raux.</p></div>' : '<br><div class="alert alert-info"><p>Please note calculation of business days only takes into account federal holidays.</p></div>');
				});
			}
		} else if (type == 'date_calc_opt2') {
			var from = new Date($('input[name="date_calc_from"]', e.target).val()+'T00:00:00');
			var to = new Date($('input[name="date_calc_to"]', e.target).val()+'T00:00:00');

			if (!isNaN(from) && !isNaN(to)) {
				var diff = {
					total: {
						days: dateDiff(new Date(from.getTime()), new Date(to.getTime()), 'Date'), // needs to work for leap years
						weeks: Math.abs(~~((to - from) / 604800000)) // i think this is leap year safe?
					},
					years: dateDiff(from, to, 'FullYear'),
					months: dateDiff(from, to, 'Month'),
					days: dateDiff(from, to, 'Date'),
				};

				if (wb.lang == 'fr') {
					$('p', result).html(diff.total.days + ' jours (' + diff.total.weeks + ' semaines), ou ' + (diff.years ? diff.years + ' annÃ©es, ' : '') + (diff.months ? diff.months + ' mois, ' : (diff.years ? '0 mois, ' : '')) + (diff.days ? diff.days + ' journÃ©es' : '0 journÃ©es'));
				}
				else {
					$('p', result).html(diff.total.days + ' days (' + diff.total.weeks + ' weeks), or ' + (diff.years ? diff.years + ' years, ' : '') + (diff.months ? diff.months + ' months, ' : (diff.years ? '0 mois, ' : '')) + (diff.days ? diff.days + ' days' : '0 days'));
				}
			}
		}

		result.toggleClass('show hidden').show().slideDown('fast');
	});
});
