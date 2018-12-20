import "turns";
/* File: BeeperLine.k
 * BeeperLine function adds beeper in the row where Karel facing
 * and the row perpendicular to it
 */

function BeeperLine(){
	putBeeperLine();
	turnRight();
	putBeeperLine();
}

/* putBeeperLine function:
 * puts the beepers in the current row up to the front wall
 */

function putBeeperLine(){
	while(frontIsClear()){
		putBeeperInEmptyCorner();
		move();
	}
   putBeeperInEmptyCorner();
}

/* putBeeperInEmptyCorner
 * Puts beeper in the corner if there is no beeper there
 */
function putBeeperInEmptyCorner(){
	if(noBeepersPresent()){
		putBeeper();
	}
}
