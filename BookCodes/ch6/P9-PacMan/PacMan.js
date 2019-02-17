/// <reference path="../../../libs/JSGraphics.js" />
/*
 * File: PacMan.js
 * ---------------------
 * This program Draws a PacMan character in the left side of
 * graphics window using GArc and moves it to rightward. as
 * PacMan moves the program changes the start and sweep angles
 * so that the mouth appears to open and close.
 */

 //constants
 const GWINDOW_WIDTH = 500;
 const GWINDOW_HEIGHT = 300;
 const N_STEPS = 100;
 const PACMAN_SIZE = 50;
 const TIME_STEP = 20;
 const ANGLE_STEP = 1;

 /* Main program */
 function PacMan() {
    let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
    let cy = (gw.getHeight() - PACMAN_SIZE) / 2;
    let pacman = GArc(0,cy,PACMAN_SIZE,PACMAN_SIZE,45,270);
    pacman.setFilled(true);
    pacman.setFillColor("Yellow");
    gw.add(pacman);
    let timer = setInterval(movePacMan,TIME_STEP);
    let dx = (GWINDOW_WIDTH - PACMAN_SIZE) / N_STEPS;
    let stepCount = 0;
    let angle = 45;
    let sweep = 270;
    let shouldOpen = false;
    function movePacMan() {
        pacman.move(dx,0);
        if(angle === 0){
            shouldOpen = true;
        }
        if(shouldOpen){
            angle += ANGLE_STEP;
            sweep -= 2 * ANGLE_STEP;
        }else{
            angle -= ANGLE_STEP;
            sweep += 2 * ANGLE_STEP;
        }
        pacman.setStartAngle(angle);
        pacman.setSweepAngle(sweep);
        stepCount++;
        if(stepCount === N_STEPS) clearInterval(timer);
    }
    
}
