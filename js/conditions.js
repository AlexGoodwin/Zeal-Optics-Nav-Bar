var $j = jQuery;
var ZealMarketing = ZealMarketing || {};
ZealMarketing.LensConditions = {
    init: function() {
        $j(".gt-page .conditions .options li").click(function() {
            var e = $j(this).attr("class");
            ZealMarketing.LensConditions.toggleCondition(e)
        })
    },
    toggleCondition: function(e) {
        switch (e) {
            case "sunny":
                $j(".gt-page .conditions").addClass("conditions-sunny").removeClass("conditions-snowy conditions-cloudy");
                break;
            case "cloudy":
                $j(".gt-page .conditions").addClass("conditions-cloudy").removeClass("conditions-sunny conditions-snowy");
                break;
            case "snowy":
                $j(".gt-page .conditions").addClass("conditions-snowy").removeClass("conditions-sunny conditions-cloudy")
        }
    }
};

var ZealMarketing = ZealMarketing || {};
ZealMarketing.App = {
    resizeCompleteTimeout: 0,
    resizeCompleteDelay: 500,
    vendor: "",
    isAndroid: !1,
    isIDevice: !1,
    isPlaybook: !1,
    isTouchPad: !1,
    has3d: !1,
    hasTouch: !1,
    hasTransform: !1,
    hasTransitionEnd: !1,
    isMobile: !1,
    init: function() {
        this.setBrowserVars(), ZealMarketing.LensConditions.init(), $j(window).resize($j.proxy(this.resizeUpdate, this)), this.resizeUpdate()
    },
    resizeUpdate: function() {
        this.isMobile && this.orientationChangeUpdate(), 0 !== this.resizeCompleteTimeout && clearTimeout(this.resizeCompleteTimeout), this.resizeCompleteTimeout = setTimeout($j.proxy(this.resizeUpdateComplete, this), this.resizeCompleteDelay)
    },
    resizeUpdateComplete: function() {},
    orientationChangeUpdate: function() {},
    setBrowserVars: function() {
        this.vendor = /webkit/i.test(navigator.appVersion) ? "webkit" : /firefox/i.test(navigator.userAgent) ? "Moz" : "opera" in window ? "O" : "", this.isAndroid = /android/gi.test(navigator.appVersion), this.isIDevice = /iphone|ipad|ipod/gi.test(navigator.appVersion), this.isPlaybook = /playbook/gi.test(navigator.appVersion), this.isTouchPad = /hp-tablet/gi.test(navigator.appVersion), this.has3d = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix, this.hasTouch = "ontouchstart" in window && !this.isTouchPad, this.hasTransform = this.vendor + "Transform" in document.documentElement.style, this.hasTransitionEnd = this.isIDevice || this.isPlaybook, this.isMobile = this.isAndroid || this.isIDevice || this.isPlaybook || this.isTouchPad, this.isAndroid ? $j("html").addClass("android") : this.isIDevice && $j("html").addClass("ios"), this.isMobile && $j("html").addClass("mobile")
    }
}, $j(document).ready(function() {
    ZealMarketing.App.init()
});