/// <reference path="../../../libs/JSGraphics.js" />
"use strict";

const GWINDOW_WIDTH = 500;
const GWINDOW_HEIGHT = 200;

function CenteredLabel(){
    let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
    let msg = GLabel("Hello World!");
    msg.setFont("36px 'Lucida Blackletter',Serif");
    let x = (gw.getWidth() - msg.getWidth()) / 2;
    let y = (gw.getHeight() + msg.getAscent()) / 2;
    gw.add(msg,x,y);
}