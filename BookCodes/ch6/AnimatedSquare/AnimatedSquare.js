/// <reference path="../../../libs/JSGraphics.js" />
/*
 * File: AnimatedSquare.js
 * -----------------------
 * This program animates square so that it moves from 
 * upper left corner of the window to lower right corner.
 */

"use strict";

//constants

const GWINDOW_WIDTH = 500;
const GWINDOW_HEIGHT = 300;
const N_STEPS = 100;
const TIME_STEP = 20;
const SQUARE_SIZE = 50;

function AnimatedSquare() {
    let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
    let dx = (gw.getWidth() - SQUARE_SIZE) / N_STEPS;
    let dy = (gw.getHeight() - SQUARE_SIZE) / N_STEPS;
    let square = GRect(0,0,SQUARE_SIZE,SQUARE_SIZE);
    square.setFilled(true);
    gw.add(square);
    let timer = setInterval(step,TIME_STEP);
    let stepCount = 0;
    function step() {
        square.move(dx,dy);
        stepCount++;
        if(stepCount === N_STEPS) clearInterval(timer);
    }
}