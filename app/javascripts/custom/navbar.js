(function ($) {

    $.fn.shaoNavbar = function (opts) {
        var elem = $(this);
        var documentElem = $(document);
        var htmlBody = $('html, body');
        var topSection = $("#topSection");
        var defaults = {
            navigatorLinks: $('.js-link-slider'),
            backToTop: $('.js-navbar-backtotop'),
            callbacks: {
                onNavClick: $.noop,
                onNavClickDone: $.noop,
                onTopSlideVisible: $.noop,
                onTopSlideNotVisible: $.noop
            }
        };
        var config = $.extend(true, defaults, opts);

        var _attachScrollEvents = function () {
            documentElem.on('scroll', function (e) {
                var mainSlideHeight = topSection.outerHeight();
                var bodyScrollTop = documentElem.scrollTop();
                var topSlideNotVisible = bodyScrollTop > mainSlideHeight - 2;

                if (topSlideNotVisible) {
                    elem.addClass('navbar-container-darkened');
                    config.backToTop.stop().fadeIn(200);

                    config.callbacks.onTopSlideNotVisible.call(this, e);
                } else {
                    elem.removeClass('navbar-container-darkened');
                    config.backToTop.stop().fadeOut(200);

                    config.callbacks.onTopSlideVisible.call(this, e);
                }
            }).trigger('scroll');
        };

        var _attachNavigationEvents = function () {
            config.navigatorLinks
                .on('click', function (event) {
                    // Make sure this.hash has a value before overriding default behavior
                    if (this.hash !== "") {
                        // Prevent default anchor click behavior
                        event.preventDefault();

                        // Store hash
                        var hash = this.hash;

                        // Using jQuery's animate() method to add smooth page scroll
                        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
                        htmlBody.animate({
                            scrollTop: $(hash).offset().top
                        }, 800, function () {

                            // Add hash (#) to URL when done scrolling (default click behavior)
                            window.location.hash = hash;
                            config.callbacks.onNavClickDone.call(this, event);
                        });
                    } // End if

                    config.callbacks.onNavClick.call(this, event);
                })
        };

        var init = function () {
            config.backToTop.hide();
            _attachScrollEvents();
            _attachNavigationEvents();
        };

        init();

        elem.data('shaoNavbar', {
            element: elem
        });

        return elem;
    };

})(jQuery);