/* 
 * File: Cannonbal.js
 * ------------------
 * This program calculates the number of cannonballs in a
 * pyramid of cannonballs using recursive algorithm
 */

"use strict";

function Test() {
    console.log("cannonball(3): " + cannonball(3));
    console.log("cannonball(5): " + cannonball(5));
    console.log("cannonball(6): " + cannonball(6));
    console.log("cannonball(10): " + cannonball(10));
    console.log("cannonball(20): " + cannonball(20));
}

/* 
 * returns number of cannons in a pyramid of cannonballs 
 * using a recurrence relation cannonball(n) = n*n + cannonball(n-1)
 */
function cannonball(n) {
    if( n === 1){
        return 1;
    }else{
        return n * n + cannonball(n - 1);
    }
}