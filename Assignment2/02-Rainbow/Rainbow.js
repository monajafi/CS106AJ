/// <reference path="../../libs/JSGraphics.js"/>
"use strict";
/*
 * File: Rainbow.js
 * ----------------
 */

 /* Contstants */
 const GWINDOW_WIDTH = 500;
 const GWINDOW_HEIGHT = 200;
 const OUTER_CIRCLE_RADIUS = 500;
 const ARC_GAP = 12;
 const TOP_INSET = 10;
/*
 * Displays a rainbow on the graphics window.
 */
function Rainbow() {
  // present your implementation of Rainbow(), which draws a rainbow
  // on a cyan backdrop, as specified in the assignment handout.
  let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
  let x = gw.getWidth() / 2;
  let y = TOP_INSET;
  let background = GRect(GWINDOW_WIDTH,GWINDOW_HEIGHT);
  background.setFilled(true);
  background.setColor("Cyan");
  gw.add(background);
  for(let i = 0;i< 8;i++){
    gw.add(createCircle(x,y + i * ARC_GAP, OUTER_CIRCLE_RADIUS - ARC_GAP * i,arcColor(i)));
  }
}

/* Create circle using the specified parameters x , y , r as radius and color */
function createCircle(x,y,r,color){
  let circle = GOval(x - r,y,2 * r,2 * r);
  circle.setFilled(true);
  circle.setColor(color);
  return circle;
}

/* determine color for each arc */

function arcColor(i){
  let color = "";
  switch (i) {
    case 0:
      color = "Red";
      break;
    case 1:
      color = "Orange";
      break;
    case 2:
      color = "Yellow";
      break;
    case 3: 
      color = "Green";
      break;
    case 4:
      color = "Blue";
      break;
    case 5:
      color = "Indigo";
      break;
    case 6:
      color = "Violet";
      break;
    case 7:
      color = "Cyan";
      break;
    default:
      break;
  }
  return color;
}