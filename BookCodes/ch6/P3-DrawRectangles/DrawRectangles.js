/// <reference path="../../../libs/JSGraphics.js" />
/*
 * File: DrawRectangles.js
 * -----------------------
 * This program lets user add rectangles shape by pressing and dragging
 * mouse
 */

 "use strict";

 //constants

 const GWINDOW_WIDTH = 500;
 const GWINDOW_HEIGHT = 300;

 /* Main program */

 function DrawRectangles() {
     let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
     gw.addEventListener("mousedown",mousedownAction);
     gw.addEventListener("drag",dragAction); 
     let rect = null;
     let originX = 0;
     let originY = 0;

     function mousedownAction(e) {
         originX = e.getX();
         originY = e.getY();
         rect = GRect(originX,originY,1,1);
         rect.setFilled(true);
         gw.add(rect);
     }

     function dragAction(e) {
         rect.setBounds(originX,originY,e.getX() - originX,e.getY() - originY);
     }
 }


