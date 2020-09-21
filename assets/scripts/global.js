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
            $('#menu_Opener i').html('&#xf0c9;');
			setTimeout(() => {
                $nav.removeClass('open');
				$('body').css('overflow', 'unset');
			}, 400);
		} else {
            $('#menu_Opener i').html('&#xe813;');
			$('body').css('overflow', 'hidden');
			$nav.addClass('open');
			$nav.show('slide', { direction: 'left' });
		}
	});
});
