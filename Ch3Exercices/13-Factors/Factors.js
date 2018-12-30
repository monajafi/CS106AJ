"use strict";

/* Some Tests for printFactor function */
function Factors(){
    console.log("Factors for 60:");
    console.log(printFactors(60));
    console.log("\n");
    console.log("Factors for 1024:");
    console.log(printFactors(1024));
    console.log("\n");
    console.log("Factors for 1789:");
    console.log(printFactors(1789));
    console.log("\n");
    console.log("Factors for 10000:");
    console.log(printFactors(10000));
}

/*
 * prints the prime factors of a given number (n)
 * Algorithm : Divides n to a successive numbers starting from 2
 * while the remainder of these divisions are zero those divisors will
 * be included in factor set and the number will be replaced by quotient. 
 * As soon as remainder is not zero, the latest divisor will be incremented. 
 * if the quotient is zero, function will return factor set.
 */
 
function printFactors(n){
    let factor = 2;
    let factorSet = n + " = ";
    let separator = "";
    while(n > 1){
        while( n % factor === 0){
            factorSet += separator + factor;
            separator = " * ";
            n = Math.floor(n / factor);
        }
        factor++;
    }
    return factorSet;
}