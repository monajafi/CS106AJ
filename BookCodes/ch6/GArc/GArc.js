/// <reference path="../../../libs/JSGraphics.js" />
/* 
 * File: GArc.js
 * -------------
 * This program demonstrates the GArc functions in review question 20 from chapter 6
 */

 //constants
 const GWINDOW_WIDTH = 500;
 const GWINDOW_HEIGHT = 300;
 const R = 100;

 function GArcTest() {
    let cx = (GWINDOW_WIDTH - 2 * R) / 2;
    let cy = (GWINDOW_HEIGHT - 2 * R)/ 2;
    let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
    let arcA = GArc(cx,cy,2 * R,2 * R,0,-135);
    arcA.setFilled(true);
    arcA.setFillColor("Green");
    let arcB = GArc(cx,cy,2 * R,2 * R,135,-90);
    arcB.setFilled(true);
    arcB.setFillColor("Red");
    let arcC = GArc(cx,cy,2 * R,2 * R,180,-45);
    arcC.setFilled(true);
    arcC.setFillColor("Yellow");
    let arcD = GArc(cx,cy,3 * R, R,-90,180);
    arcD.setFilled(true);
    arcD.setFillColor("Purple");
    //Uncomment to see the arcs separately
    gw.add(arcA);
    // gw.add(arcB);
    // gw.add(arcC);
    // gw.add(arcD);
 }