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
 const TOTAL_HEIGHT = 230;
 const WUDNT_HEIGHT = 60;
 const WUDNT_ANGLE = 50;

 /* Main program */

 function Wudnt() {
    let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
    let cx = (gw.getWidth() - 2 * TOTAL_WIDTH) / 2;
    let cy = (gw.getHeight() - TOTAL_HEIGHT) / 2;  
    let upperRadius = TOTAL_WIDTH / (2 * Math.cos(WUDNT_ANGLE * Math.PI / 180));
    gw.add(drawGArc(cx,cy,upperRadius,"Orange"));
    gw.add(drawGArc(cx + WUDNT_HEIGHT,cy + WUDNT_HEIGHT,upperRadius - WUDNT_HEIGHT,"White"));
    let circle = GOval(cx + WUDNT_HEIGHT,cy + WUDNT_HEIGHT,2 * (upperRadius - WUDNT_HEIGHT),2* (upperRadius - WUDNT_HEIGHT));
    circle.setFilled(true);
    circle.setFillColor("White");
    circle.setColor("Transparent");
    gw.add(circle);
    let gap = WUDNT_HEIGHT + TOTAL_HEIGHT - 2 * ((TOTAL_WIDTH - WUDNT_HEIGHT) / Math.tan((90 + WUDNT_ANGLE) * Math.PI / (2 * 180)) + WUDNT_HEIGHT);
    gw.add(drawGArc(cx,cy + gap,upperRadius,"Orange"));
    gw.add(drawGArc(cx + WUDNT_HEIGHT,cy + WUDNT_HEIGHT + gap,upperRadius - WUDNT_HEIGHT,"White"));
}

/* 
 * Returns GArc with the specified coordinates, radius and color the sweep angle is calculated using
 * start angle to make curve symmetric.
 */

function drawGArc(x,y,r,color,borderColor) {
    let gArc = GArc(x,y,2 * r,2 * r,WUDNT_ANGLE,180 - 2 * WUDNT_ANGLE);
    gArc.setFilled(true);
    gArc.setFillColor(color);
    return gArc;
}