/*
 * File: RandomLib.js
 * ------------------
 * This file contains a simple library to support randomness
 */
  
 /*
  * Returns a random integer in the range low to high, inclusive
  */

 function randomInteger(low,high){
      return low + Math.floor((high - low + 1) * Math.random());
 }

/*
 * Returns a random real number in the half-open interval [low,high)
 */

 function randomReal(low,high){
       return low + (high - low) * Math.random();
 }

/*
 * returns true with probability p, missing argument defaults to 0.5
 */

 function randomChance(p = 0.5){
     return Math.random() < p;
 }

 /*
  * Returns a random opaque color expressed as a string consisting of "#" 
  * followed by six random hexadicimal digits
  */
 
  function randomColor() {
      let str = "#";
      for (let i = 0; i < 6; i++) {
        let d = randomInteger(0,15);
        switch (d) {
            case 0: case 1: case 2: case 3: case 4: case 5:
            case 6: case 7: case 8: case 9: str += d; break;
            case 10: str += "A"; break;
            case 11: str += "B"; break;
            case 12: str += "C"; break;
            case 13: str += "D"; break;
            case 14: str += "E"; break;
            case 15: str += "F"; break;        
        }
      }
      return str;
  }