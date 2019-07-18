class dialogBox{
	constructor() {
		this.w = width * 0.8;
		this.h = height * 0.25;
	}

	draw(textContent) {
		fill(255);
		rect(width*0.1, height*0.7,this.w, this.h, 10);
		fill(0);
		textSize(32);
		text(textContent, width*0.1+20, height*0.7 +20, this.w - 40,this.h - 40);
	}
}