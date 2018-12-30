/// <reference path="../libs/JSGraphics.js" />
"use strict";

const GWINDOW_WIDTH = 500;
const GWINDOW_HEIGHT = 200;

function CenteredLabel(){
    let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
    let msg = GLabel("Hello World!");
    msg.setFont("24px 'Times New Roman'");
    gw.add(msg,10,10);
    let rect = GRect(0,0,100,100);
    gw.add(rect,10,10);
}