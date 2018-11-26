@import './libs/jquery-3.3.1.min.js';
@import './libs/glide.js';

$('.burger').click(function () {
  $(this).toggleClass('on');
  $('.menu').toggleClass('on');
});

var glide = new Glide('.slider', {
  type: 'slider',
  perView: 1,
  focusAt: 'center',
})


glide.mount()
