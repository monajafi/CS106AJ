/// <reference path="../libs/JSGraphics.js" />
"use strict"
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

function DrawHome(){
    let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
    let houseX = GWINDOW_WIDTH / 2 - HOUSE_WIDTH / 2;
    let houseY = (GWINDOW_HEIGHT - HOUSE_HEIGHT) / 2 + ROOF_HEIGHT;
    drawFrame(gw,houseX,houseY);
}

function drawFrame(gw,houseX,houseY){
    let cx = GWINDOW_WIDTH / 2;
    let cy = GWINDOW_HEIGHT / 2;
    let bodyRect = GRect(houseX,houseY,HOUSE_WIDTH,HOUSE_HEIGHT - ROOF_HEIGHT);
    let roofTopY = cy - HOUSE_HEIGHT / 2;
    let leftRoof = GLine(houseX,houseY,cx,roofTopY);
    let rightRoof = GLine(cx,roofTopY,cx + HOUSE_WIDTH / 2,houseY);
    gw.add(bodyRect);
    gw.add(leftRoof);
    gw.add(rightRoof);
    drawDoor(gw,houseX,houseY);
    //draw two windows
    let leftWindowX = houseX + WINDOW_INSET_X;
    let leftWindowY = houseY + WINDOW_INSET_Y;
    drawWindow(gw,leftWindowX,leftWindowY);
    let rightWindowX = houseX + HOUSE_WIDTH - (WINDOW_INSET_X + WINDOW_WIDTH);
    drawWindow(gw,rightWindowX,leftWindowY);
}

function drawDoor(gw,houseX,houseY){
    let doorX = (GWINDOW_WIDTH - DOOR_WIDTH) / 2;
    let doorY = houseY + (HOUSE_HEIGHT - ROOF_HEIGHT) - DOOR_HEIGHT;
    let door = GRect(doorX,doorY,DOOR_WIDTH,DOOR_HEIGHT);
    gw.add(door);
    let knobX = doorX + DOOR_WIDTH - (DOORKNOB_INSET_X + DOORKNOB_SIZE);
    let knobY = doorY + DOOR_HEIGHT / 2 - DOORKNOB_SIZE;
    let doorknob = GOval(knobX,knobY,DOORKNOB_SIZE,DOORKNOB_SIZE);
    gw.add(doorknob);
    
}

function drawWindow(gw,windowX,windowY){
    let windowFrame = GRect(windowX,windowY,WINDOW_WIDTH,WINDOW_HEIGHT);
    gw.add(windowFrame);
    let dividerX1 = windowX + WINDOW_WIDTH / 2;
    let dividerY2 = windowY + WINDOW_HEIGHT;
    let divider = GLine(dividerX1,windowY,dividerX1,dividerY2);
    gw.add(divider);
}