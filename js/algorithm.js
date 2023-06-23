const EA = {

    sortByFitness(pop, category) {
        return pop.sort((chrom1, chrom2) => {
            const fitness1 = Test.fitness(chrom1, category);
            const fitness2 = Test.fitness(chrom2, category);
            return fitness2 - fitness1; // Sort in descending order
        });
    },

    getRandomInt(min, max) {
        const mini = Math.ceil(min)
        const maxi = Math.floor(max)
        return Math.floor(Math.random() * (maxi - mini + 1) + mini)
    },

    genChrom(chromLength) {
        let chrom = []
        for(let i = 0; i < chromLength; i++) {
            chrom.push(this.getRandomInt(0, 5))
        }
        return chrom
    },

    genPop(popSize, chromLength) {
        let pop = []
        for (let i = 0; i < popSize; i++) {
            pop.push(this.genChrom(chromLength))
        }
        return pop;
    },

    swapMutation(chrom) {
        const x = this.getRandomInt(0, chrom.length - 1)
        const y = this.getRandomInt(0, chrom.length - 1)
        const chrom_x = chrom[x]
        chrom[x] = chrom[y]
        chrom[y] = chrom_x
        return chrom
    },

    flipMutation(chrom) {
        const index = this.getRandomInt(0, chrom.length - 1)
        chrom[index] = (chrom[index] + 3) % 6
        return chrom
    },

    valueMutation(chrom) {
        const index = this.getRandomInt(0, chrom.length - 1)
        chrom[index] = this.getRandomInt(0, 5)
        return chrom
    },

    reverseMutation(chrom) {
        const x = this.getRandomInt(0, chrom.length - 1)
        const y = this.getRandomInt(0, chrom.length - 1)
        const start = Math.min(x, y)
        const end = Math.max(x, y)
        let left = start
        let right = end - 1
        while (left < right) {
            [chrom[left], chrom[right]] = [chrom[right], chrom[left]]
            left++
            right--
        }
        return chrom
    },

    crossoverOnePoint(chrom1, chrom2) {
        const x = this.getRandomInt(0, chrom1.length - 1)
        const subSeq1 = chrom1.slice(0, x)
        const subSeq2 = chrom2.slice(0, x)
        const child1 = subSeq2.concat(chrom1.slice(x))
        const child2 = subSeq1.concat(chrom2.slice(x))
        return [child1, child2]
    },

    crossoverTwoPoint(chrom1, chrom2) {
        const x = this.getRandomInt(0, chrom1.length - 1)
        const y = this.getRandomInt(0, chrom2.length - 1)
        const start = Math.min(x, y)
        const end = Math.max(x, y)
        const subSeq1 = chrom1.slice(start, end)
        const subSeq2 = chrom2.slice(start, end)
        const child1 = chrom1.slice(0, start).concat(subSeq2, chrom1.slice(end))
        const child2 = chrom2.slice(0, start).concat(subSeq1, chrom2.slice(end))
        return [child1, child2]
    },

    sequentialSelection(pop) {
        const selected = [];
        for (let i = 0; i < 2; i++) {
            const index = this.getRandomInt(0, pop.length - 1)
            selected.push(pop[index]);
        }
        return selected;
    },

    step(pop, selection, cross, mutation, category) {
        let child1 = []
        let child2 = []
        let children = []
        let parents = []
        //Selection
        if (selection === "true") {
            parents = this.sequentialSelection(pop, category)
        } else {
            parents.push(pop[0], pop[1])
        }
        //Crossover
        if (cross === "two") {
            children = this.crossoverTwoPoint(parents[0], parents[1])
        } else if (cross === "one") {
            children = this.crossoverOnePoint(parents[0], parents[1])
        } else {
            children.push(parents[0], parents[1])
        }
        //Mutation
        for(let i = 0; i < 2; i++) {
            pop.pop()
        }
        if (mutation === "flip") {
            child1 = this.flipMutation(children[0])
            child2 = this.flipMutation(children[1])
            pop.push(child1, child2)
        } else if (mutation === "value") {
            child1 = this.valueMutation(children[0])
            child2 = this.valueMutation(children[1])
            pop.push(child1, child2)
        } else if (mutation === "swap") {
            child1 = this.swapMutation(children[0])
            child2 = this.swapMutation(children[1])
            pop.push(child1, child2)
        } else if (mutation === "reverse") {
            child1 = this.reverseMutation(children[0])
            child2 = this.reverseMutation(children[1])
            pop.push(child1, child2)
        }
        return pop
    },

    stepGA(pop, category, iterations, selection, cross, mutation) {
        for (let i = 0; i < iterations; i++) {
            const newPop = this.step(pop, selection, cross, mutation, category)
            pop = this.sortByFitness(newPop, category)
            if (Test.fitness(pop[0], category) >= 16) {
                return pop[0]
            }
        }
        return pop[0]
    },

    stepFreshGA(pop, popSize, chromLength, category, iterations, randomRatio, selection, cross, mutation) {
        for (let i = 0; i < iterations; i++) {
            const numRandom = Math.floor(pop.length * randomRatio);
            const newPop = [];
            for (let i = 0; i < pop.length - numRandom; i++) {
                newPop.push(pop[i]);
            }
            for (let i = 0; i < numRandom; i++) {
                const randomChrom = this.genChrom();
                newPop.push(randomChrom);
            }
            pop = this.sortByFitness(newPop, category)
            pop = this.sortByFitness(this.step(pop, selection, cross, mutation, category), category)
            if (Test.fitness(pop[0], category) >= 16) {
                return pop[0]
            }
        }
        return pop[0]
    },

    run(popSize, chromLength, category, iterations, refresh, randomRatio, selection, cross, mutation) {
        const pop = this.sortByFitness(this.genPop(popSize, chromLength), category)
        if (iterations <= 0) {
            return pop[0]
        }
        if (refresh === "true") {
            return this.stepFreshGA(pop, popSize, chromLength, category, iterations, randomRatio, selection, cross, mutation)
        }
        return this.stepGA(pop, category, iterations, selection, cross, mutation)
    }
}