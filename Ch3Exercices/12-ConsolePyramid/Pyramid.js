"use strict";

/* Pyramid test */
function Pyramid(){
    console.log("Pyramid with height of 8\n")
    drawConsolePyramid(8);
    console.log("\n");
    console.log("Pyramid with height of 4\n")
    drawConsolePyramid(4);
    console.log("\n");
    console.log("Pyramid with height of 10\n");
    drawConsolePyramid(10);
}

/*
 * Draws a console pyramid for the given height (h) with the star character
 */

 function drawConsolePyramid(height){
    for(let row = 1;row <= height;row++){
        let line = "";
        // Move the cursor forward to be ready to draw next row
        for(let j = row; j < height; j++){
            line += " ";
        }
        // builds a star line for every row to amount of 2*row-1
        for(let c = 0;c < 2*row-1; c++){
            line += "*"
        }
        console.log(line);
    }
 }