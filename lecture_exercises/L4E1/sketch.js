
let w, ruleset;

function setup() {
    createCanvas(1400, 750);

    w = 10;
    ruleset = [0,1,0,1,1,0,1,0];
    ca = new CellularAutomata(width/w, ruleset);
}

function draw() {
    ca.draw(w);
    ca.generate();

    if(ca.generation > height / w) {
    	for (let i = 0; i < 7; i++){
    		ruleset[i] = Math.round(Math.random());
    	}
    	console.log(ruleset);
        ca = new CellularAutomata(width/w, ruleset);
        clear();
    }
}

