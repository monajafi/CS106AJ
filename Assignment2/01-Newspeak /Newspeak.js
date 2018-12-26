/*
 * File: Newspeak.js
 * -----------------
 * This file contains functions to implement several of the standard
 * prefixes used in the Newspeak language described in George Orwell's
 * novel 1984.
 */

/* Simple test program */

function Newspeak() {
   console.log("negate(\"cold\") -> " + negate("cold"));
   console.log("intensify(\"cold\") -> " + intensify("cold"));
   console.log("reinforce(\"decker\") -> " + reinforce("decker"))
   console.log("reinforce(negate(\"cool\")) -> " +
                reinforce(negate("cool")));
   console.log("reinforce(intensify(\"cool\")) -> " +
                reinforce(intensify("cool")));
   console.log("reinforce(intensify(negate(\"good\"))) -> " +
                reinforce(intensify(negate("good"))));
}

/*
 * Negates a word by adding the prefix "un".  For example, negate("good")
 * returns "ungood".
 */
function negate(word) {
    return "un" + word;
}

/*
 * Strengthens an adjective by adding the prefix "plus".  For example,
 * intensify("good") returns "plusgood".
 */
function intensify(word) {
    return "plus" + word;
}

/*
 * Reinforces an already intensified adjective by adding the prefix
 * "double".  This function is usually used in conjunction with intensify,
 * as in reinforce(intensify("good")), which returns "doubleplusgood".
 */
function reinforce(word) {
    return "double" + word;
}
