function stickyNav() {

  var mn = $('#mainNav');
  // bootstrap's fixed top class
  fixed = 'fixed-top';
  // get scroll height to call sticky function
  mastheadHeight = $('.masthead').height();

  // add fixed class on scroll at larger screen sizes
  if ($(window).outerWidth() >= 992) {
    // change background color to white
    mn.css('background-color', 'white');
    // if scrolled to the top of the menu (bottom of masthead)
    if ($(this).scrollTop() > mastheadHeight) {

      // if position is not fixed already, change position property
      mn.css({
        'position': 'fixed',
        'top': 0
      }).addClass(fixed).addClass('shrink');

    } else {
      mn.css({
        'position': 'absolute',
        'top': mastheadHeight
      }).removeClass(fixed).removeClass('shrink');
    }
  }


  // else add a fixed class for mobile
  else if ($(window).outerWidth() <= 992) {
    // make header white when scroll past masthead
    if ($(this).scrollTop() > (mastheadHeight - 200)) {
      mn.css('background-color', 'white');
      mn.addClass('dropshadow');
    } else {
      mn.css('background-color', 'transparent');
      mn.removeClass('dropshadow');
    }

    if (mn.css('position') != 'fixed') {
      mn.css({
        'position': 'fixed',
        'top': 0
      }).addClass(fixed);
    }

  }
}

$(document).ready(function() {

  // call when page loads
  stickyNav();

  // call on resize
  $(window).resize(function() {
    stickyNav();
  });

  // call on scroll
  $(window).scroll(function() {
    stickyNav();
  })

});