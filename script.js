// smooth scroll
var backTop = document.getElementById("scroll-top");

// browser window scroll (in pixels) after which the "back to top" link is shown
var offset = 100;

// duration of the top scrolling animation (in ms)
var scroll_top_duration = 700;


function toggleScrollTop() {
     console.log("scrolling");
    if (this.pageYOffset > offset) {
        backTop.classList.add("visible");
    }
    
    if (this.pageYOffset < offset) {
        backTop.classList.remove("visible");
    }
}

// hide or show the "back to top" link
window.addEventListener("scroll", toggleScrollTop);


// rainbow links

var colors = ["papayawhip", "peachpuff", "mistyrose", "lavender", "lightcyan", "#bbfad8"];

var underlineClass = ".underline:after {border-color:" + colors[x] + "}";

var underline = document.getElementsByClassName("underline");

for(var i=0; i<underline.length; i++) {
    underline[i].classList.add = underlineClass;
    
}

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
