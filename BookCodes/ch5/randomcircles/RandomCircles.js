/// <reference path="../../../libs/JSGraphics.js" />
/// <reference path="../../../libs/RandomLib.js" />

/*
 * File RandomCircles.js
 * ---------------------
 * This program draws a set of 10 circles with different colors, positions and sizes.
 * Each circle has a randomly chosen color, randomly chosen radius within specified range.
 * and a randomly chosen position subject to the condition that the circle must fit inside 
 * graphics window.
 */
 "use strict";

 // Constants
 
 const WINDOW_WIDTH = 500;
 const WINDOW_HEIGHT = 300;
 const N_CIRCLES = 10;
 const MIN_RADIUS = 15;
 const MAX_RADIUS = 50;

 /* main program */

 function RandomCircles() {
     let gw = GWindow(WINDOW_WIDTH,WINDOW_HEIGHT);
     for (let i = 0; i < 10; i++) {
        gw.add(createRandomCircle());         
     }
 }

 /*
  * creates a randomly generated circle, the radius is randomly chosen 
  * between MIN_RADIUS and MAX_RADIUS, the location is chosen so that
  * the circle fits in the window. and the circle is given a random color.
  */

  function createRandomCircle() {
      let radius = randomReal(MIN_RADIUS,MAX_RADIUS);
      let x = randomReal(0,WINDOW_WIDTH - 2 * radius);
      let y = randomReal(0,WINDOW_HEIGHT - 2 * radius);
      let circle = GOval(x,y,2*radius,2*radius);
      circle.setFilled(true);
      circle.setColor(randomColor());
      return circle;

  }