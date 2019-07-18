let lsystem;
let x, y;
let dialog;
let context;
let npcBody;
let flag = false;
let dialogCode;
let parserMain;

let arrayA = ['white','brown','black','pink','grey','rainbow']
let arrayB = ['cat','dog','tiger','deer','monkey']
let arrayC = ['jump','run','hop']
  
let axiom = "The quick C K J over the lazy K.";
let rules = {"C": arrayA,"K": arrayB, "J": arrayC};

function setup() {
    createCanvas(windowWidth*0.8, windowHeight*0.8);

    strokeWeight(1);
    x = width/2;
    y = height*0.8;

    dialog = new dialogBox();
    npcBody = new npc();
    parserMain = new parser(rules);
}

function draw() {
	background(240);
	npcBody.setup();

	fill(150);
    let a = ellipse(x,y,50,50);

    if (!flag) {
    	if (keyIsDown(65)) x-=5;
        else if (keyIsDown(68)) x+=5;
      	if (keyIsDown(87)) y-=5;
        else if (keyIsDown(83)) y+=5;
    }

    if (abs(width/2 - x)<=70 && abs(height*0.2 - y)<=70 && keyIsDown(32)){
    	flag = true;
    	dialogCode = 1;
    }

    if (flag){
    	dialog.draw(npcBody.interact(dialogCode,parserMain.story(axiom)));
    	noLoop();
    }
    
}

function keyPressed() {
	if (flag) {
		if (keyCode == 89) {
			dialogCode ++;
			loop();
		} else if (keyCode == 78){
			dialogCode = -1;
    		flag = false;
    		loop();
    	}
	}
}
