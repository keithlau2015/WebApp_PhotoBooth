/**
 * This is the THREE.js version
 * @author keith
 **/

//Parameter
var renderer;
var scene;
var camera;
var video;
var strDownloadMime = "image/octet-stream";

//Init
initWebCam();
animate();

//Functions
function initWebCam() {    
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.z = 0.01;

    scene = new THREE.Scene();

    video = document.getElementById( 'video' );

    var texture = new THREE.VideoTexture( video );

    var geometry = new THREE.PlaneBufferGeometry( 16, 9 );
    geometry.scale( 0.5, 0.5, 0.5 );
    var material = new THREE.MeshBasicMaterial( { map: texture } );

    var count = 128;
    var radius = 32;

    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(0, 0, -5);
    mesh.lookAt( camera.position );
    scene.add(mesh);

    /* This code is setting player at the spherical center to view the world(cam)
    for ( var i = 1, l = count; i <= l; i ++ ) {

        var phi = Math.acos( - 1 + ( 2 * i ) / l );
        var theta = Math.sqrt( l * Math.PI ) * phi;

        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.setFromSphericalCoords( radius, phi, theta );
        mesh.lookAt( camera.position );
        scene.add( mesh );
    }
    */

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //OrbitControls is for user to control the rotation of the camera at the center
    //var controls = new OrbitControls( camera, renderer.domElement );
    //controls.enableZoom = false;
    //controls.enablePan = false;

    window.addEventListener( 'resize', onWindowResize, false );

    if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {

        var constraints = { video: { width: 1280, height: 720, facingMode: 'user' } };

        navigator.mediaDevices.getUserMedia( constraints ).then( function ( stream ) {
            // apply the stream to the video element used in the texture
            video.srcObject = stream;
            video.play();
        } ).catch( function ( error ) {
            console.error( 'Unable to access the camera/webcam.', error );
        } );

    } else {
        console.error( 'MediaDevices interface not available.' );
    }
}

function initButton(){
    var saveButton;
    renderer = new THREE.WebGLRenderer({
        preserveDrawingBuffer: true;
    });
    
}

function onClickCapturePhotoButton(){
    var imgData;
    try{
        imgData = render.domElement.toDataURL("image/jpeg");
        saveFile(imgData.replace("image/jpeg", strDonwloadMime), "test.jpg");
    } catch(e){
        console.log(3);
        return;
    }    
}

var saveFile = function (strData, filename){
    var link = document.createElement('a');
    if(typeof link.download === "string"){
        document.body.appendChild(link);
        link.download = filename;
        link.href = strData;
        link.click();
        document.body.removeChild(link);
    } else {
        location.replace(uri);
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    //TODO: Add the 3D models animation
}

function onMouseDown(event){
    //TODO: started to modify the 3D model
}

function onMouseMove(event){
    //TODO: track the mouse position and modify the 3D model position
}

function onMouseUp(event){
    //TODO: settle the 3D model on that position
}
