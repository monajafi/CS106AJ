/*
 * File: ConsecutiveHeads.js
 * -------------------------
 * This program returns the numbers of coin tosses required to 
 * toss a specified consecutive heads. It'll use randomChance
 * function from RandomLib.js library to simulate coin flipping
 */

 /// <reference path="../../../libs/RandomLib.js" />
 "use strict";

 /* Tests a consecutiveHeads function for different needed 
  * numbers of consecutive heads
  */

function testConsecutiveHeads() {
    console.log("Tosses to get 3 consecutive heads:");
    consecutiveHeads(3);
}

/* prints the tosses appear until the numberNeeded consecutive heads appear */

function consecutiveHeads(numberNeeded) {
    let numberOfHeads = 0;
    let tosses = 0;
    while (numberOfHeads < numberNeeded) {
        let tossResult = flipCoin();
        console.log(tossResult);
        if(tossResult === "Heads"){
            numberOfHeads++;
        }else{
            numberOfHeads = 0;
        }
        tosses++;
    }
    console.log("It took "+ tosses + " tosses to get "+ numberNeeded +" consecutive heads");
}

/* Simmulates coin flipping using a randomChance function and returns the Heads or Tails */

function flipCoin() {
    return (randomChance() ? "Heads" : "Tails");
}