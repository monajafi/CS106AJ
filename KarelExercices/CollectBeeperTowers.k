/* CollectBeeperTowers
 * --------------------------------
 * This program collects all beepers from a series of towers, deposits them on 
 * the eastermost corner of 1'st street, and then returns home
 */

import "turns";

function CollectBeeperTowers(){
	collectAllBeepers();
	dropAllBeepers();
	returnHome();	
}

/*
 * Collects beepers from every tower along the 1'st street
 */
function collectAllBeepers(){
	while(frontIsClear()){
		collectTower();
		move();
	}
	collectTower();
}

/*
 * Collects beepers from a single tower
 */
function collectTower(){
		turnLeft();
		while(beepersPresent()){
			pickBeeper();
			if(frontIsClear()){
				move();
			}
		}
		turnAround();
		moveToWall();
		turnLeft();
}

/*
 * Drop all beepers to the last corner of 1'st street
 */
function dropAllBeepers(){
	while(beepersInBag()){
		putBeeper();
	}
}

/*
 * Returns Karel to its original position in 1'st street
 */
function returnHome(){
	turnAround();
	moveToWall();
	turnAround();
}

/*
 * Movers the Karel to the facing wall
 */
function moveToWall(){
	while(frontIsClear()){
		move();
	}
}
















