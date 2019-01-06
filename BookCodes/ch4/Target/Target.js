/// <reference path="../../../libs/JSGraphics.js" />
"use strict";

/* The outer circle diamter */
const OUTER_RADIUS = 100;
const GWINDOW_WIDTH = 500;
const GWINDOW_HEIGHT = 300;

/*
 * Draws target by creating three circles inside each other that alternate colors progressively
 * x and y indicate the upper left corner of bounding box that surrounds outer circle
 */

function Target(){
    let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
    let x = GWINDOW_WIDTH / 2 - OUTER_RADIUS;
    let y = GWINDOW_HEIGHT / 2 - OUTER_RADIUS;
    gw.add(createFilledCircle(x,y,OUTER_RADIUS,"Red"));
    x += OUTER_RADIUS / 3;
    y += OUTER_RADIUS / 3;
    gw.add(createFilledCircle(x,y,OUTER_RADIUS * 2 / 3,"White"));
    x += OUTER_RADIUS / 3;
    y += OUTER_RADIUS / 3;
    gw.add(createFilledCircle(x,y,OUTER_RADIUS / 3,"Red"));
}

/*
 * Draws circle using x and y coordinate , radius and color as a fill color
 */

 function createFilledCircle(x,y,radius,color){
     let circle = GOval(x,y,2 * radius,2 * radius);
      circle.setColor(color);
      circle.setFilled(true);
      circle.setFillColor(color);
      return circle;
 }