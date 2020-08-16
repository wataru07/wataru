$(function(){
	comm.init();
	$('#slider').slick({
		autoplay:true,
		autoplaySpeed:5000,
		dots:true,
	});
});
var comm = {
	y:0,
	circles:[],
	area:{height:0,width:0},
	init:function(){
		this.initFaqAnswer();
		this.initCicles();
		this.addEvent();
	},
	addEvent:function(){
		this.aLink();
		this.menuBtn();
		this.sizeUpImg();
	},
	menuBtn:function(){
		$('#menu_btn').on('click',function(){
			$('header').hasClass('opened') ? $('header').removeClass('opened') : $('header').addClass('opened');
		});
	},
	aLink:function(){
		$('a[href^="#"]').on('click',function(){
			let target = $(this).attr('href');
			let $_this = $(this);
			if(target=='#btn') return false;
			if(target.match(/^#q+/)){
				comm.faqToggle(target, $_this);
			}else{
				$("html,body").animate({scrollTop:$(target).offset().top}, {duration: 500, easing: 'swing',});
				if($('header').hasClass('opened')) $('header').removeClass('opened');
			}
			return false;
		})
	},
	sizeUpImg:function(){
			$(window).on('scroll', function(){
				comm.y = $(this).scrollTop();
				comm.divImg();
				(comm.y + $(window).height() > $('footer').offset().top) ? $('#appLink').addClass('reached') : $('#appLink').removeClass('reached');
			});
	},
	divImg:function(){
		$('section#what > ul > li').each(function(i,e){
			let top = $(this).offset().top;
			let offset = $(window).height() * 2 / 3;
			(top < comm.y + offset) ? $(this).addClass('active') : $(this).removeClass('active');
		});
		$('section#how > div > div > img').each(function(i,e){
			let top = $(this).offset().top;
			let offset = $(window).height() * 2 / 3 + 500;
			(top < comm.y + offset) ? $(this).addClass('active') : $(this).removeClass('active');
		});
		$('section#what > h3').each(function(i,e){
			let top = $(this).offset().top;
			let offset = $(window).height() * 2 / 3;
			(top < comm.y + offset) ? $(this).addClass('active') : $(this).removeClass('active');
		});
		$('section#how span').each(function(i,e){
			let top = $(this).offset().top;
			let offset = $(window).height() * 3 / 4;
			(top < comm.y + offset) ? $(this).addClass('active') : $(this).removeClass('active');
		});
		$('.wayImage').each(function(i,e){
			let top = $(this).offset().top;
			let offset = $(window).height() * 3 / 5;
			(top < comm.y + offset) ? $(this).addClass('active') : $(this).removeClass('active');
		})
	},
	faqToggle:function(target, $_this){
		$_this.hasClass('open') ? $_this.removeClass('open') : $_this.addClass('open');
		$(target).slideToggle();
		return;
	},
	initFaqAnswer:function(){
		$('section#faq > div > div > p').each(function(i,e){
			$(this).css({display:'none'});
		});
	},
	initCicles:function(){
		comm.area.width = $(window).outerWidth();
		comm.area.height = $('#faq').outerHeight();
		$('.circle').each(function(i,e){
			var size = comm.randomNumber(200,50);
			var posx = comm.randomNumber(comm.area.width - size, 0);
			var posy = comm.randomNumber(0, comm.area.height - size);
			var opacity = comm.randomNumber(0.75,0.05);
			var vector = comm.randomNumber(0.1, 1.3);
			var deg = comm.randomNumber(1, 89);
			var arr = {height:size, width:size, top:posy, left:posx, opacity:opacity, vecX:comm.resolutionVectorX(vector,deg),vecY:comm.resolutionVectorY(vector,deg),};
			$(this).css(arr);
			comm.circles.push(arr);
		});
		this.circleMoveTik();
	},
	randomNumber:function(max,min){
		return Math.random() * (max - min) + min;
	},
	circleMoveTik:function(){
		var move = setInterval(comm.circleMove, 1);
	},
	circleMove:function(){
		$('.circle').each(function(i,e){
			var index = i;
			var opt = comm.circles[index];
			var obj = $(this);
			if(opt.top < 0 || opt.top + comm.circles[index].height > comm.area.height) comm.circles[index].vecY = -1 * comm.circles[index].vecY;
			if(opt.left < 0 || opt.left + comm.circles[index].width > comm.area.width) comm.circles[index].vecX = -1 * comm.circles[index].vecX;
			comm.circles[index].top = comm.circles[index].top + comm.circles[index].vecY;
			comm.circles[index].left = comm.circles[index].left + comm.circles[index].vecX;
			obj.css(comm.circles[index]);
		});
	},
	resolutionVectorX:function(vector, degree){
		return Math.cos(degree / Math.PI) * vector;
	},
	resolutionVectorY:function(vector, degree){
		return Math.sin(degree / Math.PI) * vector;
	},

}