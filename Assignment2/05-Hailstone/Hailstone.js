/*
 * File: Hailstone.js
 * ------------------
 * This program displays the Hailstone sequence for a number.
 */

/* Main program to test the hailstone function for 17 */

function Hailstone() {
	hailstone(17);
}

function hailstone(n) {
	let count = 0;
	while (n > 1) {
		if (n % 2 === 0) {
			console.log(n + " is even, so I take half: "+ (n / 2));
			n = n / 2;
		}else{
			console.log(n + " is odd, so I make 3n+1: "+ (3 * n + 1));
			n = 3 * n + 1;
		}
		count++;
	}
	console.log("The process took " + count + " steps to reach 1.");
}
