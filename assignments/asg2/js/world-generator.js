class worldGenerator{
  constructor(size, seed, Bwidth) {
  	// creatre the world class with the given or pre-fixed numbers
  	if (seed) noiseSeed(seed); 

	if (Bwidth > 0) this.width = Bwidth; 
		else this.width = 50;

  	if (size >= 32) this.size = size; 
  		else this.size = 16;

  	this.height = new Array(this.size);
  	for (let i = 0; i < this.size; i++){
  		this.height[i] = new Array(this.size);
  	}
  }
  
  generate() {
  	for (let x = 0; x < this.size; x++){
    	for (let y = 0; y < this.size; y++){
    		// change the noise() factor for more smooth outcome
    		let nx = x/30, ny = y/30;
    		this.height[x][y] = noise(nx, ny);
    	}
    }
  }

  heightBiome(height){
  	// return block's biome type based on the height
  	if (height < 0.3) return water;
  	else if (height < 0.5) return grass;
  	else if (height < 0.7) return dirt;
  	else return snow;
  }

  draw() {
  	let drawH = 0;

  	// move the start point of drawing to make it look nice 
  	translate(-this.width * this.size/2,
  		1.8 * this.width * int(this.height[this.size/2][this.size/2] * this.size),
  		-this.width * this.size/2);
  	for (let x = 0; x < this.size; x++){
    	for (let y = 0; y < this.size; y++){
      		drawH = this.width * int(this.height[x][y] * this.size);
      		translate(0,-drawH,0);
      		texture(this.heightBiome(this.height[x][y]));
      		box(this.width,3*this.width,this.width);
      		translate(this.width,drawH,0);
    	}
    translate(-this.width*this.size,0,this.width);
  	}
  }
}