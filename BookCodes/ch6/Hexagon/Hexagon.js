/// <reference path="../../../libs/JSGraphics.js" />
/*
 * File: Hexagon.js
 * ----------------
 * This program draws hexagon using addPolarEdge function 
 * from Portable Graphics Library
 */

 "use strict";

 //constants
const GWINDOW_WIDTH = 500;
const GWINDOW_HEIGHT = 300;

function Test(){
    let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
    gw.add(createHexagon(50),gw.getWidth() / 2,gw.getHeight() / 2);
}

function createHexagon(side){
    let hexagon = GPolygon();
    hexagon.addVertex(-side,0);
    let angle = 60;
    for (let i = 0; i < 6; i++) {
        hexagon.addPolarEdge(side,angle);
        angle -= 60;
    }
    return hexagon;
}
