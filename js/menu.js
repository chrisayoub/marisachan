// MARK: Menu code

// Tracks menu state
var menuOpen = false;

var divBarrier;
var menuList;

document.addEventListener("DOMContentLoaded", function(event) { 
    var menuStr = `
      <input type="checkbox" />
      <span class="menu" onclick="menuClicked()">
        <span class="hamburger"></span>
      </span>`;

    // Add menu to the body
    var menu = document.createElement('label');
    menu.innerHTML = menuStr.trim();
    document.body.appendChild(menu);

    divBarrier = document.createElement('div');
    divBarrier.id = "barrier";
    document.body.appendChild(divBarrier);

    menuList = document.createElement('ul');
    menuList.id = "menuList";
    menuList.innerHTML = `
      <li>
        <a href="index.html">PORTFOLIO.</a>
      </li>
      <li>
        <a href="about.html">ABOUT.</a>
      </li>
      <li>
        <a href="fun.html">FUN.</a>
      </li>
    `;
    document.body.appendChild(menuList);

    // Adding scroll-to-top

    // Add button scroll-to-top, only on Desktop
    if (window.innerWidth < 900) {
        return;
    }
    // Don't add on index with fullpage.js
    if (document.getElementById("fullpage") != null) {
        return;
    }

    var btn = document.createElement('img');
    btn.classList.add("noModal");
    btn.src = "images/up-arrow.svg";
    btn.id = "upArrow";
    btn.onclick = function() {
        window.scroll({
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
    };
    document.body.appendChild(btn);

    if (document.getElementsByClassName("nextProj").length != 0) {
        // Show scroll-to-top button BOTH DIRS
        modifyButtonVisibleBothDirs(btn);
        window.addEventListener("scroll", function() {
            modifyButtonVisibleBothDirs(btn);
        }, false);
    } else {
        // Show scroll-to-top button
        modifyButtonVisible(btn);
        window.addEventListener("scroll", function() {
            modifyButtonVisible(btn);
        }, false);
    }    
});


function modifyButtonVisible(btn) {
    if (!menuOpen) {
        if (window.pageYOffset > 200) {
            if (btn.style.opacity != "1") {
                btn.style.opacity = "1";
                btn.style.visibility = "visible";   
            }
        }
        else {
            if (btn.style.opacity != "0") {
                btn.style.visibility = "hidden";
                btn.style.opacity = "0";   
            }
        }
    }
}

function modifyButtonVisibleBothDirs(btn) {
    if (!menuOpen) {
        var stickOffset = 125;
        var amtToBottom = document.documentElement.scrollHeight - window.pageYOffset - window.innerHeight;

        if (window.pageYOffset > 200 && amtToBottom > stickOffset) {
            if (btn.style.opacity != "1") {
                btn.style.opacity = "1";
                btn.style.visibility = "visible";   
            }
        }
        else {
            if (btn.style.opacity != "0") {
                btn.style.visibility = "hidden";
                btn.style.opacity = "0";   
            }
        }
    }
}

// Disable scrolling once menu is opened
function menuClicked() {
    menuOpen = !menuOpen;
    if (menuOpen) {
        disableMobileScrolling();
        if (window.jQuery) { 
            $.fn.fullpage.setAllowScrolling(false);
        }
    } else {
        enableMobileScrolling();
        if (window.jQuery) { 
            $.fn.fullpage.setAllowScrolling(true);
        }
    }
    toggleLabelsAndBarrier();
}

// Show labels and click barrier
function toggleLabelsAndBarrier() {
    if (menuOpen) {
        divBarrier.style.visibility = "visible";

        menuList.style.visibility = "visible";
        menuList.style.opacity = 1;
    } else {
        divBarrier.style.visibility = "hidden";

        menuList.style.opacity = 0;
        menuList.style.visibility = "hidden";
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
