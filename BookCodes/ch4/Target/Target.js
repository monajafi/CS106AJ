/// <reference path="../../../libs/JSGraphics.js" />
"use strict";

/* The outer circle diamter */
const OUTER_RADIUS = 100;
const GWINDOW_WIDTH = 500;
const GWINDOW_HEIGHT = 300;

/*
 * Draws a target at the center of graphics window composed of three concenteric circles
 * alternately colored red and white
 */

function Target(){
    let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
    let x = GWINDOW_WIDTH / 2 ;
    let y = GWINDOW_HEIGHT / 2 ;
    gw.add(createFilledCircle(x,y,OUTER_RADIUS,"Red"));
    gw.add(createFilledCircle(x,y,OUTER_RADIUS * 2 / 3,"White"));
    gw.add(createFilledCircle(x,y,OUTER_RADIUS / 3,"Red"));
}

/*
 * Creates a circle of radius r centered at (x,y) filled with the specified color and returns 
 * initialized GOval object to the caller
 */

 function createFilledCircle(x,y,radius,color){
     let circle = GOval(x - radius,y - radius,2 * radius,2 * radius);
      circle.setColor(color);
      circle.setFilled(true);
      return circle;
 }