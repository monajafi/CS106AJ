/*
 * File: CollectNewspaper.k
 * ------------------------
 * The CollectNewspaper program instructs Karel to walk
 * to the door of its house, pick up the newspaper, and
 * return to its initial position.
 */

import "turns";

/*
 * Collects the newspaper from outside the door and then
 * returns to the starting position.  This function works
 * only for the specific world specified in the exercise.
 */

function collectNewspaper() {
	moveToNewspaper();
	pickNewspaper();
	returnHome();
}

/*
 * Moves to the newspaper in front of doorway
 */
function moveToNewspaper(){
	turnRight();
	move();
	turnLeft();
	repeat(3){
		move();
	}
}

/*
 * Picks a newspaper
 */
function pickNewspaper(){
	pickBeeper();
}
/*
 * Returns to it's original position
 */

function returnHome(){
	turnAround();
	repeat(3){
		move();
	}
	turnRight();
	move();
	turnRight();
}


