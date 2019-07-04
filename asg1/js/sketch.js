//code studied & modified from Jason Sigal
//https://github.com/therewasaguy/p5-music-viz/blob/master/demos/05a_fft_particle_system/sketch.js

let asg1 = {};
let fft;
let soundFile;
let system;

function preload(){
	soundFile = loadSound('sound/03 - 激白.flac');
	soundFile.setVolume(0.2);
}

function setup() {
  c = createCanvas(1200, 800);
  noStroke();

  mic = new p5.AudioIn();
  mic.start();

  // initialize the FFT, plug in our variables for smoothing and binCount
  fft = new p5.FFT();
  fft.setInput(soundFile);

  // instantiate the particles.
  system = new asg1.particleSystem();
  system.intiParticle();
}

function draw() {
  background(0, 0, 0, 100);

  // returns an array with [binCount] amplitude readings from lowest to highest frequencies
  var spectrum = fft.analyze(1024);

  // update and draw all [binCount] particles!
  // Each particle gets a level that corresponds to
  // the level at one bin of the FFT spectrum. 
  // This level is like amplitude, often called "energy."
  // It will be a number between 0-255.
  for (var i = 0; i < 1024; i++) {
    particles[i].run( map(spectrum[i], 0, 255, 0, 1) );
  }

}

function keyPressed() {
  if (key == 't') {
    toggleInput();
  }
}

// To prevent feedback, mic doesnt send its output.
// So we need to tell fft to listen to the mic, and then switch back.
function toggleInput() {
  if (  soundFile.isPlaying() ) {
    soundFile.pause();
    mic.start();
    fft.setInput(mic);
  } else {
    soundFile.play();
    mic.stop();
    fft.setInput(soundFile);
  }
}