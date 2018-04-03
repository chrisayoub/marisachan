// https://github.com/alvarotrigo/fullPage.js#callbacks
$(document).ready(function() {
    $('#fullpage').fullpage({
        onLeave: function(index, nextIndex, direction) {
            if (window.innerWidth > 1023) {
                animateSlide(index, nextIndex);
            } else {
                /* Mobile */
                animateImagesMobile(nextIndex);
            }
        },
        navigation: true,
        responsiveWidth: 1024
    });

    // Arrow click, move down a section
    document.getElementById('arrow').onclick = function(){
        $.fn.fullpage.moveSectionDown();
    };
});

// Offset from first slide, used for animations
let OFFSET = 2;

// MARK: Mobile animation

function animateImagesMobile(nextIndex) {
    // Arriving at the section, slide in
    var parent = document.getElementsByClassName("imageMobile")[nextIndex - OFFSET];
    if (parent != null) {
        var img = parent.getElementsByTagName("img")[0];
        if (img != null) {
            img.style.visibility = "visible"; 
            parent.classList.add("fadeInUp");
            parent.classList.add("animated");
        }
    }
}

// MARK: Desktop animation

function animateSlide(index, nextIndex) {
    // Leaving the section, slide out
    var parent = document.getElementsByClassName("parentBox")[index - OFFSET];
    if (parent != null) {
        var children = parent.children;

        // Slide out left
        var slideOutLeft = children[0];
        slideOutLeft.classList.remove('slide-in-left');
        slideOutLeft.classList.add('slide-out-left');

        // Slide out right
        var slideOutRight = children[1];
        slideOutRight.classList.remove('slide-in-right');
        slideOutRight.classList.add('slide-out-right');
    }

    // Arriving at the section, slide in
    parent = document.getElementsByClassName("parentBox")[nextIndex - OFFSET];
    if (parent != null) {
        var children = parent.children;

        // Slide in left
        var slideInLeft = children[0];
        slideInLeft.classList.remove('slide-out-left');
        slideInLeft.classList.add('slide-in-left');
        
        // Slide in right
        var slideInRight = children[1];
        slideInRight.classList.remove('slide-out-right');
        slideInRight.classList.add('slide-in-right');
    }
}

// MARK: Menu scrolling

// Disable scrolling once menu is opened
var menuOpen = false;

function menuClicked() {
    menuOpen = !menuOpen;
    if (menuOpen) {
        disableMobileScrolling();
        $.fn.fullpage.setAllowScrolling(false);
    } else {
        enableMobileScrolling();
        $.fn.fullpage.setAllowScrolling(true);
    }
}

// For opening the menu on mobile
function disableMobileScrolling() {
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function(){ window.scrollTo(x, y); };
}

function enableMobileScrolling() {
    window.onscroll = function(){};
}
