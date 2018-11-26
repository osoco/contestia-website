@import './libs/jquery-3.3.1.min.js';
@import './libs/glide.js';

$('.burger, .menu a').on('click touch',function (e) {
  e.preventDefault();
  $('.burger, .menu').toggleClass('on');
});

$('.tooltip').on('click touch', function (e) {
  e.preventDefault();
  $(this).toggleClass('on');
});

var glide = new Glide('.slider', {
  type: 'slider',
  perView: 1,
  focusAt: 'center',
})


glide.mount()