let capture;
let angle = 0;
let penguin;
let value = 0;

function preload(){
    penguin = loadModel('10033_Penguin_v1_iterations-2.obj');
}

function setup() {
  createCanvas(displayWidth, displayHeight,WEBGL);
  let constraints = {
    video: {
      facingMode: {
        //exact: "environment"
        exact: "user"
      },
      mandatory: {
        minWidth: 1280,
        minHeight: 720
      },
      optional: [{ maxFrameRate: 10 }]
    },
    audio: false
  };
  capture = createCapture(constraints, function(stream) {
    console.log(stream);
  });

  // capture = createCapture(VIDEO);
  // capture.size(displayWidth, displayHeight);
  capture.hide();
}

function draw() {
    //Create takePhotoButton
   takePhotoButton = createButton('Take Photo');
   takePhotoButton.mousePressed(takeImage);
   takePhotoButton.size(80,80);
   takePhotoButton.position(displayWidth/2 - 40, displayHeight/2 + 180);
   takePhotoButton.style("background-color","#fff");
   takePhotoButton.style("border-radius","50%");
  background(value);
  scale(-1.0,1.0);    // flip x-axis backwards
  image(capture, 0 - displayWidth/2 , 0 - displayHeight/2, displayWidth, 4/3*displayWidth);
  //filter(INVERT);
  ambientLight(255);
  directionalLight(255,255,255,0,0,1);
  //rotateX(angle);
  //rotateY(angle * 1.3);
  //rotateZ(angle * 0.7);
  fill(0,0,255);

  //translate(mouseX,mouseY);
  model(penguin);
  box();
  fill(255);
  smooth();
  ellipse(0, 180, 80,80);
  stroke(0);
  strokeWeight(3);
  ellipse(0, 180, 60,60);
  angle += 0.03;
}

/* resizes the canvas if the phone gets flipped so that
 * the browser orientation changes from landscape to
 * portrait or vice-versa. a must-have for games with tilt or
 * rotation controls!
 */
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling
 * the page.
 */
// function deviceTurned() {
//     return false;
// }

// function touchStarted(){
//   return false;
// }
//
function touchMoved(){
  return false;
}
//
// function touchEnded(){
//   return false;
// }

function takeImage() {
  //Display to the canvas one image
  //of the video feed when the user presses the button
  //userPicture = image(capture, 40, 0);
  value = 255;
}
