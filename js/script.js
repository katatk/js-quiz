// smooth scroll
var backTop = document.getElementById("scroll-top");

// browser window scroll (in pixels) after which the "back to top" link is shown
var offset = 100;

// duration of the top scrolling animation (in ms)
var scroll_top_duration = 700;


function toggleScrollTop() {
    if (this.pageYOffset > offset) {
        backTop.classList.add("visible");
    }

    if (this.pageYOffset < offset) {
        backTop.classList.remove("visible");
    }
}

function smoothScroll() {
   window.scroll({ top: 0, left: 0, behavior: 'smooth' });
}

// hide or show the back to top link
window.addEventListener("scroll", toggleScrollTop);

// smooth scroll when back to top link clicked
backTop.addEventListener("click", smoothScroll);

// attributions popup
/* $attr_link = $('.attr-link');
    $popup = $('.attributions');
    $close = $('.icon-cross');

    // open popup when user clicks link
    $attr_link.on('click', function (event) {
        event.preventDefault();
        $popup.show();
    });

    // close popup when user clicks cross
    $close.on('click', function (event) {
        event.preventDefault();
        $popup.hide();
    });

    // close popup when user clicks outside of popup area
    $popup.focusout(function () {
        $(this).hide();
    });
*/
