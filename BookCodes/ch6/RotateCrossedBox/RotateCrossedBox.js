/// <reference path="../../../libs/JSGraphics.js" />
/*
 * File: RotateCrossedBox.js
 * -------------------------
 * This program creates crossed box and rotates around its center
 */
 
 "use strict";

 //constants
const GWINDOW_WIDTH = 500;
const GWINDOW_HEIGHT = 300;
const BOX_WIDTH = 200;
const BOX_HEIGHT = 100;
const TIME_STEP = 20;
const N_STEPS = 360;

/*
 * creates crossed box and rotates it
 */

 function RotateCrossedBox() {
     let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
     let box = createCrossedBox(BOX_WIDTH,BOX_HEIGHT);
     gw.add(box,gw.getWidth() / 2,gw.getHeight() / 2);
     let stepsCount = 0;
     let timer = setInterval(step,TIME_STEP);

     function step() {
         if(stepsCount < N_STEPS){
             box.rotate(1);
             stepsCount++;
         }else{
             clearInterval(timer);
         }
     }
 }

 /*
  * Creates a crossed box, which is a compound consisting of a GRect
  * and its two diagonals. The reference point is at the center.
  */

function createCrossedBox(width,height) {
    let compound = GCompound();
    compound.add(GRect(-width / 2,-height / 2,width,height));
    compound.add(GLine(-width / 2,-height / 2,width / 2,height / 2));
    compound.add(GLine(-width / 2,height / 2, width / 2,-height / 2));
    return compound;
}