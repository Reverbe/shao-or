(function($){

    $.fn.shaoMainImgSlider = function (opts) {
        var elem = $(this);
        var _picsObj = {};
        var defaults = {

        };
        var config = $.extend(defaults, opts);

        var _createPicsObj = function () {
            for (var i = 0; i < config.imgs.length; i++) {
                _picsObj[config.imgs[i]] = false;
            }
        };

        var _pickImage = function () {
            var chosenImg = '';
            var allImgsUsed = true;
            var first = true;

            $.each(_picsObj, function (idx, val) {
                if (!val) {
                    chosenImg = idx;
                    _picsObj[idx] = true;
                    allImgsUsed = false;

                    return false;
                }
            });

            if (allImgsUsed) {
                $.each(_picsObj, function (idx, val) {
                     if (first) {
                         chosenImg = idx;
                         _picsObj[idx] = true;
                         first = false;

                         return true;
                     }

                    _picsObj[idx] = false;
                });
            }

            elem.css('background-image', 'url(' + chosenImg + ')');
        };

        var cancel = function () {
            clearInterval(elem.data('_cycleInterval'));
        };

        var init = function () {
            _createPicsObj();

            elem.data('_cycleInterval', setInterval(function () {
                _pickImage();
            }, 3000));
        };

        init();

        elem.data('shaoMainImgSlider',{
            element: elem,
            cancel: cancel
        });
    };

})(jQuery);