/*
 * File: DigitSum.js
 * -----------------
 * This program adds up digits in a positive integer
 * using a recursive method
 */

 "use strict";

 /* Test digitSum for different integers */

 function TestDigitSum() {
     console.log("digitsum(1729)= " + digitSum(1729));
     console.log("digitsum(7)= " + digitSum(7));
     console.log("digitsum(10)= " + digitSum(10));
     console.log("digitsum(10000)= " + digitSum(10000));
     console.log("digitsum(10000000)= " + digitSum(10000000));
     console.log("digitsum(999999999)= " + digitSum(999999999));
 }

 /* adds up digits using recursive algorithm */

 function digitSum(n){
     if (n < 10) {
         return n;
     }else{
         return n % 10 + digitSum(Math.floor(n / 10));
     }
 }