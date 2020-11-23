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

function calcScroll() {
  var div = document.createElement('div');
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.overflowY = 'scroll';
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  var scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
}

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

      if (w >= 700 && !menu.hasClass('menu-personal')) {
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
      speed: 600,
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
        }
      }
    });
  };

  teamSlider();

  var popup = function popup() {
    var header = $('.header__inner');
    var dataFancybox = $('[data-fancybox]');
    dataFancybox.fancybox({
      keyboard: true,
      image: {
        preload: true
      },
      infobar: false,
      btnTpl: {
        smallBtn: '<button type="button" data-fancybox-close class="close" title="{{CLOSE}}">' + '<svg class="icon icon-close "><use xlink:href="static/images/sprite/symbol/sprite.svg#close"></use></svg>' + "</button>"
      },
      clickContent: function clickContent(current, event) {
        return current.type === "image" ? "zoom" : false;
      },
      onInit: function onInit() {
        header.css('transform', 'translateX(' + -calcScroll() / 2 + 'px)');
      },
      afterClose: function afterClose() {
        header.css('transform', '');
      }
    });
    $.fancybox.defaults.animationEffect = "circular";
    $.fancybox.defaults.animationDuration = 500;
  };

  popup();

  var dropdown = function dropdown() {
    var elem = $('.header__user');
    var dropdown = $('.header__dropdown');
    elem.on('click', function (e) {
      e.stopPropagation();
      $(this).toggleClass('is-active');
      $(this).find(dropdown).slideToggle();
    });
    $(document).on('click', function (e) {
      var target = e.target;

      if (!dropdown.is(target) && dropdown.has(target).length === 0) {
        dropdown.slideUp();
        elem.removeClass('is-active');
      }
    });
  };

  dropdown();
});

var headerSticky = function headerSticky() {
  var scrollPrev = 0;
  var header = document.querySelector('.header');
  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY;

    if (scrolled >= 100 && scrolled > scrollPrev) {
      header.style.top = -header.offsetHeight - 15 + 'px';
    } else if (scrolled === 0) {
      header.classList.remove('header--sticky');

      if (!header.classList.contains('header--top')) {
        header.style.top = 30 + 'px';
      } else {
        header.style.top = 0;
      }
    } else {
      if (!header.classList.contains('header--top')) {
        header.classList.add('header--sticky');
      }

      header.style.top = 0;
    }

    scrollPrev = scrolled;
  });
};

headerSticky();