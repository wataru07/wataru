$(function(){
	// Scroll Event
	$(window).on('scroll',function(){
		var pos = $(this).scrollTop();
		var btm = pos + $(this).height() * 6 / 10;

		$('#contact').each(function(i,e){
		(btm < $(this).offset().top) ? $(this).removeClass('active') : $(this).addClass('active');
		});
		
		$('#works').each(function(i,e){
		(btm < $(this).offset().top) ? $(this).removeClass('active') : $(this).addClass('active');
		});
	});

	// Validation Event
	$('input,textarea').on('blur', function(){
		var name = $(this).attr('name');
		var val = $(this).val();
		console.log(val);
		if (!nullCheck(val)) {
			$('#' +name+' + p').text('入力必須項目です。');
			return false;
		}else{
			$('#' +name+' + p').text('');

		}

		if (name=='name') {

		}else if (name=='email') {
			// if(emailCheck(val)==null){
			// 	$('#' +name+' + p').text('入力アドレスの入力形式が異なります');
			// }else{
			// 	$('#' +name+' + p').text('');
			// }
			(emailCheck(val)==null) ? $('#' +name+' + p').text('入力アドレスの入力形式が異なります') : $('#' +name+' + p').text('');
		}else{
		}

	});
	function emailCheck(str){
		console.log(str);
		return str.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/);
	}
	function nullCheck(str){
		if(str==null || str=='' || str==undefined) return false;
		return true;
	}


});