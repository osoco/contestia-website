@import './libs/jquery-3.3.1.min.js';
@import './libs/glide.js';

// Menu
$('.burger, .menu a').on('click', function (e) {
  e.preventDefault();
  $('.burger, .menu').toggleClass('on');
});

// Tooltips
$('.tooltip').on('click touch', function (e) {
  e.preventDefault();
  $(this).toggleClass('on');
});

// Slider
var glide = new Glide('.slider', {
  type: 'slider',
  perView: 1,
  focusAt: 'center',
})

glide.mount()

// Animate ScrollTo
$('.menu a, .main__footer li a').on('click', function (e) {
  // Make sure this.hash has a value before overriding default behavior
  if (this.hash !== '') {

    // Prevent default anchor click behavior
    e.preventDefault();

    // Store hash
    var hash = this.hash;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 800, function () {

      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
    });
  } // End if
});