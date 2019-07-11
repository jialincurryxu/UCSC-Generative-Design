let world;
let cam;

function preload(){
  grass = loadImage('assets/grass.png');
  dirt = loadImage('assets/dirt.png');
  snow = loadImage('assets/snow.png');
  water = loadImage('assets/water.png');
}

function setup() {
  createCanvas(windowWidth*0.8, windowHeight*0.8, WEBGL);

  // worldGenerator(size, seed, Bwidth)
  // size = number of blocks in all direction
  // seed = seed used for the noise() function
  // Bwidth = width of each block in each direction
  // they can all leave blank to use defult setting
  // width = 50; size = 16; random seed
  world = new worldGenerator(50);
  
  noStroke();

  // generate random height
  world.generate();
  console.log(world.height);

  // generate the camera for control
  cam = createCamera();
}

function draw() {
  background("#87cefa");

  // update all the keyboard camera control
  camThings();

  // draw the world
  world.draw();
}

function camThings() {
  // I did all these before the assignmnent is updated
  // so I just keep all these
  // WASD move the camera
  if (keyIsDown(65)) cam.move(-50,0,0);
    else if (keyIsDown(68)) cam.move(50,0,0);
  if (keyIsDown(87)) cam.move(0,0,-50);
    else if (keyIsDown(83)) cam.move(0,0,50);

  // space to ascend, ctrl to decend
  if (keyIsDown(32)) cam.move(0,-50,0);
    else if (keyIsDown(17)) cam.move(0,50,0);

  // arrow keys to turn
  if (keyIsDown(UP_ARROW)) cam.tilt(-0.04);
    else if (keyIsDown(DOWN_ARROW)) cam.tilt(0.04);
  if (keyIsDown(LEFT_ARROW)) cam.pan(0.04);
    else if (keyIsDown(RIGHT_ARROW)) cam.pan(-0.04);
}

function windowResized() {
  // a little nice function to resize the canvas
  resizeCanvas(windowWidth*0.8, windowHeight*0.8);
  background(0);
}

function mouseDragged() {
  // done by the instruction
  cam.pan(event.movementX/800);
  cam.tilt(event.movementY/800);
}