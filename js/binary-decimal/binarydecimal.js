binarydecimal = function() {
	$('#d2b').click(function() {
		$("#unsigned").attr("disabled", true);
	})
	$('#b2d').click(function() {
		$("#unsigned").attr("disabled", false);
	})

	$('#submit').on('click', function() {
		num = $('#number').val()
		if (!num) {
			return
		}
		unsigned = $('#unsigned').prop('checked')
		type = $('input[name=conversion]:checked').val()


		var result;
		if (type=='b2d') {
			if ( !unsigned && num[0] == '1' ){
			var bin = num.replace(/1/g, 'X').replace(/0/g, '1').replace(/X/g, '0')
			console.log(bin)
			result = (parseInt(bin, 2) + 1) * -1
			}
			else {
			  result = parseInt(num, 2)  
			}
		}
		else {
			if ( num >= 0 || num < -128) {
				r = Number(num).toString(2)
				result = '00000000' + r
				result = result.substr(result.length - Math.max(r.length, 8))
			}
			else {
				num *= -1
				num -= 1
				r = Number(num).toString(2)
				result = '00000000' + r
				result = result.substr(result.length - Math.max(r.length, 8))
				result = result.replace(/1/g, 'X').replace(/0/g, '1').replace(/X/g, '0') + " (two's complement)"
			}
			result = "Binary: " + result
		}

		$('#answer').text(result)
	})
}

$(document).ready(binarydecimal)