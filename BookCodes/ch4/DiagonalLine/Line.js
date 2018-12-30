/// <reference path="../libs/JSGraphics.js" />
"use strict";

const GWINDOW_WIDTH = 500;
const GWINDOW_HEIGHT = 200;

function Line(){
    let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
    let leftDiagonal = GLine(0,0,GWINDOW_WIDTH,GWINDOW_HEIGHT);
    leftDiagonal.setColor("Blue");
    let rightDiagonal = GLine(0,GWINDOW_HEIGHT,GWINDOW_WIDTH,0);
    gw.add(leftDiagonal);
    gw.add(rightDiagonal);
}