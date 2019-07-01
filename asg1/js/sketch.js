let asg1 = {};

function setup() {
	createCanvas(720, 400);
	system = new asg1.particleSystem(createVector(width / 2, 150));
}

function draw() {
	background(0);
	system.addParticle();
	system.run();
}