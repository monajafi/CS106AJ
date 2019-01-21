/*
 * File: AlignTest.js
 * ------------------
 * This program tests AlignLib.js library. 
 * The library's three function will be tested by creating multiplication table in console and applying
 * right, left and center alignment on table numbers.
 */

 /// <reference path="../../../libs/AlignLib.js" />

 "use strict";

// constants
const N_ROWS = 10;
const N_COLUMNS = 10;
const COLUMN_WIDTH = 6;
const RIGHT = 1;
const CENTER = 0;
const LEFT = -1;

 function AlignTest() {
     console.log("Right aligned multiplication table:");
     createAlignedTable(RIGHT);
     console.log("\nCenter aligned multiplication table:");
     createAlignedTable(CENTER);
     console.log("\nLeft aligned multiplication table:")
     createAlignedTable(LEFT);
 }

 /* Creates aligned multiplication table with the N_ROWS by N_COLUMNS
  * size using the specified alignDirection parameter 
  */
 
 function createAlignedTable(alignDirection) {
     for(let row = 1;row <= N_ROWS;row++){
         let tableRow = "";
         for(let col = 1;col <= N_COLUMNS;col++){
             tableRow += alignedCell(row,col,alignDirection) + " ";
         }
         console.log(tableRow);
     }
 }

 /* Returns aligned cell number according to alignDirection parameter for the specified row and col */

 function alignedCell(row,col,alignDirection){
    let cell = "";
    switch (alignDirection) {
       case RIGHT:
           cell = alignRight(row * col,COLUMN_WIDTH);
           break;
       case LEFT:
           cell = alignLeft(row * col,COLUMN_WIDTH);
           break;
       case CENTER:
           cell = alignCenter(row * col,COLUMN_WIDTH);
           break;
    }
    return cell;
 }
