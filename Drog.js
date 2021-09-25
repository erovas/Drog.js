/*!
 * Drog.js v1.2.1
 * [Back-compatibility: IE11+]
 * Copyright (c) 2021, Emanuel Rojas Vásquez
 * BSD 3-Clause License
 * https://github.com/erovas/Drog.js
 */
(function(window, document){

    if(window.Drog)
        return console.error('Drog.js has already been defined');

    let Xi = '-Xi', Yi = '-Yi', Xf = '-Xf', Yf = '-Yf', Xt = '-x', Yt = '-y',
        mousedown = 'mousedown', touchstart = 'touchstart',
        mousemove = 'mousemove', touchmove = 'touchmove',
        mouseup = 'mouseup', touchend = 'touchend',
        father = '-f', passive = { passive: false },
        isDrog = '-d', data = '[data-drog]', elmnt, that;

    function addEvent(element, event, callback, opt){
        element.addEventListener(event, callback, opt || false);
    }

    function removeEvent(element, event, callback, opt){
        element.removeEventListener(event, callback, opt || false);
    }    

    function on(element){

        if(element[isDrog])
            return;

        let target = element.querySelector(data) || element;

        // save reference original element into target
        target[father] = element;

        // Save element position
        element[Xt] = 0;
        element[Yt] = 0;

        //element[Xi] = 0;
        //element[Yi] = 0;
        //element[Xf] = 0;
        //element[Yf] = 0;

        element.style.zIndex = 10;
        target.style.touchAction = "none";

        // signing element
        element[isDrog] = true;

        addEvent(target, mousedown, drogInit);
        addEvent(target, touchstart, drogInit, passive);
    }

    function off(element){

        if(!element[isDrog])
            return;        

        let target = element.querySelector(data) || element;

        element.style.zIndex = '';
        element.style.transform = '';
        target.style.touchAction = '';

        // deleting references
        target[father] = null;

        // unsigning element
        element[isDrog] = null;

        removeEvent(target, mousedown, drogInit);
        removeEvent(target, touchstart, drogInit);
    }

    

    function move(element, x, y){
        
        if(!element[isDrog])
            return;

        x = parseFloat(x) || 0;
        y = parseFloat(y) || 0
        element[Xt] = x;
        element[Yt] = y;
        element.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    }

    function drogInit(e){

        //Fire by central or left click, avoid it
        if(e.which === 2 || e.which === 3)
            return;

        that = this;
        elmnt = that[father];

        //e.preventDefault();

        // get the mouse cursor position at startup:
        elmnt[Xi] = e.clientX || e.targetTouches[0].clientX;
        elmnt[Yi] = e.clientY || e.targetTouches[0].clientY;

        // call a function whenever the cursor moves:
        if(e.type === touchstart){
            addEvent(that, touchmove, drogMove, passive);
            addEvent(that, touchend, drogEnd, passive);
        }
        else {
            addEvent(document, mousemove, drogMove);
            addEvent(document, mouseup, drogEnd);
        }
    }

    function drogMove(e){

        e.preventDefault();
        
        if(e.type === touchmove)
            elmnt = this[father];

        // calculate the new cursor position:
        elmnt[Xf] = e.clientX || e.targetTouches[0].clientX;
        elmnt[Yf] = e.clientY || e.targetTouches[0].clientY;

        elmnt[Xt] -= elmnt[Xi] - elmnt[Xf];
        elmnt[Yt] -= elmnt[Yi] - elmnt[Yf];

        elmnt[Xi] = elmnt[Xf];
        elmnt[Yi] = elmnt[Yf];

        elmnt.style.transform = 'translate(' + elmnt[Xt] + 'px,' + elmnt[Yt] + 'px)';
    }

    function drogEnd(){

        that = this;
        // stop moving when mouse/touch is released:
        removeEvent(document, mousemove, drogMove);
        removeEvent(document, mouseup, drogEnd);

        removeEvent(that, touchmove, drogMove, passive);
        removeEvent(that, touchend, drogEnd, passive);
    }

    window.Drog = {
        on: on,
        off: off,
        move: move
    }

})(window, document);