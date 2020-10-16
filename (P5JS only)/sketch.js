let capture;
let img;

var s = 1.0;
var r = 0;
var tmpR = 0;

var direction;
var pR;

var value = 0;
var imgX = 0;
var pX;
var pY;
var imgY = 0;
var tempImgX;
var tempImgY;
var initWidth;
var initHeight;

var showObject = true;
//var scaleImg = false;

var snapshot = [];

var hammer;

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
    img = loadImage('img/pikachu.gif');
}

function setup() {
  createCanvas(displayWidth, displayHeight, WEBGL);

  imgW = img.width / 2;
  imgH = img.height / 2;
  initWidth = imgW;
  initHeight = imgH;
  imgY = -4/3*displayWidth/2 + imgH/2 ;
  tempImgX = -(imgX - displayWidth/2);
  tempImgY = imgY + displayHeight/2;

  div = createDiv('');
  div.style("background-color","#fee167");
  div.size(displayWidth,windowHeight -4/3*displayWidth );
  div.position(0,4/3*displayWidth);
  // set options to prevent default behaviors for swipe, pinch, etc
  var options = {
    preventDefault: true
  };

  // document.body registers gestures anywhere on the page
  hammer = new Hammer(document.body, options);
<<<<<<< Updated upstream
  hammer.get('pinchin').set({ enable: true });
  hammer.get('pinichout').set({enable: true});
  
  hammer.get('rotate').set({ enable: true });  
  hammer.on("pinch", scaleRect);
  hammer.on("rotate", rotateRect);
=======
  hammer.get('pinch').set({ enable: true });
  hammer.get('rotate').set({ enable: true });

  hammer.on("pinchin", scaleIncreaseRect);
  hammer.on("pinchout", scaleDecreaseRect);
>>>>>>> Stashed changes

  hammer.on("rotatestart", rotateStart);
  hammer.on("rotatemove", rotateRect);
  hammer.on("rotateend", rotateEnd);

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
 //takePhotoButtonOut = createButton('');
 takePhotoButtonOut = createImg('img/capture.png');
 takePhotoButtonOut.mousePressed(takeImage);
 takePhotoButtonOut.size(80,80);
 takePhotoButtonOut.position(displayWidth/2 - takePhotoButtonOut.width/2, 4/3*displayWidth+(windowHeight-(4/3*displayWidth))/2 - takePhotoButtonOut.height/2);
 //takePhotoButtonOut.position(displayWidth/2 - 40, displayHeight/2 + 140);
 takePhotoButtonOut.style("background-color","#fff");
 takePhotoButtonOut.style("border-radius","50%");

 // takePhotoButtonIn = createButton('');
 // takePhotoButtonIn.mousePressed(takeImage);
 // takePhotoButtonIn.size(65,65);
 // takePhotoButtonIn.position(displayWidth/2 - takePhotoButtonIn.width/2, 4/3*displayWidth+(windowHeight-(4/3*displayWidth))/2 - takePhotoButtonIn.height/2);
 // //takePhotoButtonIn.position(displayWidth/2 - 32.5, displayHeight/2 + 147.5);
 // takePhotoButtonIn.style("background-color","#fff");
 // takePhotoButtonIn.style("border-radius","50%");
 // takePhotoButtonIn.style("border","3px solid black");

 switchCameraButton = createImg('https://icon-library.net//images/switch-camera-icon/switch-camera-icon-8.jpg');
 switchCameraButton.size(65,65);
 switchCameraButton.style("background-color","#fff");
 switchCameraButton.style("border-radius","50%");
 // switchCameraButton.position(displayWidth/2 +100, displayHeight/2 + 147.5);
 switchCameraButton.position(displayWidth/2 + displayWidth/2/2, 4/3*displayWidth+(windowHeight-(4/3*displayWidth))/2 - switchCameraButton.height/2);
 switchCameraButton.mousePressed(switchCamera);

 showObjectButton = createImg('img/ObjectIcon2.png');
 showObjectButton.size(65,65);
 showObjectButton.style("background-color","#fff");
 showObjectButton.style("border-radius","50%");
 // switchCameraButton.position(displayWidth/2 +100, displayHeight/2 + 147.5);
 showObjectButton.position(displayWidth/2 - displayWidth/2/2-65, 4/3*displayWidth+(windowHeight-(4/3*displayWidth))/2 - switchCameraButton.height/2);
 showObjectButton.mousePressed(viewObject);
}

function draw() {
//console.log(scaleImg);
  background(value);

  //scaleImg = false;

  if(constraints.video.facingMode.exact == "user")
    scale(-1.0,1.0);    // flip x-axis backwards

  image(capture, 0 - displayWidth/2 , 0 - displayHeight/2, displayWidth, 4/3*displayWidth);

  push();
  //translate(-(mouseX - displayWidth/2) , (mouseY - displayHeight/2));
  imgX = constrain(imgX,  -displayWidth/2 + imgW/2, displayWidth/2 - imgW/2);
  imgY = constrain(imgY, - displayHeight /2 + imgH/2, - displayHeight /2 +  4/3*displayWidth -  imgH/2);

  if(constraints.video.facingMode.exact == "user")
    translate(imgX, imgY);
  else
    translate(imgX, imgY);

  if(constraints.video.facingMode.exact == "user")
    rotate(-r);
  else
    rotate(r);

  imgW = initWidth * s;
  imgH = initHeight * s;
  scale(s);

  if(showObject == true){
      imageMode(CENTER);
      image(img, 0,0, imgW, imgH);
  }

  pop();

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
    //if(scaleImg == false){
        for (var i = 0; i < touches.length; i++) {
            //NEED TO MATCH THE OBJECT SIZE WITH SCLAE
            if(touches[0].x > tempImgX - imgW/2 && touches[0].x < tempImgX + imgW/2 &&  touches[0].y > tempImgY - imgH/2 && touches[0].y < tempImgY + imgH/2){
                if(constraints.video.facingMode.exact == "user"){
                    //let dX = int(dist(pX, 0, touches[0].x, 0));
                    //console.log(d);
                    imgX = -(touches[0].x - displayWidth/2 ) ;
                    // if(touches[0].x > pX )
                    //     imgX = imgX - dX;
                    // else
                    //     imgX = imgX + dX;
                    //
                     tempImgX = -(imgX - displayWidth/2);
                    // pX = touches[0].x;
                }
                else
                   imgX = (touches[0].x - displayWidth/2) ;

                 // let dY = int(dist(pY, 0, touches[0].y, 0));
                 imgY = (touches[0].y - displayHeight/2);
                 // if(touches[0].y < pY )
                 //     imgY = imgY - dY;
                 // else
                 //     imgY = imgY + dY;

                 tempImgY = imgY + displayHeight/2;
                 //pY = touches[0].y;
            }
        //}
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
        //if(touches[i].x > tempImgX - imgW/2 && touches[i].x < tempImgX + imgW/2 &&  touches[i].y > tempImgY - imgH/2 && touches[i].y < tempImgY + imgH/2){

            //console.log(event.rotation);
            // if(event.rotation > pR)
            //     direction = 1;
            // if(event.rotation < pR)
            //     direction = -1;
            // if(event.rotation == pR)
            //     direction = 0;

            //console.log(direction);
            tmpR = radians(event.rotation - 180);
            
            //pR = r;
        //}
    }
}

function rotateEnd(){
  r += tmpR;
  if(degrees(r) >= 360)
    r = r - radians(360);
}

function rotateStart(){
  tmpR += r;
}


function scaleIncreaseRect(event) {
    for (var i = 0; i < touches.length; i++) {
        //NEED TO MATCH THE OBJECT SIZE WITH SCLAE
        //if(touches[i].x > tempImgX - imgW/2 && touches[i].x < tempImgX + imgW/2 &&  touches[i].y > tempImgY - imgH/2 && touches[i].y < tempImgY + imgH/2){
            //console.log(event.scale);
            //THIS ONE NEED CHANGE
            s += event.scale;
            
        //}
    }
}

function scaleDecreaseRect(event) {
  for (var i = 0; i < touches.length; i++) {
      //NEED TO MATCH THE OBJECT SIZE WITH SCLAE
      //if(touches[i].x > tempImgX - imgW/2 && touches[i].x < tempImgX + imgW/2 &&  touches[i].y > tempImgY - imgH/2 && touches[i].y < tempImgY + imgH/2){
          //console.log(event.scale);
          //THIS ONE NEED CHANGE
          s -= event.scale;
          
      //}
  }
}

function viewObject(){
    if(showObject == true){
        showObject = false;
    }
    else
        showObject = true;
}

// function swiped(event) {
//   console.log(event);
//   if (event.direction == 4) {
//       //right
//     imgX = -(mouseX - displayWidth/2) ;
//   } else if (event.direction == 8) {
//       //up
//     imgY = (mouseY - displayHeight/2);
//   } else if (event.direction == 16) {
//       //down
//     imgY = (mouseY - displayHeight/2);
//   } else if (event.direction == 2) {
//       //left
//     imgX = -(mouseX - displayWidth/2) ;
//   }
// }
