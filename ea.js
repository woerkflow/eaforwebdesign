const EA = {

    heapify(pop, n, i, category) {
        const left = 2 * i + 1
        const right = 2 * i + 2

        let largest = i
      
        if (left < n && Test.fitness(pop[left], category) > Test.fitness(pop[largest], category)) {
          largest = left
        }
      
        if (right < n && Test.fitness(pop[right], category) > Test.fitness(pop[largest], category)) {
          largest = right
        }
      
        if (largest !== i) {
          [pop[i], pop[largest]] = [pop[largest], pop[i]]
          this.heapify(pop, n, largest, category)
        }
    },
      
    buildHeap(pop, category) {
        const n = pop.length;
        const startIdx = Math.floor(n / 2) - 1;
        for (let i = startIdx; i >= 0; i--) {
            this.heapify(pop, n, i, category)
        }
        return pop
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

    crossover(chrom1, chrom2) {
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

    step(pop, cross, mutation) {
        let child1 = []
        let child2 = []
        let children = []
        for(let i = 0; i < 2; i++) {
            pop.pop()
        }
        if (cross === "true") {
            children = this.crossover(pop[0], pop[1])
        } else {
            children.push(pop[0], pop[1])
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

    stepGA(pop, category, iterations, cross, mutation) {
        for (let i = 0; i < iterations; i++) {
            const newPop = this.step(pop, cross, mutation)
            pop = this.buildHeap(newPop, category)
        }
        return pop[0]
    },

    stepFreshGA(pop, popSize, chromLength, category, iterations, cross, mutation) {
        for (let i = 0; i < iterations; i++) {
            const mutPop = this.buildHeap(this.step(pop, cross, mutation), category)
            const fittest = mutPop.slice(0, 5)
            const newPop = fittest.concat(this.genPop(popSize - 5, chromLength))
            pop = this.buildHeap(newPop, category)
        }
        return pop[0]
    },

    run(popSize, chromLength, category, iterations, refresh, cross, mutation) {
        const pop = this.buildHeap(this.genPop(popSize, chromLength), category)
        if (iterations <= 0) {
            return pop[0]
        }
        if (refresh === "true") {
            return this.stepFreshGA(pop, popSize, chromLength, category, iterations, cross, mutation)
        }
        return this.stepGA(pop, category, iterations, cross, mutation)
    }
}