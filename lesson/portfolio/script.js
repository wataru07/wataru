$(function(){
	$(window).on('scroll',function(){
		var pos = $(this).scrollTop();
		var btm = pos + $(this).height() * 6 / 10;
		// console.log(pos);
		// $('section#contact > div > h2').each(function(i,e){
		// (btm < $(this).offset().top) ? $(this).removeClass('active') : $(this).addClass('active');
					// console.log($(this).offset().top);
			// (btm < $(this).offset().top) ? $(this).removeClass('active') : $(this).addClass('active');
			// });
			$('#contact').each(function(i,e){
			(btm < $(this).offset().top) ? $(this).removeClass('active') : $(this).addClass('active');
			});

		// $('section#contact > div > h2').each(function(i,e){
		// 	(btm < $(this).offset().top) ? $(this).removeClass('active') : $(this).addClass('active');
		// 	});
			
			$('#works').each(function(i,e){
			(btm < $(this).offset().top) ? $(this).removeClass('active') : $(this).addClass('active');
			});


		});
	});