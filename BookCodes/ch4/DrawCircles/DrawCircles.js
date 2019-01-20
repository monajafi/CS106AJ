/// <reference path="../../../libs/JSGraphics.js" />
"use strict";

/* constants */
const GWINDOW_WIDTH = 500;
const GWINDOW_HEIGHT = 300;
const CIRCLE_COUNT = 5;
const CIRCLE_SIZE = 80;
const SPACING = 10;

/*
 * Draws five circles centered in graphical window gw
 * x and y indicates the upper left corner of bounding box that 
 * surrounds the five circles
 * This solution is designed for any number of the circles and is more readble than the 
 * original solution in the Eric's book.
 */

 function DrawCircles(){
    let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
    let x = (GWINDOW_WIDTH - (CIRCLE_COUNT *(CIRCLE_SIZE +SPACING -1))) / 2;
    let y = (GWINDOW_HEIGHT - CIRCLE_SIZE) / 2;
    for(let i = 0;i < CIRCLE_COUNT;i++){
        gw.add(GOval(x,y,CIRCLE_SIZE,CIRCLE_SIZE));
        x += CIRCLE_SIZE + SPACING;
    }
 }