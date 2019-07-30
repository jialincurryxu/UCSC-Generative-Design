class Individual {
    constructor(indSize) {
        this.indSize = indSize;
        this.gens = new Array(indSize);
        this.fitness = 0;

        this.init();
    }

    init() {
        this.gens = Car.randomFeatures();
        /*let pos = createVector(0, -100);
        let car = new Car(pos.x, pos.y, "car" + i, feats);*/
    }
}

class GeneticAlgorithm {
    constructor(popSize, indSize, fitFunc, mutationRate) {
        this.indSize = indSize;
        this.popSize = popSize;
        this.fitFunc = fitFunc;
        this.mutationRate = mutationRate;
        this.init();
    }

    init() {
        this.population = new Array(this.popSize);
        for(let i = 0; i < this.popSize; i++) {
            // Initialize individual i randomly
            this.population[i] = new Individual(this.indSize);
        }
    }

    evolve() {
        this.evaluate();

        let matingPool = this.select();
        let newPopulation = this.reproduce(matingPool);
        this.mutate(newPopulation);

        this.population = newPopulation;

        this.evaluate();
        return this.best();
    }

    evaluate() {
        for(let i = 0; i < this.popSize; i++) {
            let individual = this.population[i];
            individual.fitness = this.fitFunc(individual.gens)
        }
    }

    select() {
        let matingPool = new Array();

        // Select this.popSize Individual to be the parents
        for(let i = 0; i < this.popSize; i++) {
            let survivor = this.rouletteWheel();
            matingPool.push(survivor);
        }

        return matingPool;
    }

    rouletteWheel() {
        let sum = 0;
        for (let i = 0; i < this.popSize; i++) {
            sum += this.population[i].fitness;
        }
        
        for (let i = 0; i < this.popSize; i++) {
            this.population[i].poss = (this.population[i].fitness / sum) * 100;
        }

        let ran = int(random(100));
        for (let i = 0; i < this.popSize; i++) {
            ran -= this.population[i].poss;
            if (ran <= 0){
                return this.population[i];
            }
        }
    }

    reproduce(matingPool) {
        let newPopulation = new Array(this.popSize);

        for(let i = 0; i < this.popSize; i++) {
            let a = int(random(this.popSize));
            let b = int(random(this.popSize));

            newPopulation[i] = this.crossover(matingPool[a], matingPool[b]);
        }

        return newPopulation;
    }

    crossover(parentA, parentB) {
        let newCar = new Array(this.indSize);
        let cross_point = int(random(this.indSize));

        let i = 0;
        for (; i < cross_point; i++){
            newCar[i] = parentA[i];
        }
        for(; i < this.indSize; i++){
            newCar[i] = parentB[i];
        }

        return newCar;
    }

    mutate(newPopulation) {
        for (let i = 0; i < this.popSize; i++){
            for (let j = 0; j < this.indSize; j++) {
                let k = int(random(100));
                    if (mutationRate * 100 > k) {
                        switch (j) {
                            case 0,2,4,6,8,10,12,14:
                                newPopulation[i].gens[j] = Car.randomAngle();
                            case 1,3,5,7,9,11,13,15:
                                newPopulation[i].gens[j] = Car.randomMagnitude();
                            case 16,18:
                                newPopulation[i].gens[j] = Car.randomVertex();
                            case 17,19:
                                newPopulation[i].gens[j] = Car.randomRadius();
                            default:
                                break;
                        }
                    }
            }
        }
    }

    best() {
        let big = 0;
        let best_car = 0;
        for (let i = 0; i < this.popSize; i++) {
            if (this.population[i].fitness > big){
                big = this.population[i].fitness;
                best_car = i;
            }
        }

        return this.population[best_car];
    }
}
