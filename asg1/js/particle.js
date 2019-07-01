asg1.particle = function(pos){
    //this.acceleration = createVector(0, 0.05);
    this.speed = createVector(0, random(0,10));
    this.position = pos.copy();
    this.lifespan = 255;
    this.color = [random(0, 255), random(0,255), random(0,255)];
};

asg1.particle.prototype={
    run: function(){
        this.update();
        this.display();
    },
    update: function(){
        //this.speed.add(this.acceleration);
        this.position.add(this.speed);
        this.lifespan -= 2;
    },
    display: function(){
        stroke(200, this.lifespan);
        strokeWeight(2);
        fill(this.color);
        ellipse(this.position.x, this.position.y, 12, 12);
    },
    isDead: function(){
        return this.lifespan < 0;
    }
}