/// <reference path="../../../libs/JSGraphics.js" />
/*
 * File: PacMan.js
 * ---------------------
 * This program Draws a subjective contour in which the rectangle 
 * framed by the cutaway circles appears brighter than the background.
 */

 //constants
 const GWINDOW_WIDTH = 500;
 const GWINDOW_HEIGHT = 300;
 const RECT_WIDTH = 200;
 const RECT_HEIGHT = 150;
 const CIRCLE_RADIUS = 40;

 /* Main program */
 function Contour() {
    let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
    let cx = (gw.getWidth() - RECT_WIDTH) / 2;
    let cy = (gw.getHeight() - RECT_HEIGHT) / 2;  
    gw.add(drawGArc(cx - CIRCLE_RADIUS,cy - CIRCLE_RADIUS,0,270)); 
    gw.add(drawGArc(cx + RECT_WIDTH - CIRCLE_RADIUS,cy - CIRCLE_RADIUS,-90,270));
    gw.add(drawGArc(cx + RECT_WIDTH - CIRCLE_RADIUS,cy + RECT_HEIGHT - CIRCLE_RADIUS,180,270));
    gw.add(drawGArc(cx - CIRCLE_RADIUS,cy + RECT_HEIGHT - CIRCLE_RADIUS,90,270));
}

/* Returns GArc with the specified coordinates and start and sweep angles */

function drawGArc(x,y,angle,sweep) {
    let gArc = GArc(x,y,2 * CIRCLE_RADIUS,2 * CIRCLE_RADIUS,angle,sweep);
    gArc.setFilled(true);
    return gArc;
}