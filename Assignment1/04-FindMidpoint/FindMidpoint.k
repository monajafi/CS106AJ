/*
 * File: FindMidpoint.k
 * --------------------
 * This program teaches Karel to find the midpoint of 1st Street.
 */

import "turns";

/*
 * Finds the midpoint of the current street and marks it with a beeper.
 */

function findMidpoint() {
	markBoundries();
	convergeBoundryBeepers();
}

/*
 * Puts beepers in the westermost and eastermost of the 1st street
 * then moves the karel to the left of eastermost corner facing west
 */

function markBoundries(){
	putBeeper();
	while(frontIsClear()){
		move();
	}
	putBeeper();
	turnAround();
	if(frontIsClear()){
		move();
	}
}

/*
 * Converges two boundry beepers until they reach each other
 * If there is no beeper between two left and right boundries
 * that corner will be the midpoint
 */

function convergeBoundryBeepers(){
	while(noBeepersPresent()){
		move();
		if(beepersPresent()){
			pickBeeper();
			turnAround();
			move();
			putBeeper();
			move();
		}
	}
	pickBeeper();
	turnAround();
   if(frontIsClear()){
		move();
	}
}
