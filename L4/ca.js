class CellularAutomata {
	constructor(size,ruleset) {
		this.size = size;
		this.ruleset = ruleset;
		this.generation = 0;

		this.cells = new Array(this.size).fill(0);
		this.cells[size/2] = 1;

		console.log(this.cells);
	}

	evolve() {
		let nextgen = new Array(this.size).fill(0);

		for (let i = 1; i<this.size - 1; i++) {
			let left = this.cells[i - 1];
			let middle = this.cells[i];
			let right = this.cells[i + 1];

			nextgen[i] = this.applyRules(left, middle, right);
		}

		this.cells = nextgen;
		this.generation++;
	}

	applyRules(left, middle, right) {
		let bin = "" + left + middle + right;
		let ix = parseInt(bin, 2);
		return this.ruleset[ix];
	}

	draw(w) {
		for (let i = 0; i < this.size; i++){
			if(this.cells[i] == 1){
				fill(0);
			} else {
				fill(255);
			}
			
			rect(i*w, this.generation*w, w, w);
		}
	}
}