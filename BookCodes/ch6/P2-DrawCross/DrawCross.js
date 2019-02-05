/// <reference path="../../../libs/JSGraphics.js" />
/*
 * File: DrawCross.js
 * ------------------
 * This program draws cross sign everywhere user clicks the mouse
 */

 "use strict";

 //constants
 const GWINDOW_WIDTH = 500;
 const GWINDOW_HEIGHT = 300;
 const CROSS_WIDTH = 10;
 const CROSS_HEIGHT = 10;

 function DrawCross() {
     let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
     gw.addEventListener("click",clickAction);

     function clickAction(e) {
         let x = e.getX();
         let y = e.getY();
         // Draw cross without GCompound
        //  let leftLine = GLine(x - CROSS_WIDTH / 2,y - CROSS_HEIGHT / 2,x + CROSS_WIDTH / 2, y + CROSS_HEIGHT / 2);
        //  let rightLine = GLine(x - CROSS_WIDTH / 2,y + CROSS_HEIGHT / 2,x + CROSS_WIDTH / 2, y - CROSS_HEIGHT / 2);
        //  gw.add(leftLine);
        //  gw.add(rightLine);
         // Draws with GCompound
         let cross = GCompound();
         cross.add(GLine(-CROSS_WIDTH / 2,-CROSS_HEIGHT / 2,CROSS_WIDTH / 2,CROSS_HEIGHT / 2));
         cross.add(GLine(-CROSS_WIDTH / 2,CROSS_HEIGHT / 2,CROSS_WIDTH / 2,-CROSS_HEIGHT / 2));
         gw.add(cross,x,y);
     }
 }