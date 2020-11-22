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
let scrollPrev = 0;
let header = document.querySelector('.header.header--position')
window.addEventListener('scroll', () => {
    let scrolled = window.scrollY;
    if(scrolled >= 100 && scrolled > scrollPrev) {
        header.style.top = -header.offsetHeight + 'px';
    } else if(scrolled === 0) {
        header.style.top = 30 + 'px';
        header.classList.remove('header--sticky')
    } else {
        header.style.top = 0;
        header.classList.add('header--sticky')
    }
    scrollPrev = scrolled;
});
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
            if (w >= 700) {
                menu.removeClass('is-open')
            }
        }

        responsiveMenu()
        $(window).resize(function (e) {
            responsiveMenu()
        });
    }
    menu()
})