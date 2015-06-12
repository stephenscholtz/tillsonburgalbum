;(function() {
    // Better errors
    "use strict";
    
    // Avoid `console` errors in browsers that lack a console.
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
$(document).ready(function() {
    (function() {
        // Media Query helper for javascript
        var MQ = window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/"/g, "");
        // Quotes rotation
        $(".cbp-qtrotator").cbpQTRotator({interval: 7000});

        $('.my-gallery a').each(function(index){
            this.dataset.galIndex = index;
            $(this).click(function(e){
                e.preventDefault();
                var ind = parseInt(this.dataset.galIndex);
                openPhotoSwipe(ind);
            });
        });

    })();

});

function openPhotoSwipe(ind) {
    // Gallery
    var pswpElement = document.querySelectorAll('.pswp')[0];
    var items = [];
    $('.my-gallery a').each(function(index){
            //var t = $(this);
            var url = this.href;
            var surl = this.querySelectorAll('img')[0].src; 
            var cap = this.querySelectorAll('img')[0].alt;
            var size = this.dataset.size;
            var width = parseInt(size.split('x')[0]);
            var height = parseInt(size.split('x')[1]);
            console.log('Got img = ' + url);
            console.log('Got cap = ' + cap);
            console.log('Got size = ' + size);
            
            items.push(
                {
                    src: url
                    , msrc: surl
                    , w: width
                    , h: height
                    , title: cap
                }
            );
        }
    );
    console.log('Check = ' + items);
    // define options (if needed)
    var options = {
        // optionName: 'option value'
        // for example:
        index: ind // start at the index
        /*, shareButtons: [
            {id:'download', label:'Download image', url:'{{raw_image_url}}', download:true}
        ]*/
        , history: false
        , showHideOpacity: true
        , getThumbBoundsFn: function(index) {

            // find thumbnail element
            var thumbnail = document.querySelectorAll('.my-gallery-thumb')[index];

            // get window scroll Y
            var pageYScroll = window.pageYOffset || document.documentElement.scrollTop; 
            // optionally get horizontal scroll

            // get position of element relative to viewport
            var rect = thumbnail.getBoundingClientRect(); 

            // w = width
            return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};


            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
        }

    };
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
}