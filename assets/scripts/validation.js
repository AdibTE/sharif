$(function() {
	let $form = $('form[validate-form]');
	let $submitBtn = $form.find('button[type=submit]');
	let $selects = $form.find('select[required]');
	let $limitedcheckBoxes = $form.find('[min-items-required],[max-items-required]');
	let $all = $form.find(
		`textarea[required] , select[required] , input:text[required] ,
		[min-items-required] input , [max-items-required] input ,
		input:checkbox[required] , input:radio[required]`
	);
	let $inputs = $form.find('input:text[required]');
	let $textareas = $form.find('textarea[required]');
	let $radios = $form.find('input:radio[required]');

	$submitBtn.on('click', function(e) {
		e.preventDefault();

		selectValidator($selects);
		checkBoxValidator($limitedcheckBoxes);

		let isValid = true;
		$all.each((i, e) => {
			isValid = validationHelper(e) ? false : true;
		});

		if (isValid) {
			$submitBtn.unbind('click').click();
		}
	});

	$all.on('change input blur', (e) => {
		selectValidator($(e.target));
		checkBoxValidator($limitedcheckBoxes);
		validationHelper(e.target);
	});
});

let validationHelper = function(element) {
	if (!element.checkValidity()) {
		$(element).closest('.form-element').find('.required-sign').removeClass().addClass('required-sign font-icon icon-cancel'); 
		$(element).closest('.form-element').removeClass('invlid valid').addClass('invalid');
		console.log('invalid element=>', element);
		return false;
	} else {
		$(element).closest('.form-element').find('.required-sign').removeClass().addClass('required-sign font-icon icon-ok');
		$(element).closest('.form-element').removeClass('invalid valid').addClass('valid');
	}
};

let selectValidator = function(elements) {
	elements.each((i, e) => {
		if (!e.value) {
			e.setCustomValidity('لطفا یک مورد انتخاب کنید');
		} else {
			e.setCustomValidity('');
		}
	});
};

let checkBoxValidator = function(elements) {
	elements.each((i, element) => {
		let min = $(element).attr('min-items-required')
			? $(element).attr('min-items-required')
			: 0;
		let max = $(element).attr('max-items-required')
			? $(element).attr('max-items-required')
			: Infinity;

		let inputs = $(element).find('input');
		let checkedItems = 0;
		inputs.each((i, e) => {
			if (e.checked) {
				checkedItems++;
			}
		});
		if (checkedItems >= Number(min) && checkedItems <= Number(max)) {
			inputs.each((i, e) => {
				e.setCustomValidity('');
			});
		} else {
			inputs.each((i, e) => {
				e.setCustomValidity('تعداد آیتم های انتخاب شده مجاز نیست');
			});
		}
	});
};