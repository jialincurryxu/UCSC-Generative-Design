asg1.particleSystem = function(pos) {
    this.origin = pos.copy();
    this.particles = [];
};

asg1.particleSystem.prototype = {
    addParticle: function(){
        this.particles.push(new asg1.particle(this.origin));
    },
    run: function(){
        for (let i = this.particles.length-1; i >= 0; i--) {
            let p = this.particles[i];
            p.run();
            if (p.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }
}