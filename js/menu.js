// MARK: Menu code
document.addEventListener("DOMContentLoaded", function(event) { 
    var menuStr = `
      <input type="checkbox" />
      <span class="menu" onclick="menuClicked()">
        <span class="hamburger"></span>
      </span>
      <ul>
        <li>
          <a href="index.html">HOME.</a>
        </li>
        <li>
          <a href="about.html">ABOUT.</a>
        </li>
        <li>
          <a href="#">FUN.</a>
        </li>
      </ul>`;

    // Add menu to the body
    var menu = document.createElement('label');
    menu.innerHTML = menuStr.trim();
    document.body.appendChild(menu);
});

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
