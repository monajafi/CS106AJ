/// <reference path="../libs/JSGraphics.js" />
"use strict";
const GWINDOW_WIDTH = 500;
const GWINDOW_HEIGHT = 200;

function Oval(){
    let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
    let rect = GRect(100,50,200,100);
    rect.setFilled(true);
    rect.setColor("Blue");
    gw.add(rect);
    let oval = GOval(100,50,200,100);
    oval.setFilled(true);
    oval.setColor("Red");
    gw.add(oval);
}