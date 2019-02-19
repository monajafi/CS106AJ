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
    // upper curve radius is equal to TOTAL_WIDTH according to the attached trigonemetric figure
    let upper = drawGArc(cx,cy,TOTAL_WIDTH,true,"Orange");
    upper.setColor("Transparent");
    gw.add(upper);
    let lower = drawGArc(cx + WUDNT_HEIGHT,cy + WUDNT_HEIGHT,TOTAL_WIDTH - WUDNT_HEIGHT,true,"White");
    lower.setColor("White");
    gw.add(lower);
  //  gw.add(drawGArc(cx + WUDNT_HEIGHT,cy + WUDNT_HEIGHT,TOTAL_WIDTH - WUDNT_HEIGHT,true,"White"));
    let gap = WUDNT_HEIGHT + TOTAL_HEIGHT - 2 * ((TOTAL_WIDTH - WUDNT_HEIGHT) / Math.tan((90 + WUDNT_ANGLE) * Math.PI / (2 * 180)) + WUDNT_HEIGHT);
    gw.add(drawGArc(cx,cy + gap,TOTAL_WIDTH,true,true,"Orange"));
    gw.add(drawGArc(cx + WUDNT_HEIGHT,cy + WUDNT_HEIGHT + gap,TOTAL_WIDTH - WUDNT_HEIGHT,true,false,"White"));
    gw.add(drawGArc(cx + WUDNT_HEIGHT,cy + WUDNT_HEIGHT + gap,TOTAL_WIDTH - WUDNT_HEIGHT,false,true,"White"));
}

/* 
 * Returns GArc with the specified coordinates, radius and color the sweep angle is calculated using
 * start angle to make curve symmetric.
 */

function drawGArc(x,y,r,filled,color) {
    let gArc = GArc(x,y,2 * r,2 * r,WUDNT_ANGLE,180 - 2 * WUDNT_ANGLE);
    gArc.setFilled(filled);
    if(filled){
        gArc.setFillColor(color);
    }
    return gArc;
}