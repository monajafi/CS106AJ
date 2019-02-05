/// <reference path="../../../libs/JSGraphics.js" />
/*
 * File: Plot.js
 * -------------
 * This program plots the function f on the graphics window
 * by creating small GLine segments and adding them to the 
 * graphics window
 */

 "use strict";

 //constants
const GWINDOW_WIDTH = 500;
const GWINDOW_HEIGHT = 300;
const STEP = 0.02;

 function Test(){
     let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
     console.log("Sin(x) plot for the x = (-2𝜋,2𝜋)");
     plot(gw,Math.sin,-2 * Math.PI,2* Math.PI,-1,1);
    //  console.log("Sqrt(x) plot for the x = (0,4)");
    //  plot(gw,Math.sqrt,0,4,0,2);
    // console.log("x*x*x - 2*x + 1 plot for the x = (-2,2)");
    // plot(gw,function quadratic(x){ return (x * x * x - 2 * x + 1);},-2,2,-3,5);
    
 }

 /* 
  * Plots function f in the gw graphics window. the values conveted
  * to window pixels using xScale and yScale and javascript coordinate 
  * system converted to Cartesian by subtracting the function output
  * from window height. To avoid negative y values in graphic window
  * the yMin subtracted from f(x)
  */

 function plot(gw,f,xMin,xMax,yMin,yMax){
     let xScale = gw.getWidth() / Math.abs(xMax - xMin);
     let yScale = gw.getHeight() / Math.abs(yMax - yMin);
     for(let x = xMin;x < xMax;x += STEP){
         let x0 = (x - xMin) * xScale;
         let x1 = (x + STEP - xMin) * xScale;
         let y0 = gw.getHeight() - (f(x) - yMin) * yScale;
         let y1 = gw.getHeight() - (f(x + STEP) - yMin) * yScale;
         gw.add(GLine(x0,y0,x1,y1));
     }
 }
