let k = 0.01;
let timeX = 0;
let timeY = 10000;

function setup() {
	createCanvas(500, 500);
}

function draw() {
	clear();

	background(200);

	fill(51);

	let x = noise (timeX) * width;
	let y = noise (timeY) * height;

	ellipse(x, y, 24, 24);

	timeX += k;
	timeY += k;
}