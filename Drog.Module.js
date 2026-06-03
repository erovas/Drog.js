/*!
 * Drog.js v1.2.2
 * Copyright (c) 2026, Emanuel Rojas Vásquez
 * MIT License
 * https://github.com/erovas/Drog.js
 * Converted to ES Module.
 */

const Xi = '-Xi';
const Yi = '-Yi'; 
const Xf = '-Xf'; 
const Yf = '-Yf'; 
const Xt = '-x'; 
const Yt = '-y';
const mousedown = 'mousedown'; 
const TOUCHSTART = 'touchstart';
const MOUSEMOVE = 'mousemove';
const TOUCHMOVE = 'touchmove';
const MOUSEUP = 'mouseup';
const TOUCHEND = 'touchend';
const FATHER = '-f'; 
const PASSIVE = { passive: false };
const IS_DROG = '-d';
const DATA_DROG = '[data-drog]';

//#region Helpers

/**
 * 
 * @param {HTMLElement | Document} element 
 * @param {string} type 
 * @param {EventListenerOrEventListenerObject} listener 
 * @param {boolean | AddEventListenerOptions} options 
 */
function addEvent(element, type, listener, options = false) {
    element.addEventListener(type, listener, options);
}

/**
 * 
 * @param {HTMLElement | Document} element 
 * @param {string} type 
 * @param {EventListenerOrEventListenerObject} listener 
 * @param {boolean | AddEventListenerOptions} options 
 */
function removeEvent(element, type, listener, options = false) {
    element.removeEventListener(type, listener, options);
}

/**
 * 
 * @param {HTMLElement} element 
 * @param {string} selectors 
 */
function querySelector(element, selectors){
    return element.querySelector(DATA_DROG) || element;
}

//#endregion

//#region Methods

/**
 * Enables drag functionality on a DOM element.
 * @param {HTMLElement} element - The DOM element to make draggable
 * @returns 
 */
function on(element) {
    if (element[IS_DROG])
        return;

    const target = querySelector(element, DATA_DROG);

    // save reference original element into target
    target[FATHER] = element;

    // Save element position
    element[Xt] = 0;
    element[Yt] = 0;

    element.style.zIndex = 10;
    target.style.touchAction = "none";

    // signing element
    element[IS_DROG] = true;

    addEvent(target, mousedown, drogInit);
    addEvent(target, TOUCHSTART, drogInit, PASSIVE);
}

/**
 * Disables drag functionality on a DOM element.
 * @param {HTMLElement} element - The DOM element to remove drag from
 * @returns 
 */
function off(element) {
    if (!element[IS_DROG])
        return;

    const target = querySelector(element, DATA_DROG);

    element.style.zIndex = '';
    element.style.transform = '';
    target.style.touchAction = '';

    // deleting references
    target[FATHER] = null;

    // unsigning element
    element[IS_DROG] = null;

    removeEvent(target, mousedown, drogInit);
    removeEvent(target, TOUCHSTART, drogInit);
}

/**
 * Programmatically moves a draggable element to specific coordinates.
 * @param {HTMLElement} element - The draggable DOM element
 * @param {Number} x - X coordinate in pixels.
 * @param {Number} y - Y coordinate in pixels
 * @returns 
 */
function move(element, x, y) {
    if (!element[IS_DROG])
        return;

    x = parseFloat(x) || 0;
    y = parseFloat(y) || 0;
    element[Xt] = x;
    element[Yt] = y;
    element.style.transform = 'translate(' + x + 'px,' + y + 'px)';
}

//#endregion

//#region Events

/**
 * 
 * @param {MouseEvent|TouchEvent} e 
 * @returns 
 */
function drogInit(e) {
    if (e.which > 1)
        return;

    const that = this;
    const element = that[FATHER];

    // get the mouse cursor position at startup:
    element[Xi] = e.clientX || e.targetTouches[0].clientX;
    element[Yi] = e.clientY || e.targetTouches[0].clientY;

    // call a function whenever the cursor moves:
    if (e.type === TOUCHSTART) {
        addEvent(that, TOUCHMOVE, drogMove, PASSIVE);
        addEvent(that, TOUCHEND, drogEnd, PASSIVE);
    } 
    else {
        addEvent(that, MOUSEMOVE, drogMove);
        addEvent(that, MOUSEUP, drogEnd);
    }
}

/**
 * 
 * @param {MouseEvent|TouchEvent} e 
 */
function drogMove(e) {
    e.preventDefault();

    const element = this[FATHER];

    // calculate the new cursor position:
    element[Xf] = e.clientX || e.targetTouches[0].clientX;
    element[Yf] = e.clientY || e.targetTouches[0].clientY;

    element[Xt] -= element[Xi] - element[Xf];
    element[Yt] -= element[Yi] - element[Yf];

    element[Xi] = element[Xf];
    element[Yi] = element[Yf];

    element.style.transform = 'translate(' + element[Xt] + 'px,' + element[Yt] + 'px)';
}

function drogEnd(e) {
    const that = this;

    // stop moving when mouse/touch is released:
    removeEvent(that, MOUSEMOVE, drogMove);
    removeEvent(that, MOUSEUP, drogEnd);

    removeEvent(that, TOUCHMOVE, drogMove, PASSIVE);
    removeEvent(that, TOUCHEND, drogEnd, PASSIVE);
}

//#endregion

const Drog = {
    on,
    off,
    move
};

export default Drog;