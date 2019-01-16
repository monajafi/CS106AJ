/*
 * File: Craps.js
 * --------------
 * This program plays a casino game of Craps. At the beginning of the game, the player
 * rolls a pair of dice and computes the total.
 * If the total is 2, 3 or 12 (called "Craps") the player loses.
 * If the total is 7, 11 (called "natural") the player wins.
 * If the total is any other number, that number becomes the point.
 * From here the player keeps rolling the dice until (a) the point come up again, in which case
 * the player wins, or (b) a 7 appears, in which case the player loses.
 * The numbers 2, 3, 11 and 12 no longer have special significance after the first roll.
 */

 /// <reference path="../../libs/RandomLib.js" />

"use strict";
function Craps() {
    let total = rollTwoDice();
    if(total === 2 || total === 3 || total === 12){
        console.log("That's craps, You lose");
    }else if(total === 7 || total === 11){
        console.log("That's natural, You win");
    }else{
        let point = total;
        let rolling = true;
        while (rolling) {
            total = rollTwoDice();
            if(total === point){
                console.log("You made your point, You win");
                running = false;
            }else if(total === 7){
                console.log("That's a 7, You lose");
                running = false;
            }
        }
    }
}

/*
 * Rolls two dices, display their values and returns their sum.
 */

 function rollTwoDice() {
     let d1 = randomInteger(1,6);
     let d2 = randomInteger(1,6);
     let total = d1 + d2;
     console.log("Rolling dice " + d1 + " + " + d2 + " = " + total);
     return total;
 }