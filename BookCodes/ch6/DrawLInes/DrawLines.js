/// <reference path="../../../libs/JSGraphics.js" />
/*
 * File: DrawLines.js
 * ------------------
 * This program Draws line along the mouse drag path.
 */

 "use strict";

 //constants
 const GWINDOW_WIDTH = 500;
 const GWINDOW_HEIGHT = 300;
 
 function DrawLines() {

     let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
     gw.addEventListener("mousedown",clickAction);
     gw.addEventListener("drag",dragAction);
     let line = null;
     function clickAction(e) {
         line = GLine(e.getX(),e.getY(),e.getX(),e.getY());
         gw.add(line);
     }

     function dragAction(e) {
        line.setEndPoint(e.getX(),e.getY());
     }
 }

