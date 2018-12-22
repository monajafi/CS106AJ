/*
 * File: Checkerboard.k
 * --------------------
 * This program teaches Karel to draws a checkerboard.
 */

import "turns";

/*
 * Draws a checkerboard pattern in beepers on the current world.
 */

function checkerboard() {
	while(frontIsClear()){
		drawCheckerRows();
	}
   drawSingleAvenue();
}

/*
 * Draws a checkeboard on every street, Checks for odd sized avenue then sends the
 * Karel to the next street.
 */

function drawCheckerRows(){
	while(frontIsClear()){
		putBeeper();
		move();
		if(frontIsClear()){
			move();
			checkForOddSizeCheckerboard();
		}else{
			goToNextStreet();
		}
	}
}

/*
 * Checks for odd sized avenues, Karel starts from 1st avenue and moves two step at every
 * iteration so it'll be blocked by wall in the last second move in odd avenues.
 * puts beeper in the last corner there, then sends Karel to next street 
 * also moves karel one corner forward in the case of even streets which will be filled in the next iteration
 */

function checkForOddSizeCheckerboard(){
	if(frontIsBlocked()){
		putBeeper();
		goToNextStreet();
		if(frontIsClear()){
			move();
		}
	}
}
/*
 * Sends Karel to the next street and reverses it's direction
 * if it's not blocked by top wall
 */

function goToNextStreet(){
	if(facingEast()){
		turnLeft();
		if(frontIsClear()){
			move();
			turnLeft();
		}
	}else if(facingWest()){
		turnRight();
		if(frontIsClear()){
			move();
			turnRight();
		}
	}
}

/*
 * Draw a single avenue checkerboard
 */

function drawSingleAvenue(){
	if(facingEast()){
		turnLeft();
		drawCheckerRows();
	}
}
	


