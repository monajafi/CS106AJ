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
		drawOddRow();
	}
}

function drawOddRow(){
	while(frontIsClear()){
		putBeeper();
		move();
		if(frontIsClear()){
			move();
			if(frontIsBlocked()){
				putBeeper();
				goToNextStreet();
				if(frontIsClear()){
					move();
				}
			}
		}else{
			goToNextStreet();
		}
	}
}

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

function drawSingleColumn(){

}