/// <reference path="../../../libs/JSGraphics.js" />
/// <reference path="../../../libs/RandomLib.js" />
/*
 * File: GrowingCircles.js
 * -----------------------
 * This program draw random circles that grow to their final size
 */

 "use strict";

 //constants
 const GWINDOW_WIDTH = 500;
 const GWINDOW_HEIGHT = 300;
 const N_CIRCLES = 10;
 const TIME_STEP = 20;
 const MIN_RADIUS = 15;
 const MAX_RADIUS = 50;
 const DELTA_SIZE = 1;

 function GrowingCircles() {
    let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
    let circlesCreated = 0;
    let desiredSize = 0;
    let currentSize = 0;
    let circle = null;
    let timer = setInterval(step,TIME_STEP);

    function createNewCircle() {
        let r = randomReal(MIN_RADIUS,MAX_RADIUS);
        let x = randomReal(r, GWINDOW_WIDTH - r);
        let y = randomReal(r,GWINDOW_HEIGHT - r);
        circle = GOval(x,y,0,0);
        desiredSize = 2 * r;
        circle.setFilled(true);
        circle.setColor(randomColor());
        currentSize = 0;
        return circle;
    }

    function step() {
        if(currentSize < desiredSize){
            currentSize += DELTA_SIZE;
            let x = circle.getX() - DELTA_SIZE / 2;
            let y = circle.getY() - DELTA_SIZE / 2;
            circle.setBounds(x,y,currentSize,currentSize);
        }else if(circlesCreated < N_CIRCLES){
            gw.add(createNewCircle());
            circlesCreated++;
        }else{
            clearInterval(timer);
        }
    }
 }