/* ClimbMountain.k
 * Karel climbs stair step mountain with any height and puts beeper 
 * as flag in the peak
 */
import "turns";

function ClimbMountain(){
	moveToWall();
	climbMountain();
	putBeeper();
	move();
	climbDown();
	moveToWall();
}

/* climbMountain
 * Karel starts from the mountain base then climb to top put flag there
 */

function climbMountain(){
	while(frontIsBlocked()){
		turnLeft();
		move();
		turnRight();
		move();
	}
}

/* Climb back down the mountain */

function climbDown(){
	while(rightIsClear()){
		turnRight();
		move();
		turnLeft();
      if(frontIsClear()){
			move();
		}
	}
}

/* Moves the Karel up to the fromt wall */

function moveToWall(){
	while(frontIsClear()){
		move();
	}
}











