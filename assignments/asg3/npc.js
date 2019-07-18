class npc{
	constructor() {

	}

	setup() {
		fill(150);
    	ellipse(width/2,height*0.2,50,50);
	}

	interact(code,line) {
		if (code == 1){
			return "Hello, this is the Boring Bot. Would you like to hear some small story? \n\n(Y for yes, N for no.)"
		} else if (code > 1){
			return "Here is a piece of story.\n"+line+"\nWould you like to hear some more? \n\n(Y for yes, N for no.)"
		} else {
			return
		}
	}
}