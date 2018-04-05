
// MARK: For the image modal, only on desktop!
document.addEventListener("DOMContentLoaded", function(event) { 
	if (window.innerWidth <= 1023) {
		return;
	}

	var modalStr = `
	  <span class="close">&times;</span>
	  <img class="modal-content">`;

	// Add menu to the body
	var modal = document.createElement('div');
	modal.classList.add('modal');
	modal.innerHTML = modalStr.trim();
	document.body.appendChild(modal);

	var modalImg = modal.children[1];

	var imgs = document.getElementsByTagName("img")
	for (var i = 0; i < imgs.length; i++) {
		var img = imgs[i];
		if (!img.classList.contains('noModal')) {
			img.onclick = function(){
				modal.style.display = "block";
				modalImg.src = this.src;
				// Disable body scrolling
				document.body.style.overflowY = "hidden";
			}
		}
	}

	// Get the <span> element that closes the modal
	var span = modal.children[0];

	// When the user clicks on <span> (x) or anywhere except image, close the modal
	modal.onclick = function(event) {
		if (event.toElement.nodeName === "IMG") {
			// Don't close if click on image
			return;
		}

		modal.style.display = "none";
		// Enable body scrolling
		document.body.style.overflowY = "visible";
	}
});