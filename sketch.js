let capture;
let angle = 0;
let penguin;

var s = 1.0;
var r = 0;

var value = 0;
var modX = 0;
var modY = 0;
var tempModX;
var tempModY;
var initWidth = 50;
var initHeight = 100;
var modWidth = 50;
var modHeight = 100;

var showObject = true;

var snapshot = [];

//For animation
var mesh;
var mixer = new THREE.AnimationMixer(mesh);
var clips = mesh.animations;

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

function preload(){
    penguin = loadModel('10033_Penguin_v1_iterations-2.obj');
    img = loadImage('10033_Penguin_v1_Diffuse.jpg');

    tempModX = -(modX - displayWidth/2);
    tempModY = modY + displayHeight/2;
}

function setup() {
  createCanvas(displayWidth, displayHeight, WEBGL);

  div = createDiv('');
  div.style("background-color","#000");
  div.size(displayWidth,windowHeight -4/3*displayWidth );
  div.position(0,4/3*displayWidth);
  // set options to prevent default behaviors for swipe, pinch, etc
  var options = {
    preventDefault: true
  };

  // document.body registers gestures anywhere on the page
  var hammer = new Hammer(document.body, options);
  hammer.get('pinch').set({ enable: true });
  hammer.get('rotate').set({ enable: true });
  hammer.on("pinch", scaleRect);
  hammer.on("rotate", rotateRect);

  // hammer.get('swipe').set({
  //   direction: Hammer.DIRECTION_ALL
  // });
  //
  // hammer.on("swipe", swiped);

  capture = createCapture(constraints, function(stream) {
    console.log(stream);
  });

  // capture = createCapture(VIDEO);
  // capture.size(displayWidth, displayHeight);
  capture.hide();

 //NEED TO MATCH THE BUTTON SIZE
  //Create takePhotoButton
 takePhotoButtonOut = createButton('');
 takePhotoButtonOut.mousePressed(takeImage);
 takePhotoButtonOut.size(80,80);
 takePhotoButtonOut.position(displayWidth/2 - takePhotoButtonOut.width/2, 4/3*displayWidth+(windowHeight-(4/3*displayWidth))/2 - takePhotoButtonOut.height/2);
 //takePhotoButtonOut.position(displayWidth/2 - 40, displayHeight/2 + 140);
 takePhotoButtonOut.style("background-color","#fff");
 takePhotoButtonOut.style("border-radius","50%");

 takePhotoButtonIn = createButton('');
 takePhotoButtonIn.mousePressed(takeImage);
 takePhotoButtonIn.size(65,65);
 takePhotoButtonIn.position(displayWidth/2 - takePhotoButtonIn.width/2, 4/3*displayWidth+(windowHeight-(4/3*displayWidth))/2 - takePhotoButtonIn.height/2);
 //takePhotoButtonIn.position(displayWidth/2 - 32.5, displayHeight/2 + 147.5);
 takePhotoButtonIn.style("background-color","#fff");
 takePhotoButtonIn.style("border-radius","50%");
 takePhotoButtonIn.style("border","3px solid black");

 switchCameraButton = createImg('img/SwitchCameraIcon.png');
 switchCameraButton.size(65,65);
 switchCameraButton.style("background-color","#fff");
 switchCameraButton.style("border-radius","50%");
 // switchCameraButton.position(displayWidth/2 +100, displayHeight/2 + 147.5);
 switchCameraButton.position(displayWidth/2 + displayWidth/2/2, 4/3*displayWidth+(windowHeight-(4/3*displayWidth))/2 - switchCameraButton.height/2);
 switchCameraButton.mousePressed(switchCamera);

 showObjectButton = createImg('img/ObjectIcon.jpg');
 showObjectButton.size(65,65);
 showObjectButton.style("background-color","#fff");
 showObjectButton.style("border-radius","50%");
 // switchCameraButton.position(displayWidth/2 +100, displayHeight/2 + 147.5);
 showObjectButton.position(displayWidth/2 - displayWidth/2/2-65, 4/3*displayWidth+(windowHeight-(4/3*displayWidth))/2 - switchCameraButton.height/2);
 showObjectButton.mousePressed(viewObject);
}

function draw() {
  background(value);
  if(constraints.video.facingMode.exact == "user")
    scale(-1.0,1.0);    // flip x-axis backwards

  image(capture, 0 - displayWidth/2 , 0 - displayHeight/2, displayWidth, 4/3*displayWidth);

  push();
  //translate(-(mouseX - displayWidth/2) , (mouseY - displayHeight/2));
  modX = constrain(modX,  -displayWidth/2 + modWidth/2, displayWidth/2 - modWidth/2);
  modY = constrain(modY, - displayHeight /2 + modHeight/2, - displayHeight /2 +  4/3*displayWidth);

  if(constraints.video.facingMode.exact == "user")
    translate(modX, modY + modHeight/2);
  else
    translate(-modX, modY);

  ambientLight(255);
  //directionalLight(255,255,255,0,0,1);
  rotateX(45);
  //rotateY(angle * 1.3);
  rotateZ(135);
  if(constraints.video.facingMode.exact == "user")
    rotate(-r);
  else
    rotate(r);
  scale(s);
  texture(img);
  noStroke();
  if(showObject == true)
    model(penguin);

  //Shadow
  // noStroke();
  // fill(255,0);
  // rectMode(CENTER);
  // rect(0,0, displayWidth,displayWidth);

  pop();
  //angle += 0.03;

  // if(snapshot.width > 0){ //snapshot seen as object instead of array, so use object charatersitic to check
  //   //print(snapshot.length);
  // image(snapshot, 0-100, 0-100);
  // }
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
//     if (turnAxis === 'X') {
//     if (value === 0) {
//       value = 255;
//     } else if (value === 255) {
//       value = 0;
//     }
//   }
// }

// function touchStarted(){
//   return false;
// }

function touchMoved(){
    for (var i = 0; i < touches.length; i++) {
        //NEED TO MATCH THE OBJECT SIZE WITH SCLAE
        if(touches[i].x > tempModX - modWidth/2 && touches[i].x < tempModX + modWidth/2 &&  touches[i].y > tempModY - modHeight/2 && touches[i].y < tempModY + modHeight/2){
            if(constraints.video.facingMode.exact == "user"){
                modX = -(touches[i].x - displayWidth/2) ;
                tempModX = -(modX - displayWidth/2);
            }
            else
               modX = (touches[i].x - displayWidth/2) ;


             modY = (touches[i].y - displayHeight/2);
             tempModY = modY + displayHeight/2;
        }


    }


    return false;
}

// function touchEnded(){
//   return false;
// }

// do this prevent default touch interaction
// function mousePressed() {
//   return false;
// }

function takeImage() {
  //Display to the canvas one image
  //of the video feed when the user presses the button
  //userPicture = image(capture, 40, 0);
  snapshot = capture.get();
  //snapshot.save('photo', 'jpg');
  //saveCanvas('myCanvas', 'png');
}

function switchCamera(){
    if(constraints.video.facingMode.exact == "user")
        constraints.video.facingMode.exact = "environment";
    else
        constraints.video.facingMode.exact = "user";

    capture = createCapture(constraints, function(stream) {
      console.log(stream);
    });
}

function rotateRect(event) {
    for (var i = 0; i < touches.length; i++) {
        //NEED TO MATCH THE OBJECT SIZE WITH SCLAE
        if(touches[i].x > tempModX - modWidth/2 && touches[i].x < tempModX + modWidth/2 &&  touches[i].y > tempModY - modHeight/2 && touches[i].y < tempModY + modHeight/2){
            console.log(event);
            r = radians(event.rotation);
        }
    }

}


function scaleRect(event) {
    for (var i = 0; i < touches.length; i++) {
        //NEED TO MATCH THE OBJECT SIZE WITH SCLAE
        if(touches[i].x > tempModX - modWidth/2 && touches[i].x < tempModX + modWidth/2 &&  touches[i].y > tempModY - modHeight/2 && touches[i].y < tempModY + modHeight/2){
            console.log(event);
            s = constrain(s, 1 , 4.3);
            s = event.scale;
            modWidth = initWidth * s;
            modHeight = initHeight * s;
        }
    }

}

function viewObject(){
    if(showObject == true){
        showObject = false;
    }
    else
        showObject = true;
}

//Animation
function update(){
  mixer.update(deltaSeconds);
}

//Play a specific animation
var clip = THREE.AnimationClip.findByName(clips, 'dance');
var action = mixer.clipAction(clip);
action.play();

//remark for tha animation looping
//loop modes: THREE.LoopOnce, THREE.LoppRepeat, THREE.LoopPingPong(.repetition Default is infinity)

// function swiped(event) {
//   console.log(event);
//   if (event.direction == 4) {
//       //right
//     modX = -(mouseX - displayWidth/2) ;
//   } else if (event.direction == 8) {
//       //up
//     modY = (mouseY - displayHeight/2);
//   } else if (event.direction == 16) {
//       //down
//     modY = (mouseY - displayHeight/2);
//   } else if (event.direction == 2) {
//       //left
//     modX = -(mouseX - displayWidth/2) ;
//   }
// }
