asg1.particle = function(pos){
  this.position = pos;
  this.scale = random(0, 1);
  this.speed = createVector(0, random(0, 10) );
  this.color = [random(0, 255), random(0,255), random(0,255)];
  this.isDead = true;
};

asg1.particle.prototype={
    run: function(level){
        this.update(level);
        this.draw();
    },
    update: function(level){
        this.position.y += this.speed.y / (level*2);
        if (this.position.y > height) {
            this.position.y = 0;
        }
        this.diameter = map(level, 0, 1, 0, 100) * this.scale;

    },
    draw: function(){
        if (!this.isDead){
          fill(this.color);
          ellipse(this.position.x, this.position.y, this.diameter, this.diameter);}
    }
}