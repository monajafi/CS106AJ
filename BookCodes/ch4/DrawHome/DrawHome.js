/// <reference path="../libs/JSGraphics.js" />
"use strict";
// Home dimension constants
const GWINDOW_WIDTH = 500;
const GWINDOW_HEIGHT = 300;
const HOUSE_WIDTH = 300;
const HOUSE_HEIGHT = 210  // House height including roof height
const ROOF_HEIGHT = 75;
const DOOR_WIDTH = 60;
const DOOR_HEIGHT = 105;
const DOORKNOB_SIZE = 6;
const DOORKNOB_INSET_X = 5;
const WINDOW_WIDTH = 70;
const WINDOW_HEIGHT = 50;
const WINDOW_INSET_X = 26;
const WINDOW_INSET_Y = 30;
// Main program

function DrawHouse(){
    let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
    let houseX = (GWINDOW_WIDTH - HOUSE_WIDTH) / 2;
    let houseY = (GWINDOW_HEIGHT - HOUSE_HEIGHT) / 2;
    drawFrameHouse(gw,houseX,houseY);
}

/*
 * Draws a simple frame house on the graphics window gw
 * x and y indicate the upper left corner of the bounding box that surrounds 
 * the entire house
 */
function drawFrameHouse(gw,x,y){
    drawFrame(gw,x,y);
    let doorX = x + (HOUSE_WIDTH - DOOR_WIDTH) / 2;
    let doorY = y + HOUSE_HEIGHT - DOOR_HEIGHT ;
    drawDoor(gw,doorX,doorY);
    let leftWindowX = x + WINDOW_INSET_X;
    let rightWindowX = x + HOUSE_WIDTH - WINDOW_INSET_X - WINDOW_WIDTH;
    let windowY = y + ROOF_HEIGHT + WINDOW_INSET_Y;
    drawWindow(gw,leftWindowX,windowY);
    drawWindow(gw,rightWindowX,windowY);
}

/*
 * Draws a frame for house on the graphics window
 * x and y indicate the upper left corner of the bounding box
 */
function drawFrame(gw,x,y){
    let roofY = y + ROOF_HEIGHT;
    gw.add(GRect(x,roofY,HOUSE_WIDTH,HOUSE_HEIGHT - ROOF_HEIGHT));
    gw.add(GLine(x,roofY,x + HOUSE_WIDTH / 2,y));
    gw.add(GLine(x + HOUSE_WIDTH / 2,y,x + HOUSE_WIDTH,roofY));
}

/*
 * Draws a door with doorknob on the graphics window gw
 * the paramters x and y indicate the upper left corner of the door
 */

function drawDoor(gw,x,y){
    gw.add(GRect(x,y,DOOR_WIDTH,DOOR_HEIGHT));
    let doorKnobX = x + DOOR_WIDTH - DOORKNOB_INSET_X - DOORKNOB_SIZE;
    let doorknobY = y + DOOR_HEIGHT / 2;
    gw.add(GOval(doorKnobX,doorknobY,DOORKNOB_SIZE,DOORKNOB_SIZE));
}

/*
 * Draws a rectangular window divided into two panes
 * parameters x and y indicate the upper left corner of the window
 */

function drawWindow(gw,x,y){
    gw.add(GRect(x,y,WINDOW_WIDTH,WINDOW_HEIGHT));
    gw.add(GLine(x + WINDOW_WIDTH / 2,y,x + WINDOW_WIDTH / 2,y + WINDOW_HEIGHT));
}