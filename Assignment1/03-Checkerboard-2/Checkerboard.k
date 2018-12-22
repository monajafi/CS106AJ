/*
 * File: Checkerboard.k
 * --------------------
 * This program teaches Karel to draws a checkerboard.
 */

import "turns";

/*
 * Another Algorithm for drawing checkerboard
 */

function checkerboard() {
	while(frontIsClear()){
		drawCheckerboardRow();
		goToNextStreet();
		shouldPutBeeper();
		if(frontIsClear()){
			changeDirection();
		} 
	}
	changeDirection();
	drawCheckerboardRow();

}

/*
 * Change Karel direction after being sent to upper street
 */

function changeDirection(){
	if(leftIsClear()){
			turnLeft();
			if(beepersPresent()){
				move();
				move();
			}else{
				move();
			}

		}else if(rightIsClear()){
			turnRight();
			if(beepersPresent()){
				move();
				move();
			}else{
				move();
			}
	} 
}

/*
 * Draws a rows of checkerboard
 */

function drawCheckerboardRow(){
	while(frontIsClear()){
      if(noBeepersPresent()){
			putBeeper();
		}
		if(frontIsClear()){
			move();
		}
		if(frontIsClear()){
			move();
		}
	}
	shouldPutBeeper();

}

/*
 * Sends the Karel to the next street
 */

function goToNextStreet(){
	if(facingEast()){
		if(leftIsClear()){
			turnLeft();
			move();
		}
	}else if(facingWest()){
		if(rightIsClear()){
			turnRight();
			move();
		}
	}
}

/*
 * Determine whether to put a beeper in the last and first corner of every street
 * or not by moving karel to previous corner to check whether there is a beeper
 * then returns true if there is not beeper. 
 */

function shouldPutBeeper(){
	backup();
	if(noBeepersPresent()){
		move();
		putBeeper();
	}else{
		move();
	}
	
} 


/*
 * Moves Karel on corner backward if there is no wall behind
 */

function backup(){
	turnAround();
   if(frontIsClear()){
		move();
	}
	turnAround();
}




