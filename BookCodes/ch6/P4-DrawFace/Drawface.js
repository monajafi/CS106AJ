/// <reference path="../../../libs/JSGraphics.js" />
/*
 * File: DrawFace.js
 * -----------------
 * This program draw Face and adds mousemove event
 * so that the pupils in the eyes follow the cursor position
 */

 "use strict";

 //constants
 const GWINDOW_WIDTH = 500;
 const GWINDOW_HEIGHT = 300;
 const FACE_WIDTH = 150;
 const FACE_HEIGHT = 200;
 const EYE_WIDTH = FACE_WIDTH / 6;
 const EYE_HEIGHT = FACE_HEIGHT / 6;
 const NOSE_SIZE = EYE_WIDTH;
 const PUPIL_SIZE = EYE_WIDTH / 3;
 const MOUTH_WIDTH = FACE_WIDTH / 2;
 const MOUTH_HEIGHT = 10;
 
 /* Main program */

function DrawFace() {
    let gw = GWindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
    let cx = (gw.getWidth() - FACE_WIDTH) / 2;
    let cy = (gw.getHeight() - FACE_HEIGHT) / 2;
    // 1- Draws empty face
    gw.add(GOval(cx,cy,FACE_WIDTH,FACE_HEIGHT));
    // 2- Draw Eyes
    let leftEye_X = cx +  EYE_WIDTH;
    let leftEye_Y = cy +  EYE_HEIGHT;
    let leftEye = GOval(leftEye_X,leftEye_Y,EYE_WIDTH,EYE_HEIGHT);
    gw.add(leftEye);
    let rightEye_X = leftEye_X + 3 * EYE_WIDTH;
    gw.add(GOval(rightEye_X,leftEye_Y,EYE_WIDTH,EYE_HEIGHT));
    // 3- Draw Pupils
    let leftPupil = GOval(leftEye_X + (EYE_WIDTH - PUPIL_SIZE) / 2,leftEye_Y + (EYE_HEIGHT -
                            PUPIL_SIZE) / 2,PUPIL_SIZE,PUPIL_SIZE);
    leftPupil.setFilled(true);
    gw.add(leftPupil);
    let rightPupil = GOval(rightEye_X + (EYE_WIDTH - PUPIL_SIZE) / 2,leftEye_Y + (EYE_HEIGHT - PUPIL_SIZE) / 2
                            ,PUPIL_SIZE,PUPIL_SIZE);
    rightPupil.setFilled(true);
    gw.add(rightPupil);
    // 4- Draw Nose
    let noseCenter_X = cx + FACE_WIDTH / 2;
    let noseCenter_Y = cy + FACE_HEIGHT / 2;
    gw.add(GLine(noseCenter_X - NOSE_SIZE / 2,noseCenter_Y + NOSE_SIZE / 2,
            noseCenter_X,noseCenter_Y - NOSE_SIZE / 2));
    gw.add(GLine(noseCenter_X,noseCenter_Y - NOSE_SIZE / 2,noseCenter_X + NOSE_SIZE / 2,
           noseCenter_Y + NOSE_SIZE / 2));
    gw.add(GLine(noseCenter_X + NOSE_SIZE / 2,noseCenter_Y + NOSE_SIZE / 2,noseCenter_X - NOSE_SIZE / 2,
            noseCenter_Y + NOSE_SIZE / 2));
    // 5- Draw mouth
    gw.add(GRect(noseCenter_X - MOUTH_WIDTH / 2,cy + 3/4 * FACE_HEIGHT,
            MOUTH_WIDTH,MOUTH_HEIGHT));
    // 6- mousemove action
    gw.addEventListener("mousemove",mouseMoveAction);
    let leftPupilCenter_X = leftPupil.getX() + PUPIL_SIZE / 2;
    let leftPupilCenter_Y = leftPupil.getY() + PUPIL_SIZE / 2;
    let rightPupilCenter_X = rightPupil.getX() + PUPIL_SIZE / 2;
    let rightPupilCenter_Y = rightPupil.getY() + PUPIL_SIZE / 2;
    function mouseMoveAction(e) {
         let dxLeft = e.getX() - leftPupilCenter_X;
         let dyLeft = e.getY() - leftPupilCenter_Y;
         movePupil(leftPupil,leftPupilCenter_X,leftPupilCenter_Y,dxLeft,dyLeft);
         let dxRight = e.getX() - rightPupilCenter_X;
         let dyRight = e.getY() - rightPupilCenter_Y;
         movePupil(rightPupil,rightPupilCenter_X,rightPupilCenter_Y,dxRight,dyRight);
    }
}

/*
 * Moves the pupils in a circle with the fixed radius size of EYE_WIDTH/3. r is the distance between
 * cursor position and eye center, x and y are the coordinates of pupil on a fixed circle.
 * the x and y are calculated using trigonemtry according to the attached geometric figure.
 */

function movePupil(pupil,centerX,centerY,dx,dy) {
    let r = Math.sqrt(dx * dx + dy * dy);
    let x = 0; let y = 0;
    if(r < EYE_WIDTH / 2){
        x = dx;
        y = dy;
    }else{
        x = (EYE_WIDTH / 3) * dx / r;
        y = (EYE_WIDTH / 3) * dy / r;
    }
    pupil.setLocation(centerX + x - PUPIL_SIZE / 2 , centerY + y - PUPIL_SIZE / 2);
}