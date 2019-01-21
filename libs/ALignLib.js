/*
 * File: AlignLib.js
 * -----------------
 * This file contains a simple library to support alignment, including 
 * functions for right, left and center alignment. 
 */

 "use strict";
// constants
const ALIGN_CHARACTER = " "
 /*
  * Takes a value and width and returns a value aligned in right within a field of that size.
  */

function alignRight(value,width) {
    let str = "" + value;
    while (str.length < width) {
        str = ALIGN_CHARACTER + str;
    }
    return str;
}

/*
 * Takes a value and width and return a value aligned in left within a field of that size.
 */

function alignLeft(value,width) {
    let str = "" + value;
    while (str.length < width) {
        str += ALIGN_CHARACTER;
    }
    return str;
}

/*
 * Takes a value and width and return a value center aligned within a field of that size.
 */

function alignCenter(value,width) {
    let str = "" + value;
    while(str.length < width){
        if(width - str.length === 1){
            str += ALIGN_CHARACTER;
        }else{
            str = ALIGN_CHARACTER + str + ALIGN_CHARACTER;
        }
    }
    return str;
}