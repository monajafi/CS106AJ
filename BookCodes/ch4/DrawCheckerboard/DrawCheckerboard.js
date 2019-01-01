/// <reference path="../libs/JSGraphics.js"/>
"use strict";
/* Checherboard constants */

const GWINDOW_WIDTH = 600;
const GWINDOW_HEIGHT = 500;
const N_COLUMNS = 8;
const N_ROWS = 8;
const SQUARE_SIZE = 35;

/* 
 * Draws N_Colmn by N_Row checherboard in the center of graphical window gw
 * x and y indicates the upper left corner of bounding box surrounding checkerboard
 */

 function DrawCheckerboard(){
     let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
     let x = (GWINDOW_WIDTH - (N_COLUMNS * SQUARE_SIZE)) / 2;
     let y = (GWINDOW_HEIGHT - (N_ROWS * SQUARE_SIZE)) / 2;
     for(let row=0;row < N_ROWS;row++){
         for(let column = 0;column < N_COLUMNS;column++){
             let square = GRect(x + column * SQUARE_SIZE,y + row * SQUARE_SIZE,SQUARE_SIZE,SQUARE_SIZE);
             square.setFilled((row + column) % 2 !== 0);
             gw.add(square);
         }
     }
 }