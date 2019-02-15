/// <reference path="../../../libs/JSGraphics.js" />
/*
 * File: PumpkinPie.js
 * ---------------------
 * This program Draws a N_PIECES piece pumpkin pie and lets user
 * remove the pieces by clicking on them
 */

 //constants
 const GWINDOW_WIDTH = 500;
 const GWINDOW_HEIGHT = 300;
 const N_PIECES = 6;
 const PUMPKIN_SIZE = 200;

 /* Main program */
 function PumpkinPie() {
    let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
    let cx = (gw.getWidth() - PUMPKIN_SIZE) / 2;
    let cy = (gw.getHeight() - PUMPKIN_SIZE) / 2;
    let angle = 0;
    let sweep = 360 / N_PIECES;
    for (let i = 0; i < N_PIECES; i++) {
        let pie = GArc(cx,cy,PUMPKIN_SIZE,PUMPKIN_SIZE,angle,sweep);
        pie.setFilled(true);
        pie.setFillColor("Orange");
        gw.add(pie);
        angle += sweep;
    }
    gw.addEventListener("click",clickAction);

    function clickAction(e) {
        let pie = gw.getElementAt(e.getX(),e.getY());
        gw.remove(pie);
    }
}
