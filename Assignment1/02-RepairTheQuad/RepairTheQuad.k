/*
 * File: RepairTheQuad.k
 * ---------------------
 * This program teaches Karel to repair the Stanford Quad following
 * an earthquake.
 */

import "turns";

/*
 * Repairs a set of columns damaged by an earthquake.  The columns are
 * always four spaces apart, but they can be of any height and may
 * contain stones that are still in place.
 */

function repairTheQuad() {
	while(frontIsClear()){	
		repairColumn();
		moveToNextColumn();
	}
	repairColumn();
}

/* 
 * Repairs a single column and return to the 1'st street facing east 
 */

function repairColumn(){
	turnLeft();
	while(frontIsClear()){
		putBeeperInEmptyCorner();
		move();
	}
	putBeeperInEmptyCorner();
	turnAround();
	moveToWall();
	turnLeft();
}

/*
 * Put beeper if there is not beeper in the corner
 */

function putBeeperInEmptyCorner(){
	if(noBeepersPresent()){
			putBeeper();
	}
}

/* 
 * Moves Karel to the next column
 */

function moveToNextColumn(){
	repeat(4){
		move();
	}
}

/*
 * Moves karel up to the nearest wall in front
 */

function moveToWall(){
	while(frontIsClear()){
		move();
	}
}



  
