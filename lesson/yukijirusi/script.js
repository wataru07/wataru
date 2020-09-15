$(function(){
	var text_width = $('section#mo > div').width();
	var text_width_half = text_width / 2;
	var cnt = 0;

	$('section#mo > img').each(function(i,e){
		if(cnt==0){
			$(this).css('transform','translateX('+ text_width_half +'px)');
		}else{
			$(this).css('transform','translateX('+ (-1) * text_width_half + 'px');

		}
		cnt++;
	});


	setTimeout(function(){
		$('section#mo > img').each(function(i,e){
			$(this).css({
				'transform' : 'translateX('+ 0 +'px)',
				'opacity'   :'1',
			});
		});
	}, 3000)

	$('section#mo > div > img').each(function(i,e){
		$(this).css({
			'transform' : 'translateY(0px)',
			'opacity'   : '1',
		});
	});



	$('section#top > div.mid > div.l > img').each(function(i,e){
		$(this).css({
			'transform' : 'translateY(0px)',
			'opacity'   : '1',
		});
	});

		$('section#top > div.mid > div.r > div.rig > img').each(function(i,e){
		$(this).css({
			'transform' : 'translateY(0px)',
			'opacity'   : '1',
		});
	});

	
});


$(function(){
	$('section#top > div.mid > div.r > img').each(function(i,e){
		$(this).css({
			'transform' : 'translateY(0px)',
			'opacity'   : '1',
		});
	});


	$('section#top > div.mid > div.l > div.lef > img').each(function(i,e){
		$(this).css({
			'transform' : 'translateY(0px)',
			'opacity'   : '1',
		});
	});





});
