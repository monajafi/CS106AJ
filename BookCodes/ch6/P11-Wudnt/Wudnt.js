/// <reference path="../../../libs/JSGraphics.js" />
/*
 * File: PacMan.js
 * ---------------------
 * This program Draws a Wudnt illusion. In this illusion the lower curve looks
 * longer the upper curve.
 */

 //constants

 const GWINDOW_WIDTH = 500;
 const GWINDOW_HEIGHT = 300;
 const TOTAL_WIDTH = 150;
 const TOTAL_HEIGHT = 200;
 const WUDNT_HEIGHT = 60;
 const WUDNT_ANGLE = 50;

 /* Main program */

 function Wudnt() {
    let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
    let cx = (gw.getWidth() - 2 * TOTAL_WIDTH) / 2;
    let cy = (gw.getHeight() - TOTAL_HEIGHT) / 2;  
    let upperRadius = TOTAL_WIDTH / (2 * Math.cos(WUDNT_ANGLE * Math.PI / 180));
    drawGArc(gw,cx,cy,upperRadius);
    let gap =  20 + WUDNT_HEIGHT + (upperRadius - WUDNT_HEIGHT)*(1 - Math.cos((90 - WUDNT_ANGLE) * Math.PI / 180));
    drawGArc(gw,cx,cy + gap,upperRadius);
}

/* 
 * Returns GArc with the specified coordinates, radius and color the sweep angle is calculated using
 * start angle to make curve symmetric.
 */

function drawGArc(gw,x,y,r) {
    let gArc = GArc(x,y,2 * r,2 * r,WUDNT_ANGLE,180 - 2 * WUDNT_ANGLE);
    gArc.setFilled(true);
    gArc.setFillColor("Orange");
    gw.add(gArc);
    let circle = GOval(x + WUDNT_HEIGHT,y + WUDNT_HEIGHT,2 * (r - WUDNT_HEIGHT),2* (r - WUDNT_HEIGHT));
    circle.setFilled(true);
    circle.setFillColor("White");
    circle.setColor("Transparent");
    gw.add(circle);
    gw.add(GArc(x + WUDNT_HEIGHT,y + WUDNT_HEIGHT,2*(r - WUDNT_HEIGHT),2 * (r - WUDNT_HEIGHT),WUDNT_ANGLE,180 - 2 * WUDNT_ANGLE));
}