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

var scrollPrev = 0;
var header = document.querySelector('.header.header--position');
window.addEventListener('scroll', function () {
  var scrolled = window.scrollY;

  if (scrolled >= 100 && scrolled > scrollPrev) {
    header.style.top = -header.offsetHeight + 'px';
  } else if (scrolled === 0) {
    header.style.top = 30 + 'px';
    header.classList.remove('header--sticky');
  } else {
    header.style.top = 0;
    header.classList.add('header--sticky');
  }

  scrollPrev = scrolled;
});
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
});