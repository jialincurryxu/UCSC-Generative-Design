class MarkovChains {
	constructor(notesAll){
		this.ilegalNotes = {" ": 0};
		this.note = "";
		this.notesAll = notesAll;

		let pd = this.train();
		this.note = this.generateNotes(pd);
	}

	generateNotes(pd) {
		let nstate = this.sample(pd, "#");
    	let note = "";

    	while(nstate !== "#") {
        	note += nstate+" ";
        	nstate = this.sample(pd, nstate);
    	}

    	return note;
	}

	train() {
    	let pd = {};

    	for (let p = 0; p < this.notesAll.length;p++) {
    		// Load all states
    		this.notes = this.notesAll[p].split(" ");
    		this.notes.unshift("#");
    		this.notes.push("#");

    	    for(let note of this.notes) {
    	        if(!(note in this.ilegalNotes) && !(note in pd)) {
    	            // Create a new state for this character
    	            pd[note] = {};
    	        }
    	    }

    	    // Estimate probability distribution
    	    for (let i =0; i < this.notes.length - 1; i++){
    	        let cstate = this.notes[i];
    	        if (cstate in pd){
    	          	let nstate = this.notes[i+1];
    	          	if(!(nstate in pd[cstate])) {
    	                pd[cstate][nstate] = 0;
    	            }
    	            pd[cstate][nstate] += 1;
    	        }
    	    }

    	
    	    // Normalize pd
    	    for(let cstate in pd) {
    	        let ctotal = 0;
    	        for(let nstate in pd[cstate]) {
    	            ctotal += pd[cstate][nstate];
    	        }
    	
    	        for(let nstate in pd[cstate]) {
    	            pd[cstate][nstate] /= ctotal;
    	        }
    	    }
    	}

    	return pd;
	}

	sample(pd, istate) {
		let r = random();
    	let probSoFar = 0;

    	for(let nstate in pd[istate]) {
        	probSoFar += pd[istate][nstate];

        	if(r < probSoFar) {
            	return nstate;
        	}
    	}
	}
}
