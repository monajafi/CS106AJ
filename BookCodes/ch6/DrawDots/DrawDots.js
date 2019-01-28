/// <reference path="../../../libs/JSGraphics.js" />
/*
 * File: DrawDots.js
 * -----------------
 * This program draws a dot every time the user clicks the mouse.
 */

 "use strict";

 //constants

 const GWINDOW_WIDTH = 500;
 const GWINDOW_HEIGHT = 300;
 const DOT_SIZE = 6;

 /* Main program */

 function DrawDots() {
     let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
     gw.addEventListener("click",clickAction);

     function clickAction(e) {
         let dot = GOval(e.getX() - DOT_SIZE / 2, e.getY() - DOT_SIZE / 2,DOT_SIZE,DOT_SIZE);
         dot.setFilled(true);
         gw.add(dot);
     }
 }