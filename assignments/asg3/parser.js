class parser {
    constructor(rules) {
        this.rules = rules;
    }

    story(axiom) {
    	let s = axiom;

        let ns = "";
        // Iterate on every character of s expanding nonterminals
        for(let j = 0; j < s.length; j++) {
            // If the characte has a rule in the rules, it is
            // a nonterminal.
            if(s[j] in this.rules) {
                ns += this.rules[s[j]][Math.floor(Math.random() * this.rules[s[j]].length)];
            } else {
                ns += s[j];
            }
        }

        console.log(ns);
        s = ns;
        

    	return s;
    }
}