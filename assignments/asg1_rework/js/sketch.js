//code studied & modified from Jason Sigal
//https://github.com/therewasaguy/p5-music-viz/blob/master/demos/05a_fft_particle_system/sketch.js

//music used Adventures by A Himitsu https://www.youtube.com/channel/UCgFwu-j5-xNJml2FtTrrB3A Creative Commons — Attribution 3.0 Unported— CC BY 3.0 http://creativecommons.org/licenses/by/3.0/ Music released by Argofox https://youtu.be/8BXNwnxaVQE Music provided by Audio Library https://youtu.be/MkNeIUgNPQ8

let asg1 = {};
let fft;
let soundFile;
let system;

function preload(){
	soundFile = loadSound('sound/A Himitsu - Adventures [Argofox].mp3');
	soundFile.setVolume(0.2);
}

function setup() {
  c = createCanvas(1200, 800);
  noStroke();

  mic = new p5.AudioIn();
  mic.start();

  soundFile.play();

  fft = new p5.FFT();
  fft.setInput(soundFile);

  system = new asg1.particleSystem();
  system.intiParticle();
}

function draw() {
  background(0);
  system.run(fft.analyze(1024))
}

function keyPressed() {
  if (key == 't') {
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
}
