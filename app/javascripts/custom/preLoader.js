var mT = require('../common/microtemplating.js');
var template = mT(require('./preLoader.html'));

(function ($) {

    $.fn.shaoPreLoader = function (opts) {
        var elem = $(this);
        var _loaderElem = null;
        var defaults = {
            text: 'Loading...',
            autoStart: true,
            callbacks: {}
        };
        var config = $.extend(true, defaults, opts);

        var init = function () {
            var minHeightSet = !!parseInt(elem.css('min-height'), 10);
            var elemZindex = parseInt(elem.css('z-index'), 10);

            if (elem.css('position') == 'static') {
                elem.css('position', 'relative');
            }

            if (!minHeightSet) {
                elem.css('min-height', '300px');
            }

            _loaderElem = $(template({
                text: config.text
            }));

            if (elemZindex || ( typeof elemZindex == 'number' && elemZindex < 0 )) {
                _loaderElem.css('z-index', elemZindex + 1);
            } else {
                _loaderElem.css('z-index', 1);
            }

            elem.append(_loaderElem);

            if (config.autoStart) {
                show();
            }
        };

        var show = function () {
            _loaderElem.stop().fadeIn(200);
        };

        var hide = function () {
            _loaderElem.stop().fadeOut(200);
        };

        init();

        elem.data('shaoPreLoader', {
            element: elem,
            show: show,
            hide: hide
        });

        return elem;
    };

})(jQuery);