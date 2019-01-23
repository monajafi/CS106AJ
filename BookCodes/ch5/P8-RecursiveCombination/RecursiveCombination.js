/*
 * File: RecursiveCombination.js
 * -----------------------------
 * This program implements combination recursively
 * using the following recurrence relation:
 * C(n,k) = C(n-1,k-1) + C(n-1,k)
 */

 /* Tests recursive implementation function */

 function Test() {
     console.log("C(5,2) = " + C(5,2));
     console.log("C(8,2) = " + C(8,2));
     console.log("C(9,3) = " + C(9,3));
     console.log("C(9,4) = " + C(9,4));
     console.log("C(30,20) = " + C(30,20));
 }

 /* returns combination using the recursive algorithm */

 function C(n,k) {
     if (k === 0 || n === k) {
         return 1;
     }else{
         return C(n - 1,k - 1) + C(n - 1,k);
     }
 }
