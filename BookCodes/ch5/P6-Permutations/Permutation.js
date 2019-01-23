/*
 * File: Permutation.js
 * --------------------
 * This program calculates permutations of k elements taken from 
 * a collection of size n without using factorial which quickly gets too large to compute
 */

 "use strict";

 function Test() {
     console.log("Number of ways to select 2 card from 52 card deck: "+ p(52,2));
 }

 /* Calculates the p(n,k) = n! / (n-k)! formula without using factorial 
  * it simplify numerator by expanding like n! = n * n-1 * n-2 * ... * (n-(k-1)) * (n-k)!
  * by dividing that to denominator (n-k)! will be removed. so we simply calculate 
  * n * n-1 * .... * (n-(k-1)).
  */

  function p(n,k) {
      let permutations = 1;
      for (let i = 0; i < k; i++) {
          permutations *= (n - i);
      }
      return permutations;
  }