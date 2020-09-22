(function($) {
  $(document).ready(function() {
    $('.slider').slick({
      prevArrow: '<a class="slick-prev">prev</a>',
      nextArrow: '<a class="slick-next">next</a>',
    });
    $('.carousel').slick({
      arrows: false,
      centerMode: true,
      variableWidth: true,
      centerPadding: '40px',
      dots: true,
      customPaging: function(slider, i) {
        return $('<a href="#" class="dots-' + (i+1) + '" onclick="return false;" />');
      },
      responsive: [{
        breakpoint: 640,
        settings: {
          variableWidth: false,
        }
      }]
    });
  });

  $(window).on('load resize', function() {
    var header   = $('.header .nav-container'); // fixed DOM
    var addclass = 'scrolled'; // add css class
    var offset   = header.offset();
    var scrollY  = offset.top; // scroll

    $(window).scroll(function() {
      if ($(window).scrollTop() > scrollY) {
          header.addClass(addclass);
      } else {
          header.removeClass(addclass);
      }
    });
  });
})(jQuery);
