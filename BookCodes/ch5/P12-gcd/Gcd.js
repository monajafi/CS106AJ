/*
 * File: Gcd.js
 * ------------
 * Computes greatest common divisor of x and y
 * recursively using Euclid's algorithm.
 */

 "use strict";

 /* Tests gcd(x,y) for some values of x and y */

 function TestGcd() {
     console.log("gcd(10,2)= " + gcd(10,2));
     console.log("gcd(100005,100000)= " + gcd(100005,100000));
     console.log("gcd(51,15)= " + gcd(51,15));
 }

 /*
  * Calculates greatest common divisor using the following 
  * recurrence relation: gcd(x,y) = gcd(y, x % y).
  */

  function gcd(x,y) {
      if(y === 0){
          return x;
      }else{
          return gcd(y,x % y);
      }
  }