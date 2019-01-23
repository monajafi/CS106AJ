/*
 * File: PascalTraingle.js
 * -----------------------
 * This program displays Pascal's triangle from row 0 to n
 */

 /// <reference path="../../../libs/AlignLib.js" />
 "use strict";

// constants
const  WIDTH = 8;

 function Test() {
     console.log("The Pascal Triangle with 9 rows:")
     pascalTriangle(9);
 }

 /* 
  * Prints pascal triangle rows. for every row from 0 to n the C(row,col) 
  * is calculated for the col from 0 to row in a nested for loop
  * before start of every row the (n-row)/2 * width whitespaces is printed
  */

 function pascalTriangle(n) {
    
    for (let row = 0; row <= n; row++) {
        // Prints empty space in row start
        let rowStart = "";
        for (let i = 0; i < n - row; i++) {
            rowStart += alignLeft("",WIDTH / 2);
        }
        let pascalRow = "";
        for (let col = 0; col <= row; col++) {
            pascalRow += alignLeft(C(row,col),WIDTH);              
        }
        console.log(rowStart + pascalRow);
     }
 }

 /* Calculates returns the combinations C(n,k) using factorial */

 function C(n,k) {
     return factorial(n) / (factorial(n - k) * factorial(k));
 }

 /* Returns factorial */

 function factorial(n) {
     let fact = 1;
     for (let i = 1; i <= n; i++) {
        fact *= i;         
     }
     return fact;
 }