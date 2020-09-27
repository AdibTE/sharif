$(function() {
	// sidebar submenu click handler
	$('.sidebar-links .has-sub').on('click', (e) => {
		let $parent = $(e.target).closest('li');
		if ($parent.hasClass('clicked')) {
			$parent.removeClass('clicked');
			$parent.find('.sub-links-wrapper').slideUp();
		} else {
			$('.sidebar-links li .sub-links-wrapper').slideUp();
			$('.sidebar-links li').removeClass('clicked');
			$parent.addClass('clicked');
			$parent.find('.sub-links-wrapper').slideDown();
		}
	});

	let $aside = $('.main-content > aside');
	let $nav = $('header .navbar-container nav');

	// mobile sidebar handler
	$('#sidebar_Opener').on('click', () => {
		$nav.hasClass('open') && $('#menu_Opener').click(); // close navbar if sidebar clicked
		if ($aside.hasClass('open')) {
			$aside.hide('slide', { direction: 'up' });
			setTimeout(() => {
				$aside.removeClass('open');
				$('body').css('overflow', 'unset');
			}, 400);
		} else {
			$('body').css('overflow', 'hidden');
			$aside.addClass('open');
			$aside.show('slide', { direction: 'up' });
		}
	});

	// mobile menu handler
	$('#menu_Opener').on('click', (e) => {
		$aside.hasClass('open') && $('#sidebar_Opener').click(); // close sidebar if navbar clicked
		if ($nav.hasClass('open')) {
			$nav.hide('slide', { direction: 'left' });
			$('#menu_Opener i').removeClass().addClass('font-icon icon-menu-1');
			setTimeout(() => {
				$nav.removeClass('open');
				$('body').css('overflow', 'unset');
			}, 400);
		} else {
			$('#menu_Opener i').removeClass().addClass('font-icon icon-cancel');
			$('body').css('overflow', 'hidden');
			$nav.addClass('open');
			$nav.show('slide', { direction: 'left' });
		}
	});

	// table filters more handler
	$('.panel-body .table-filters .form-element').hide();
	$('.panel-body .table-filters .form-element').eq(0).show();
	$('.panel-body .table-filters .form-element').length <= 1 && $('[data-role="more-filters"]').hide();
	$('[data-role="more-filters"]').on('click', () => {
		$('.panel-body .table-filters .form-element').show('fade');
		$('.panel-body .table-filters .form-element').addClass('col');
		$('[data-role="more-filters"]').hide();
	});

	// tooltip handler
	$('[data-tooltip]').each((i, e) => {
		title = $(e).attr('data-tooltip');
		let tooltip = document.createElement('span');
		tooltip.innerText = title;
		tooltip.classList.add('tooltip');
		$(e).append(tooltip);
	});

	// ripple effect
	$('[data-ripple]').each(function(index, item) {
		$(item).addClass('ripple-container');
		$(item).append($(`<div class="ripple"></div>`));
	});
	$('[data-ripple]').on('click', function(e) {
		const ripple = $(e.target).children('.ripple').prevObject;
		const offset = $(e.target).offset();
		createRipple(e.pageY - offset.top, e.pageX - offset.left, ripple);
	});
	function createRipple(y, x, ripple) {
		const rippleCircle = `<div class="ripple-circle" style="top:${y}px;left:${x}px;"></div>`;
		const _rippleCircle = $(rippleCircle);
		ripple.append(_rippleCircle);
		setTimeout(function() {
			$('.ripple-circle:first-child').remove();
		}, 900);
	}

	// Select2 initialization
	$('.select2-basic').select2({
		dir: 'rtl',
		dropdownPosition: 'below',
		placeholder: 'انتخاب کنید...',
		allowClear: true
	});
});

$(function () {
/* _-_-_-_-_-_-_-_-_-_-_-_-_-_
	 PersianDate calender scripts  */
	 
	var to, from;
	from = $('#FromDate').persianDatepicker({
		initialValue: false,
		altField: '[name="FromDate"]',
		toolbox: {
			calendarSwitch: {
				enabled: true
			}
		},
		navigator: {
			scroll: {
				enabled: false
			}
		},
		//maxDate: new persianDate().add('month', 3).valueOf(),
		minDate: new persianDate(),
		timePicker: {
			enabled: true,
			meridiem: {
				enabled: true
			}
		},
		onSelect: function (unix) {
			var cachedValue = from.getState().selected.unixDate;
			PersianDateToInputDate(cachedValue, `[name="FromDate"]`);
		}
	});
	to = $('#TillDate').persianDatepicker({
		altField: '[name="TillDate"]',
		initialValue: false,
		toolbox: {
			calendarSwitch: {
				enabled: true
			}
		},
		navigator: {
			scroll: {
				enabled: false
			}
		},
		//maxDate: new persianDate().add('month', 3).valueOf(),
		minDate: new persianDate(),
		timePicker: {
			enabled: true,
			meridiem: {
				enabled: true
			}
		},
		onSelect: function (unix) {
			var cachedValue = to.getState().selected.unixDate;
			PersianDateToInputDate(cachedValue, `[name="TillDate"]`);
		}
	});

	// sync width of the calender container with input width
	$('.datepicker-plot-area').css('width',`${parseFloat($('#FromDate').css('width'))}px`)

	// onload set data
	// let LoadedFromDate = '@Model.FromDate' != "" && '@Model.FromDate';
	// let LoadedTillDate = '@Model.TillDate' != "" && '@Model.TillDate';
	let LoadedFromDate = "";
	let LoadedTillDate = "";
	if (LoadedFromDate) {
		from.setDate(new Date(LoadedFromDate).getTime());
		PersianDateToInputDate(LoadedFromDate, `[name="FromDate"]`);
	}
	if (LoadedTillDate) {
		to.setDate(new Date(LoadedTillDate).getTime());
		PersianDateToInputDate(LoadedTillDate, `[name="TillDate"]`);
	}

});

// function for parsing date for .net core
let PersianDateToInputDate = function (date, element) {
	var date = new Date(date);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var Seconds = date.getSeconds();
	if (month < 10) {
		month = '0' + month;
	}
	if (day < 10) {
		day = '0' + day;
	}

	$(element).val(year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + Seconds);
}