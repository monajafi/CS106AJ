/// <reference path="../../../libs/JSGraphics.js" />
/// <reference path="../../../libs/RandomLib.js" />
/*
 * File: AnimateSquareColor.js
 * ---------------------------
 * This program animates square color every second for a minute
 */

 //constants

 const GWINDOW_WIDTH = 500;
 const GWINDOW_HEIGHT = 300;
 const SQUARE_SIZE = 100;

 function AnimateSquareColor() {
     let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
     let cx = (GWINDOW_WIDTH - SQUARE_SIZE) / 2;
     let cy = (GWINDOW_HEIGHT - SQUARE_SIZE) / 2;
     let square = GRect(cx,cy,SQUARE_SIZE,SQUARE_SIZE);
     square.setFilled(true);
     gw.add(square);

     setTimeout(animateColorForMinute,60000);
     let timer = setInterval(animateColor,1000);
     function animateColor() {
        square.setFillColor(randomColor());
     }
     function animateColorForMinute() {
         clearInterval(timer)
     }
     
 }