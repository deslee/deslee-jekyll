var toggleFooter = function(e) {
	$('#main-footer').slideToggle();
	$('#extra-footer').slideToggle();
}
$('.footer').click(function(e) {
	var good = 
		e.target == $('#main-footer')[0] ||
		e.target == $('#extra-footer')[0]

	if (good) {
		toggleFooter(e)
	}

})