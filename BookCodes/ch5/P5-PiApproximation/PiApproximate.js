/*
 * File: PiApproximate.js
 * ----------------------
 * This program approximate the value of Pi using throwing a 
 * sqequence of darts on a dartboard consists of a circle painted
 * on a square backdrop. the ratio of the number of darts landing inside circle
 * to the total number of darts hitting square should be equal to the ratio between the two areas.
 * the ratio of two areas is PI/4. 
 */
/// <reference path="../../../libs/RandomLib.js" />
"use strict";

//constants
const N_DARTS = 10000;

 function ApproximatePi() {
     let n_insideCircle = 0;
     let n_insideSquare = 0;
     for (let i = 0;i < N_DARTS; i++) {
        let x = randomReal(-1,1);
        let y = randomReal(-1,1);
        if((x * x + y * y) < 1){
            n_insideCircle++;
        }
     }
     console.log("The PI approximation by throwing " + N_DARTS + " darts: "+ 4 * n_insideCircle / N_DARTS);
 }