"use strict";
/*
 * File: Fibonacci.js
 * ------------------
 */

function Fibonacci() {
   fibonacciTable(0, 15);
}

/* returns nth fibonacci number */

function fib(n){
  let f0 = 0, f1 = 1 , fn = n;
  for(let i = 1;i < n;i++){
    fn = f0 + f1;
    f0 = f1;
    f1 = fn;
  }
  return fn;
}

/* prints the fibonacci numbers of numbers between min and max numbers */

function fibonacciTable(min,max){
  for(let i = min;i <= max;i++){
    console.log("fib(" + i + ") = "+ fib(i));
  }
}