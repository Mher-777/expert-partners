"use strict";

function canUseWebp() {
  var elem = document.createElement('canvas');

  if (!!(elem.getContext && elem.getContext('2d'))) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
  }

  return false;
}

window.onload = function () {
  var images = document.querySelectorAll('[data-bg]');

  for (var i = 0; i < images.length; i++) {
    var image = images[i].getAttribute('data-bg');
    images[i].style.backgroundImage = 'url(' + image + ')';
  }

  var isitFirefox = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);
  var firefoxVer = isitFirefox ? parseInt(isitFirefox[1]) : 0;

  if (canUseWebp() || firefoxVer >= 65) {
    var imagesWebp = document.querySelectorAll('[data-bg-webp]');

    for (var _i = 0; _i < imagesWebp.length; _i++) {
      var imageWebp = imagesWebp[_i].getAttribute('data-bg-webp');

      imagesWebp[_i].style.backgroundImage = 'url(' + imageWebp + ')';
    }
  }
};

$(function () {
  svg4everybody();
  var body = $('body');

  var menu = function menu() {
    var btn = $('.hamburger');
    var menu = $('.menu-mobile');
    btn.on('click', function (e) {
      e.stopPropagation();
      body.toggleClass('hidden');
      menu.toggleClass('is-open');
    });
    $(document).on('click', function (e) {
      var container = menu;
      var target = e.target;

      if (!container.is(target) && container.has(target).length === 0) {
        menu.removeClass('is-open');
        $('.hamburger').removeClass('is-active');
      }
    });

    function responsiveMenu() {
      var w = $(window).width();

      if (w >= 700) {
        menu.removeClass('is-open');
      }
    }

    responsiveMenu();
    $(window).resize(function (e) {
      responsiveMenu();
    });
  };

  menu();

  var teamSlider = function teamSlider() {
    var slider = new Swiper('.team__slider', {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 25,
      // autoHeight: true,
      navigation: {
        nextEl: '.team__slider-arrow--next',
        prevEl: '.team__slider-arrow--prev'
      },
      keyboard: {
        enable: true,
        onlyInViewport: true
      },
      pagination: {
        el: '.swiper-pagination',
        type: "fraction",
        renderFraction: function renderFraction(currentClass, totalClass) {
          return "\n                    <span class=\"".concat(currentClass, "\"></span> \n                    <span class=\"line\"></span>\n                    <span class=\"").concat(totalClass, "\"></span>\n                ");
        },
        formatFractionCurrent: function formatFractionCurrent(number) {
          return number < 10 ? '0' + number.toString() : number.toString();
        },
        formatFractionTotal: function formatFractionTotal(number) {
          return number < 10 ? '0' + number.toString() : number.toString();
        }
      },
      breakpoints: {
        300: {
          slidesPerView: 2,
          slidesPerGroup: 1,
          centeredSlides: true,
          spaceBetween: 20,
          initialSlide: 1 // autoHeight: true

        },
        340: {
          slidesPerView: 2,
          slidesPerGroup: 1,
          centeredSlides: true,
          spaceBetween: 40,
          initialSlide: 1 // autoHeight: true

        },
        550: {
          slidesPerView: 2,
          slidesPerGroup: 1,
          centeredSlides: true,
          spaceBetween: 70,
          initialSlide: 1 // autoHeight: true

        },
        772: {
          slidesPerView: 2,
          slidesPerGroup: 1,
          centeredSlides: true,
          spaceBetween: 95,
          initialSlide: 1 // autoHeight: true

        },
        950: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          centeredSlides: false,
          initialSlide: 1,
          spaceBetween: 25
        } // 640: {
        //
        // }

      }
    }); // $(window).bind('resize', function (e) {
    //     if (window.RT) clearTimeout(window.RT);
    //     window.RT = setTimeout(function () {
    //         slider.update()
    //     }, 200);
    // });
  };

  teamSlider();
});

var headerSticky = function headerSticky() {
  var scrollPrev = 0;
  var header = document.querySelector('.header.header--position');
  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY;

    if (scrolled >= 100 && scrolled > scrollPrev) {
      header.style.top = -header.offsetHeight - 15 + 'px';
    } else if (scrolled === 0) {
      header.style.top = 30 + 'px';
      header.classList.remove('header--sticky');
    } else {
      header.style.top = 0;
      header.classList.add('header--sticky');
    }

    scrollPrev = scrolled;
  });
};

headerSticky();