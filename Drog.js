/*!
 * Drog.js v1.1.0
 * [Back-compatibility: IE11+]
 * Copyright (c) 2021, Emanuel Rojas Vásquez
 * BSD 3-Clause License
 * https://github.com/erovas/Drog.js
 */
(function(window, document){

    if(window.Drog)
        return console.error('Drog.js has already been defined');

    let Xi = 0, Yi = 0, Xf = 0, Yf = 0, Xt = '-x', Yt = '-y',
        mdown = 'mousedown', tstart = 'touchstart',
        mmove = 'mousemove', tmove = 'touchmove',
        mup = 'mouseup', tend = 'touchend',
        father = '-f', passive = { passive: false },
        isDrog = '-d', data = '[data-drog]', elmnt;

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

        element.style.zIndex = 10;

        // signing element
        element[isDrog] = true;

        addEvent(target, mdown, drogInit);
        addEvent(target, tstart, drogInit, passive);
    }

    function off(element){

        if(!element[isDrog])
            return;        

        let target = element.querySelector(data) || element;

        element.style.zIndex = '';
        element.style.transform = '';

        // deleting references
        target[father] = null;

        // unsigning element
        element[isDrog] = false;

        removeEvent(target, mdown, drogInit);
        removeEvent(target, tstart, drogInit);
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
        elmnt = this[father];

        e.preventDefault();
        // get the mouse cursor position at startup:
        Xi = e.clientX || e.touches[0].clientX;
        Yi = e.clientY || e.touches[0].clientY;

        // call a function whenever the cursor moves:
        addEvent(document, mmove, drogMove);
        addEvent(document, tmove, drogMove, passive);

        // call a function when cursor/touch up/end
        addEvent(document, mup, drogEnd);
        addEvent(document, tend, drogEnd, passive);
    }

    function drogMove(e){
        e.preventDefault();
        // calculate the new cursor position:
        Xf = e.clientX || e.touches[0].clientX;
        Yf = e.clientY || e.touches[0].clientY;

        elmnt[Xt] -= Xi - Xf;
        elmnt[Yt] -= Yi - Yf;

        Xi = Xf;
        Yi = Yf;

        elmnt.style.transform = 'translate(' + elmnt[Xt] + 'px,' + elmnt[Yt] + 'px)';
    }

    function drogEnd(){
        // stop moving when mouse/touch is released:
        removeEvent(document, mmove, drogMove);
        removeEvent(document, tmove, drogMove, passive);
        removeEvent(document, mup, drogEnd);
        removeEvent(document, tend, drogEnd, passive);
    }

    window.Drog = {
        on: on,
        off: off,
        move: move
    }

})(window, document);