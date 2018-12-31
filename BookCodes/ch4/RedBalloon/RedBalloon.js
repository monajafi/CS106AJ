/// <reference path="../libs/JSGraphics.js" />
"use strict";

const GWINDOW_WIDTH = 500;
const GWINDOW_HEIGHT = 300;
const BALLOON_WIDTH = 140;
const BALLOON_HEIGHT = 160;
const BALLOON_LABEL = "CS is fun!";
const CORD_LENGTH = 100;

function RedBalloon(){
    let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
    let windowCenterX = gw.getWidth()/2;
    let windowCenterY = gw.getHeight()/2;
    // 1- Draws a red balloon centered horizontally 
    let balloon = GOval(BALLOON_WIDTH,BALLOON_HEIGHT);
    let balloonX = windowCenterX - BALLOON_WIDTH / 2;
    let balloonY = (gw.getHeight() - (BALLOON_HEIGHT + CORD_LENGTH)) / 2;
    balloon.setFilled(true);
    balloon.setFillColor("Red");
    gw.add(balloon,balloonX,balloonY);
    //2- Draws a cord in bottom of balloon
    let cordY1 = balloonY + BALLOON_HEIGHT;
    let cordY2 = cordY1 + CORD_LENGTH;
    let cord = GLine(windowCenterX,cordY1,windowCenterX,cordY2);
    gw.add(cord);
    //3- Puts Text inside balloon
    let balloonLabel = GLabel(BALLOON_LABEL);
    balloonLabel.setFont("bold 28px 'Helvetica Neue'");
    balloonLabel.setColor("White");
    let balloonLabelX = windowCenterX - balloonLabel.getWidth() / 2;
    let balloonLabelY = balloonY + (BALLOON_HEIGHT + balloonLabel.getAscent()) / 2;
    gw.add(balloonLabel,balloonLabelX,balloonLabelY);

}