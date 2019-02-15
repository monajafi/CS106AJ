/// <reference path="../../../libs/JSGraphics.js" />
/*
 * File: BouncingBall.js
 * ---------------------
 * This program bounces a ball inside the boundaries of the graphics window
 */

 //constants
 const GWINDOW_WIDTH = 500;
 const GWINDOW_HEIGHT = 300;
 const BALL_SIZE = 40;

 /* Main program */

 function BouncingBall() {
     let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
     let cx = (GWINDOW_WIDTH - BALL_SIZE) / 2;
     let cy = (GWINDOW_HEIGHT - BALL_SIZE) / 2;
     let ball = GOval(cx,cy,BALL_SIZE,BALL_SIZE);
     gw.add(ball);
     let timer = setInterval(bounceBall,20);
     let dx = 1, dy = 1;

     function bounceBall() {
         let x = ball.getX();
         let y = ball.getY();
         if(isInBoundary(x,y)){
            ball.move(dx,dy);
         }else if(x <= 0 || (x + BALL_SIZE) > GWINDOW_WIDTH){
             dx = -dx;
             ball.move(dx,dy);
         }else if(y <= 0 || (y + BALL_SIZE) > GWINDOW_HEIGHT){
             dy = -dy;
             ball.move(dx,dy);
         }
     }
 }

 /* checks whether ball is inside graphics window */

 function isInBoundary(x,y) {
     return (x > 0 && x <= GWINDOW_WIDTH && (x + BALL_SIZE) <= GWINDOW_WIDTH && y > 0 && 
            y <= GWINDOW_HEIGHT && (y + BALL_SIZE) <= GWINDOW_HEIGHT);
 }