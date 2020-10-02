let capture;
var img;

function preload(){
  //load the image that can add to the photo
}

function setup() {
  createCanvas(390, 240);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  //capture.hide();
}

function draw() {  
  //this is the background
  background(255);
  image(capture, 0, 0, 320, 240);
  filter(INVERT);
}

function mousePressed(){
  //if it dragging the dargable image which will provide at the current website pages
  //if()
  startX = mouseX;
}

function mouseDragged(){
  var diff = startX - mouseX;
  x = x - diff;
  startX = mouseX;
}