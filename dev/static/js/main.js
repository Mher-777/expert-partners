function canUseWebp() {
    let elem = document.createElement('canvas');
    if (!!(elem.getContext && elem.getContext('2d'))) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }
    return false;
}
window.onload = function () {
    let images = document.querySelectorAll('[data-bg]');
    for (let i = 0; i < images.length; i++) {
        let image = images[i].getAttribute('data-bg');
        images[i].style.backgroundImage = 'url(' + image + ')';
    }

    let isitFirefox = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);
    let firefoxVer = isitFirefox ? parseInt(isitFirefox[1]) : 0;

    if (canUseWebp() || firefoxVer >= 65) {
        let imagesWebp = document.querySelectorAll('[data-bg-webp]');
        for (let i = 0; i < imagesWebp.length; i++) {
            let imageWebp = imagesWebp[i].getAttribute('data-bg-webp');
            imagesWebp[i].style.backgroundImage = 'url(' + imageWebp + ')';
        }
    }
};
function calcScroll() {
    let div = document.createElement('div')
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
}

$(function () {
    svg4everybody();
    const body = $('body')
    const menu = () => {
        const btn = $('.hamburger')
        const menu = $('.menu-mobile')
        btn.on('click', function (e) {
            e.stopPropagation();
            body.toggleClass('hidden')
            menu.toggleClass('is-open')
        })
        $(document).on('click', function (e) {
            let container = menu
            const target = e.target
            if (!container.is(target) && container.has(target).length === 0) {
                menu.removeClass('is-open')
                $('.hamburger').removeClass('is-active')
            }
        })
        function responsiveMenu() {
            const w = $(window).width()
            if (w >= 700 && !menu.hasClass('menu-personal')) {
                menu.removeClass('is-open')
            }
        }

        responsiveMenu()
        $(window).resize(function (e) {
            responsiveMenu()
        });
    }
    menu()
    const teamSlider = () => {
        let slider = new Swiper('.team__slider', {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 25,
            speed: 600,
            navigation: {
                nextEl: '.team__slider-arrow--next',
                prevEl: '.team__slider-arrow--prev',
            },
            keyboard: {
                enable: true,
                onlyInViewport: true
            },
            pagination: {
                el: '.swiper-pagination',
                type: "fraction",
                renderFraction: function (currentClass, totalClass) {
                    return `
                    <span class="${currentClass}"></span> 
                    <span class="line"></span>
                    <span class="${totalClass}"></span>
                `
                },
                formatFractionCurrent: function (number) {
                    return (number < 10) ? '0' + number.toString() : number.toString();
                },
                formatFractionTotal: function (number) {
                    return (number < 10) ? '0' + number.toString() : number.toString();
                }
            },
            breakpoints: {
                300: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    centeredSlides: true,
                    spaceBetween: 20,
                    initialSlide: 1,
                    // autoHeight: true
                },
                340: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    centeredSlides: true,
                    spaceBetween: 40,
                    initialSlide: 1,
                    // autoHeight: true
                },
                550: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    centeredSlides: true,
                    spaceBetween: 70,
                    initialSlide: 1,
                    // autoHeight: true
                },
                772: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    centeredSlides: true,
                    spaceBetween: 95,
                    initialSlide: 1,
                    // autoHeight: true
                },
                950: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    centeredSlides: false,
                    initialSlide: 1,
                    spaceBetween: 25,

                },
            }
        });
    }
    teamSlider()
    const popup = () => {
        const header = $('.header__inner')
        const dataFancybox = $('[data-fancybox]');
        dataFancybox.fancybox({
            keyboard: true,
            image: {
                preload: true
            },
            infobar: false,
            btnTpl: {
                smallBtn: '<button type="button" data-fancybox-close class="close" title="{{CLOSE}}">' +
                    '<svg class="icon icon-close "><use xlink:href="static/images/sprite/symbol/sprite.svg#close"></use></svg>' +
                    "</button>"
            },
            clickContent: function clickContent(current, event) {
                return current.type === "image" ? "zoom" : false;
            },
            onInit: function () {
                header.css('transform', 'translateX(' + -calcScroll() / 2 + 'px)')
            },
            afterClose: function () {
                header.css('transform', '')
            }
        });

        $.fancybox.defaults.animationEffect = "circular";
        $.fancybox.defaults.animationDuration = 500;
    }
    popup()
    const dropdown = () => {
        const elem = $('.header__user');
        const dropdown = $('.header__dropdown')
        elem.on('click', function (e) {
            e.stopPropagation()
            $(this).toggleClass('is-active')
            $(this).find(dropdown).slideToggle()
        })
        $(document).on('click', function (e) {
            const target = e.target
            if (!dropdown.is(target) && dropdown.has(target).length === 0) {
                dropdown.slideUp()
                elem.removeClass('is-active')
            }
        })
    }
    dropdown()
    const mask = () => {
        $(":input").inputmask();
    }
    mask()
    const scrollToElem = () => {
        $(".js-btn-scroll").on('click', function(e) {
            e.preventDefault()
            const $this = $(this).attr('data-elem')
            console.log($this)
            $('html, body').animate({
                scrollTop: $($this).offset().top
            }, 1000);
        });
    }
    scrollToElem()
})
const headerSticky = () => {
    let scrollPrev = 0;
    let header = document.querySelector('.header')
    window.addEventListener('scroll', () => {
        let scrolled = window.scrollY;
        if(scrolled >= 100 && scrolled > scrollPrev) {
            header.style.top = -header.offsetHeight - 15 + 'px';
        } else if(scrolled === 0) {
            header.classList.remove('header--sticky')
            if(!header.classList.contains('header--top')) {
                header.style.top = 30 + 'px';
            } else {
                header.style.top = 0;
            }
        } else {
            if(!header.classList.contains('header--top')) {
                header.classList.add('header--sticky')
            }
            header.style.top = 0;
        }
        scrollPrev = scrolled;
    });
}
headerSticky()
