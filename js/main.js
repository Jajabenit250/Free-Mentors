function navResponsiveFunc() {
  var x = document.getElementById('navResponsive');
  if (x.className.indexOf('fmentors-show') == -1) {
    x.className += ' fmentors-show';
  } else {
    x.className = x.className.replace(' fmentors-show', '');
  }
}

// Click on the "Jeans" link on page load to open the accordion for demo purposes
document.getElementById('myBtn').click();

// Open and close sidebar
function fmentors_open() {
  document.getElementById('mySidebar').style.display = 'block';
  document.getElementById('myOverlay').style.display = 'block';
}

function fmentors_close() {
  document.getElementById('mySidebar').style.display = 'none';
  document.getElementById('myOverlay').style.display = 'none';
}
filterSelection('all');
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName('fmentors-third');
  if (c == 'all') c = '';
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], 'show');
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], 'show');
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(' ');
  arr2 = name.split(' ');
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += ' ' + arr2[i];
    }
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(' ');
  arr2 = name.split(' ');
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(' ');
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById('myBtnContainer');
var btns = btnContainer.getElementsByClassName('fmentors-button');
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function() {
    var current = document.getElementsByClassName('fmentors-black');
    current[0].className = current[0].className.replace(
      ' fmentors-black',
      ' fmentors-white'
    );
    this.className += ' fmentors-black';
  });
}
