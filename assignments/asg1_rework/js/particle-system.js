asg1.particleSystem = function() {
    this.particles = new Array(1024);
};

asg1.particleSystem.prototype = {
    intiParticle: function(){
        for (let i = 0; i < this.particles.length; i++) {
            let x = map(i, 0, 1024, 0, width * 2);
            let position = createVector(x, 0);
            this.particles[i] = new asg1.particle(position);
            this.particles[i].isDead = false;
        }
    },
    run: function(level){
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].run(map(level[i], 0, 255, 0, 1));
            if (this.particles[i].isDead) {
                this.particles.splice(i, 1);
            }
        }
    }
}