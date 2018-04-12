// Initalize AOS
window.onload = function(event) { 
    // Mobile case
    if (window.innerWidth < 900) {
		var attribs = document.querySelectorAll('[data-aos-delay]');
		for (var i = 0; i < attribs.length; i++) {
			attribs[i].setAttribute("data-aos-delay", "0");
		}
    }
    AOS.init({
        duration: 1000,
        once: true
    });
}