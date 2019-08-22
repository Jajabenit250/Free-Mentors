function navResponsiveFunc() {
  var x = document.getElementById("navResponsive");
  if (x.className.indexOf("fmentors-show") == -1) {
    x.className += " fmentors-show";
  } else {
    x.className = x.className.replace(" fmentors-show", "");
  }
}

// Click on the "Jeans" link on page load to open the accordion for demo purposes
document.getElementById("myBtn").click();

// Open and close sidebar
function fmentors_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}

function fmentors_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}
