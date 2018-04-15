// add slide class to mobile 
function addSlideClass(){
/*var carouselElements = $('.carousel');
    if ($(window).outerWidth() < 992) {
        
        $.each(carouselElements, function(index, element) {
            $(element).addClass("slide");
        });
    } else {
         $.each(carouselElements, function(index, element) {
            $(element).removeClass("slide");
        });
    }*/
 
   /* $(".carousel").swipe({

  swipe: function(event, direction, distance, duration, fingerCount, fingerData) {

    if (direction == 'left') $(this).carousel('next');
    if (direction == 'right') $(this).carousel('prev');

  },
  allowPageScroll:"vertical"

});*/
    
}


$(document).ready(function () {
    
     addSlideClass();
    
    $('.carousel').carousel({
        pause: true,
        interval: false
    });
    
    $(window).resize(function () {
    addSlideClass();
});

});

