/// <reference path="../../../libs/JSGraphics.js" />
/*
 * File: CreateStar.js
 * -------------------
 * Creates a GPolygon creates a five pointed star with the reference point
 * at the center. The size referes to the width of star at its widest width
 */
"use strict";

//constants
const GWINDOW_WIDTH = 500;
const GWINDOW_HEIGHT = 300;

function Test(){
    let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
    gw.add(createStar(100),gw.getWidth() / 2,gw.getHeight() / 2);
}

function createStar(size) {
    let star = GPolygon();
    let dx = size / 2;
    let dy = dx * Math.tan(18 * Math.PI / 180);
    let edge = dx - dy * Math.tan(36 * Math.PI / 180);
    star.addVertex(-dx,-dy);
    let angle = 0;
    for (let i = 0; i < 5; i++) {
        star.addPolarEdge(edge,angle);
        star.addPolarEdge(edge,angle + 72);
        angle -= 72;
    }
    star.setFilled(true);
    star.setFillColor("Yellow");
    return star;
}