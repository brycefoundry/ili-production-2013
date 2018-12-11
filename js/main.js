var filterSlider;
var filterCircle;
window.tapCanceled = false;

function init() {
    if (Modernizr.touch) {
        $(window).on('touchstart', function(e) {
            window.tapCanceled = false;
        });

        $(window).on('touchmove', function(e) {
            window.tapCanceled = true;
        });
    }

    initCopyrightYear();

    filterSlider = new FilterSlider($('.slide-navigation'));
    filterCircle = new FilterCircle($('.slide-4-ring-wrapper'));

    resizeHandler();

    if (Modernizr.touch) {
        $('.slide .previous').on('touchend', tap(previousSlideHandler));
        $('.slide .next').on('touchend', tap(nextSlideHandler));
        $('.mobile-menu-button').on('touchend', tap(mobileMenuButtonHandler));
    } else {
        $('.slide .previous').on('click', previousSlideHandler);
        $('.slide .next').on('click', nextSlideHandler);
        $('.mobile-menu-button').on('click', mobileMenuButtonHandler);
        $('.sidenav-indicator').on('mouseenter', sidenavEnterHandler);
        $('.sidenav-wrapper').on('mouseleave', sidenavLeaveHandler);
    }

    if (Modernizr.touch) {
        $('video').css('display', 'none');
    } else {
        $('#intro-video').on('timeupdate', timeUpdateHandler);
    }

    $(window).on('load', function(e) {
        filterSlider.realign();
        $('.slide-navigation-active').css('visibility', 'visible');

        if (!Modernizr.touch) {
            skrollr.init({
                easing: {
                    jitter: function(x) {
                        return Math.random(x) * 2 - 1;
                    },
                    elastic: $.easing.easeOutElastic
                },
                forceHeight: false
            });
        }
    });

    $(window).resize(resizeHandler);

    $('#interest-form').submit(submitHandler);

    initMainNav();

    window.scrollTo(0, 0);
}

function tap(callback) {
    return function(e) {
        if (!window.tapCanceled) {
            callback(e);
        }
    };
}

function sidenavEnterHandler(e) {
    $('.sidenav-wrapper, .global-wrapper').addClass('show-sidenav');
}

function sidenavLeaveHandler(e) {
    $('.sidenav-wrapper, .global-wrapper').removeClass('show-sidenav');
}

function mobileMenuButtonHandler(e) {
    e.preventDefault();

    if ($('.mobile-menu-button').hasClass('active')) {
        hideMobileMenu();
    } else {
        showMobileMenu();
    }
}

function showMobileMenu(callback) {
    var button = $('.mobile-menu-button');
    var slides = $('.slides');

    button.addClass('active');
    slides.addClass('show-mobile-menu');

    if (callback) {
        setTimeout(callback, 400);
    }
}

function hideMobileMenu(callback) {
    var button = $('.mobile-menu-button');
    var slides = $('.slides');

    button.removeClass('active');
    slides.removeClass('show-mobile-menu');

    if (callback) {
        setTimeout(callback, 400);
    }
}

function initCopyrightYear() {
    $('.copyright-year').text(new Date().getFullYear());
}

function submitHandler(e) {
    e.preventDefault();

    var form = $('#interest-form');

    $.post(form.attr('action'), form.serialize());

    form.addClass('success');
    form.addClass('in');

    setTimeout(function () {
        form.removeClass('in');
        form[0].reset();
    }, 400);


    setTimeout(function () {
        form.removeClass('in').addClass('out');
    }, 4000);

    setTimeout(function () {
        form.removeClass('out').removeClass('success');
    }, 4400);
}

function resizeHandler(e) {
    var width = $(window).width();
    var height = $(window).height();

    if (width >= 1160) {
        document.body.style.fontSize = '10px';
    } else {
        document.body.style.fontSize = (width * 10 / 1160) + 'px';
    }

    $('.js-viewport-height').css({
        'height': height
    });

    filterSlider.realign();
    // skrollr.refresh();
}

function timeUpdateHandler(e) {
    if (e.target.currentTime >= 7.01) {
        e.target.removeEventListener('timeupdate', timeUpdateHandler);
        explode();
    }
}

function explode() {
    $('#slide-1 .rays, #slide-1 .icons').addClass('explode');
    $('#slide-1 .icons').addClass('drift');
}

function initMainNav() {
    function scrollToSlide1() {
        scrollToSlide($('#slide-1'));
    }

    function scrollToSlide3() {
        scrollToSlide($('#slide-3'));
    }

    function scrollToSlide5() {
        scrollToSlide($('#slide-5'));
    }

    function scrollToSlide7() {
        scrollToSlide($('#slide-7'));
    }

    if (Modernizr.touch) {
        $('.scroll-to-slide-1').on('touchend', tap(scrollToSlide1));
        $('.scroll-to-slide-3').on('touchend', tap(scrollToSlide3));
        $('.scroll-to-slide-5').on('touchend', tap(scrollToSlide5));
        $('.scroll-to-slide-7').on('touchend', tap(scrollToSlide7));

        $('.scroll-to-top').on('touchend', tap(scrollToTop));

        $('.mobile-menu-scroll-to-slide-3').on('touchend', tap(function() { hideMobileMenu(scrollToSlide3) }));
        $('.mobile-menu-scroll-to-slide-5').on('touchend', tap(function() { hideMobileMenu(scrollToSlide5) }));
        $('.mobile-menu-scroll-to-slide-7').on('touchend', tap(function() { hideMobileMenu(scrollToSlide7) }));
    } else {
        $('.scroll-to-slide-1').on('click', scrollToSlide1);
        $('.scroll-to-slide-3').on('click', scrollToSlide3);
        $('.scroll-to-slide-5').on('click', scrollToSlide5);
        $('.scroll-to-slide-7').on('click', scrollToSlide7);

        $('.scroll-to-top').on('click', scrollToTop);

        $('.mobile-menu-scroll-to-slide-3').on('click', function() { hideMobileMenu(scrollToSlide3) });
        $('.mobile-menu-scroll-to-slide-5').on('click', function() { hideMobileMenu(scrollToSlide5) });
        $('.mobile-menu-scroll-to-slide-7').on('click', function() { hideMobileMenu(scrollToSlide7) });
    }
}

function scrollToTop() {
    $('html, body').animate({
        'scrollTop': 0
    });
}

function scrollToSlide(slide) {
    hideMobileMenu();

    $('html, body').animate({
        'scrollTop': slide.offset().top
    });
}

function previousSlideHandler(e) {
    var target = $(e.target);
    var slide = target.closest('.slide');
    var previousSlide = slide.prev('.slide');

    scrollToSlide(previousSlide);
}

function nextSlideHandler(e) {
    var target = $(e.target);
    var slide = target.closest('.slide');
    var nextSlide = slide.next('.slide');

    scrollToSlide(nextSlide);
}
