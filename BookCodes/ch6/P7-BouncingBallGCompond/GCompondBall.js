/// <reference path="../../../libs/JSGraphics.js" />
/*
 * File: GCompoundBall.js
 * ---------------------
 * This program bounces a ball inside the boundaries of the graphics window.
 * ball created using GCompound
 */

 //constants
 const GWINDOW_WIDTH = 500;
 const GWINDOW_HEIGHT = 300;
 const RADIUS = 20;

 /* Main program */

 function GCompoundBall() {
     let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
     let cx = gw.getWidth() / 2;
     let cy = gw.getHeight() / 2;
     let ball = GCompound();
     ball.add(GOval(-RADIUS,-RADIUS,2 * RADIUS,2 * RADIUS));
     gw.add(ball,cx,cy);
     let timer = setInterval(bounceBall,20);
     let dx = 1, dy = 1;

     function bounceBall() {
         let x = ball.getX();
         let y = ball.getY();
         if(isInBoundary(x,y)){
            ball.move(dx,dy);
         }else if(x <= RADIUS || (x + RADIUS) > GWINDOW_WIDTH){
             dx = -dx;
             ball.move(dx,dy);
         }else if(y <= RADIUS || (y + RADIUS) > GWINDOW_HEIGHT){
             dy = -dy;
             ball.move(dx,dy);
         }
     } 
 }

 /* checks whether ball is inside graphics window */

 function isInBoundary(x,y) {
     return (x > RADIUS && (x + RADIUS) <= GWINDOW_WIDTH && y > RADIUS && 
           (y + RADIUS) <= GWINDOW_HEIGHT);
 }