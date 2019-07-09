let cellW = 10;

function setup() {
	createCanvas(2000, 2000);
	strokeWeight(1);

	let size = width/cellW;
	let ruleset =[0,1,0,1,1,0,1,0];

	ca = new CellularAutomata(size,ruleset);
}

function draw() {
	ca.draw(cellW);
	ca.evolve();
}

