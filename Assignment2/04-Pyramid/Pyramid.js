/// <reference path="../../libs/JSGraphics.js"/>
"uses strict";
/*
 * File: Pyramid.js
 * ----------------
 * This program draws a pyramid consisting of staggered rows of bricks,
 * each of which has the dimensions BRICK_WIDTH x BRICK_HEIGHT.  The
 * base of the pyramid consists of BRICKS_IN_BASE bricks, with each
 * successive layer one step shorter.  The pyramid is centered within
 * the surrounding graphics window.
 */

/* Constants */

const GWINDOW_WIDTH = 500;
const GWINDOWS_HEIGHT = 300;
const BRICK_WIDTH = 30;
const BRICK_HEIGHT = 15;
const BRICKS_IN_BASE = 15;

/**
 * Program: Pyramid
 * ----------------
 * Creates a graphics window and draws a centered pyramid within it.
 */

function Pyramid() {
   let gw = GWindow(GWINDOW_WIDTH,GWINDOWS_HEIGHT);
   // cx and cy are the lower left corner of pyramid
   let cx = GWINDOW_WIDTH / 2 - BRICKS_IN_BASE * BRICK_WIDTH / 2;
   let cy = GWINDOWS_HEIGHT / 2 + BRICKS_IN_BASE * BRICK_HEIGHT / 2;
   let x = cx;
   for(let row = BRICKS_IN_BASE;row >= 1;row--){
      cy -= BRICK_HEIGHT;
      for(let column = 1;column <= row;column++){
         gw.add(GRect(x,cy,BRICK_WIDTH,BRICK_HEIGHT));
         x += BRICK_WIDTH;
      }
      cx += BRICK_WIDTH / 2;
      x = cx;
   }
}
