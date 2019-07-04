asg1.particleSystem = function() {
    //this.origin = pos.copy();
    this.particles = new Array(1024);
};

asg1.particleSystem.prototype = {
    intiParticle: function(){
        for (let i = 0; i < particles.length; i++) {
            let x = map(i, 0, 1024, 0, width * 2);
            let position = createVector(x, 0);
            particles[i] = new asg1.particle(position);
            particles[i].isDead = false;
        }
    },
    run: function(){
        
    }
}