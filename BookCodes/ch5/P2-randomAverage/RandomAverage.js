/*
 * File: RandomAverage.js
 * ----------------------
 * This program generates n random real numbers between 0 and 1 
 * and prints the average of them in console. Statistically the result will be closer to 0.5
 * as the n increases.
 */

 "use strict";

 /* main function to test randomAverage function for different numbers */

 function main() {
     console.log("Average of 1 real random real number between 0 and 1:");
     console.log(randomAverage(1));
     console.log("Average of 10 real random real numbers between 0 and 1:");
     console.log(randomAverage(10));
     console.log("Average of 100 real random real numbers between 0 and 1:");
     console.log(randomAverage(100));
     console.log("Average of 1000 real random real numbers between 0 and 1:");
     console.log(randomAverage(1000));
     console.log("Average of 10000 real random real numbers between 0 and 1:");
     console.log(randomAverage(10000));
     console.log("Average of 100000 real random real numbers between 0 and 1:");
     console.log(randomAverage(100000));
     console.log("Average of 1000000 real random real numbers between 0 and 1:");
     console.log(randomAverage(1000000));
 }

 /* 
  * returns average of n random real numbers
  */

function randomAverage(n) {
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += Math.random();
    }
    return sum / n;
}