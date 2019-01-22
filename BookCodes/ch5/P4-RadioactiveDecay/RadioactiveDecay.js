/*
 * File: RadioactiveDecay.js
 * -------------------------
 * This program simulate radioactive decay process. The probability of
 * decaying atoms each year will be calculated using randomChance function
 * from RandomLib library
 */
/// <reference path="../../../libs/RandomLib.js" />
 "use strict";

 /* Tests simulateRadioactiveDecay function for 10000 atoms with
  * a 50 percent chance of decaying in a year
  */

function Test() {
    simulateRadioactiveDecay(10000,0.5);
}

/* 
 * Calculates the number of decaying atoms each year 
 * and logs the ramaining atoms in every year end until 
 * all of the atoms have decayed. n_atoms parameter is 
 * the initial number of atoms and p is the chance of 
 * decaying atoms each year
 */

 function simulateRadioactiveDecay(n_atoms,p){
     let n_atomsInYearEnd = n_atoms;
     let year = 1;
     while (n_atoms > 0) {          
         for (let i = 0; i < n_atomsInYearEnd; i++) {
             if(randomChance(p)){
                 n_atoms--;
             }        
         }
         console.log("There are " + n_atoms + " atoms at the end of year "+ year);
         year++;
         n_atomsInYearEnd = n_atoms;
     }
 }