/* FillAllPtholes.k
 * ---------------------------------------------------
 * This program fills all type of potholes distributed unevenly
 */
import "turns";
function FillPotHoles(){
	while(frontIsClear()){
		fillHole();
	   move();
	}
	fillHole();
}

/* 
 * Fills the hole underneath if some exists, Karel should face east
 * above pothole and function returs 
*/

function fillHole(){
  if(rightIsClear()){
		turnRight();
		move();
		if(noBeepersPresent()){
			putBeeper();
		}
		turnAround();
		move();
		turnRight();
  }
		
}
