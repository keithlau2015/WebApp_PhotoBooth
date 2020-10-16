let capture;
let img;
let pics = [];

var s = 1.0;
var r = 0;

var tmpR = 0;
var tmpS = s;

var direction;
var pR;

var imgX = 0;
var pX;
var pY;
var imgY = 0;
var tempImgX;
var tempImgY;
var initWidth;
var initHeight;

var showObject = true;
var blink = false;
//var scaleImg = false;

var hammer;
var adjustS = false
var adjustR = false;
var tmpS = s, tmpR = r;

//Timer
var tiempoEspera;
var tiempoInicio;

let shutter;


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
  canvas  = createCanvas(displayWidth, displayHeight, WEBGL);

  shutter = loadSound('sound/shutter.wav');

  tiempoInicio = 0;
  tiempoEspera = 1000; // 3 segundos

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
  hammer.get('pinch').set({ enable: true });
  hammer.get('rotate').set({ enable: true });

  hammer.on("pinchstart", scaleStart);
  hammer.on("pinchmove", scaleRect);
  hammer.on("pinchend", scaleEnd);

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

 retakeButton = createImg('img/reload.png');
 retakeButton.size(65,65);
 retakeButton.style("background-color","#fff");
 retakeButton.style("border-radius","50%");
 // switchCameraButton.position(displayWidth/2 +100, displayHeight/2 + 147.5);
 retakeButton.position(displayWidth/2 + displayWidth/2/2, 4/3*displayWidth+(windowHeight-(4/3*displayWidth))/2 - retakeButton.height/2);
 retakeButton.mousePressed(retakeImage);

 downloadButton = createImg('img/download.png');
 downloadButton.mousePressed(downloadImage);
 downloadButton.size(80,80);
 downloadButton.position(displayWidth/2 - downloadButton.width/2, 4/3*displayWidth+(windowHeight-(4/3*displayWidth))/2 - downloadButton.height/2);
 //takePhotoButtonOut.position(displayWidth/2 - 40, displayHeight/2 + 140);
 downloadButton.style("background-color","#fff");
 downloadButton.style("border-radius","50%");

 facebookButton = createElement('div', '<div style="background-color: rgb(93, 125, 174); border-radius: 6px; display: inline-block;"><a href="javascript:window.open(&quot;https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.cimptech.com%2Fwebproject%2F&amp;quote=This%20is%20web%20Project!&amp;picture=https%3A%2F%2Fwww.cimptech.com%2Fcms%2Fimg%2Flogo.png&amp;title=%E6%88%91%E5%88%86%E4%BA%AB%E7%B5%A6%E4%BD%A0%EF%BC%81(title)&amp;description=%E5%88%86%E4%BA%AB%E7%B6%B2%E9%A0%81%E6%8A%80%E8%A1%93%20(description)&amp;caption=CMS%E5%90%83%E4%BB%80%E9%BA%BC%EF%BC%9F%20(caption)&quot;, &quot;_blank&quot;, &quot;toolbar=0,status=0&quot;)" style="font-size: 20px; font-weight: bold; text-align: center; color: rgb(255, 255, 255); border: 1px solid rgb(255, 255, 255); padding: 2px 10px; cursor: pointer; text-decoration: none; display: block;"><img src="https://pulipulichen.github.io/blog-pulipuli-info-data-2017/04/facebook-share/facebook-logo-white.svg" width="20" height="20" style="margin-top: 3px; margin-bottom: -2px;"> 分享</a></div>');
 facebookButton.size(100,65);
 // switchCameraButton.position(displayWidth/2 +100, displayHeight/2 + 147.5);
 facebookButton.position(displayWidth/2 - displayWidth/2/2-65, 4/3*displayWidth+(windowHeight-(4/3*displayWidth))/2 - facebookButton.height/2/2);
 //facebookButton.mousePressed(viewObject);
}

function draw() {
if ( pics.length >= 1 ){
    takePhotoButtonOut.hide();
    showObjectButton.hide();
    switchCameraButton.hide();
    retakeButton.show();
    downloadButton.show();
    facebookButton.show();
} else {
    takePhotoButtonOut.show();
    showObjectButton.show();
    switchCameraButton.show();
    retakeButton.hide();
    downloadButton.hide();
    facebookButton.hide();
}

  background(0);

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

    //preview of rotate & scale
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
  if ( pics.length == 1 ){
    push();
    scale(-1.0,1.0);
    image( pics[pics.length-1],  0 - displayWidth/2 , 0 - displayHeight/2,  displayWidth, 4/3*displayWidth );
    pop();

    if(blink == true){
        fill(0);
        rect(0 - displayWidth/2 , 0 - displayHeight/2,displayWidth, displayHeight);

        if(millis() - tiempoInicio > tiempoEspera){
            tiempoInicio = millis();
            blink = false;
        }
    }
  }


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
  if ( pics.length < 1 ){
      let img = canvas.get( 0, 0, displayWidth, 4/3*displayWidth );
      pics.push(img);

      blink = true;
      if(shutter.isPlaying() == false)
        shutter.play();
    //else stop the sound and play again
  }
}

function retakeImage() {
  pics = [];
}

function downloadImage() {
  saveCanvas('myCanvas', 'jpg');
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


function scaleRect(event) {
    for (var i = 0; i < touches.length; i++) {
        //NEED TO MATCH THE OBJECT SIZE WITH SCLAE
        //if(touches[i].x > tempImgX - imgW/2 && touches[i].x < tempImgX + imgW/2 &&  touches[i].y > tempImgY - imgH/2 && touches[i].y < tempImgY + imgH/2){
            //console.log(event.scale);
            //THIS ONE NEED CHANGE
            tmpS = event.scale;
        //}
    }
}

function scaleStart(){
  tmpS = s;
}

function scaleEnd(){
  s = tmpS;
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
