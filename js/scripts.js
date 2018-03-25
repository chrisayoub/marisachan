// https://github.com/alvarotrigo/fullPage.js#callbacks
$(document).ready(function() {
    $('#fullpage').fullpage({
        onLeave: function(index, nextIndex, direction) {
            if (window.innerWidth > 1023) {
                animateSlide(index, nextIndex);
            } else {
                /* Mobile */
                animateImagesMobile(index, nextIndex);
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

var slidingSections = [2, 3, 4, 5, 6]; // PUT ALL SECTIONS WITH SLIDES HERE


// MARK: Mobile animation

function animateImagesMobile(index, nextIndex) {
    // Arriving at the section, slide in
    if (slidingSections.includes(nextIndex)) {
        var child = getImgFromParent(nextIndex * 2 - 1);
        if (child != null) {
            animateMobileImg(child);
        }

        child = getImgFromParent(nextIndex * 2);
        if (child != null) {
            animateMobileImg(child);
        }
    }
}

// Returns the image node if present, null otherwise
function getImgFromParent(sliderVal) {
    var slider = document.getElementById('slider' + sliderVal);
    if (slider.children[0].nodeName === 'IMG') {
        return slider.children[0];
    }
    return null;
}

// Makes image visible and animates it via parent
function animateMobileImg(img) {
    img.style.visibility = "visible"; 
    img.parentNode.classList.add("fadeInUp");
    img.parentNode.classList.add("animated");
}

// MARK: Desktop animation

function animateSlide(index, nextIndex) {      
    // Leaving the section, slide out
    if (slidingSections.includes(index)) {
        var slide = index;

        // Slide out left
        var slider = document.getElementById('slider' + (slide * 2 - 1));
        slider.classList.remove('slide-in-left');
        slider.classList.add('slide-out-left');

        // Slide out right
        slider = document.getElementById('slider' + (slide * 2));
        slider.classList.remove('slide-in-right');
        slider.classList.add('slide-out-right');
    }

    // Arriving at the section, slide in
    if (slidingSections.includes(nextIndex)) {
        var slide = nextIndex;

        // Slide in left
        var slider = document.getElementById('slider' + (slide * 2 - 1));
        slider.classList.remove('slide-out-left');
        slider.classList.add('slide-in-left');
        
        // Slide in right
        var slider = document.getElementById('slider' + (slide * 2));
        slider.classList.remove('slide-out-right');
        slider.classList.add('slide-in-right');
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
