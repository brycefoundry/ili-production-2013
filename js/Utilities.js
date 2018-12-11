var Utilities = {};

Utilities.crossFade = function(from, to, duration) {
    if (duration == undefined) {
        duration = 200;
    }

    from.stop().animate({
        'opacity': 0
    }, duration, function () {
        from.css({'display': 'none'});

        to.css({
            'display': 'block'
        }).stop().animate({
            'opacity': 1
        }, duration);
    });
}
