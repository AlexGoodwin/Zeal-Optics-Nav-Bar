
(function ($) {

    var windowObj = $(window),
        mediaType = '',
        orientationType;

    $.mediaTypes = {
        MOBILE : 'mobileMedia',
        TABLET : 'tabletMedia',
        DESKTOP: 'desktopMedia'
    };

    $.mediaOrientation = {
        LANDSCAPE : 'landscapeMedia',
        PORTRAIT : 'portraitMedia'
    };

    //globally available media type
    $.currentMedia = '';

    //globally available device orientation
    $.currentOrientation = '';

    var mediaHandler = function(){

        var windowWidth = windowObj.width();

        if(windowWidth < 767){
            mediaType = $.mediaTypes.MOBILE;
        }else if(windowWidth >= 767 && windowWidth < 1024){
            mediaType = $.mediaTypes.TABLET;
        }else{
            mediaType = $.mediaTypes.DESKTOP;
        }

        if(mediaType != $.currentMedia){

            $.currentMedia = mediaType;
            windowObj.triggerHandler(mediaType);

        }
    };

    var orientationHandler = function() {

        switch(window.orientation){
            case -90:
            case 90:
                orientationType = $.mediaOrientation.LANDSCAPE;
                break;
            default:
                orientationType = $.mediaOrientation.PORTRAIT;
                break;
        }

        $.currentOrientation = orientationType;

        windowObj.triggerHandler(orientationType);
    };

    mediaHandler();

    orientationHandler();

    windowObj.bind('resize', mediaHandler)
             .bind('orientationchange', orientationHandler);

})(jQuery);
