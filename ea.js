const EA = {

    heapify(pop, n, i, category) {
        let largest = i
        const left = 2 * i + 1
        const right = 2 * i + 2
      
        if (left < n && Test.fitness(pop[left], category) > Test.fitness(pop[largest], category)) {
          largest = left
        }
      
        if (right < n && Test.fitness(pop[right], category) > Test.fitness(pop[largest], category)) {
          largest = right
        }
      
        if (largest !== i) {
          [pop[i], pop[largest]] = [pop[largest], pop[i]]
          EA.heapify(pop, n, largest, category)
        }
    },
      
    buildHeap(pop, category) {
        const n = pop.length;
        const startIdx = Math.floor(n / 2) - 1;
        for (let i = startIdx; i >= 0; i--) {
          EA.heapify(pop, n, i, category)
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
            chrom.push(EA.getRandomInt(0, 5))
        }
        return chrom
    },

    genPop(popSize, chromLength) {
        let pop = []
        for (let i = 0; i < popSize; i++) {
            pop.push(EA.genChrom(chromLength))
        }
        return pop;
    },

    swapMutation(chrom) {
        const x = EA.getRandomInt(0, chrom.length - 1)
        const y = EA.getRandomInt(0, chrom.length - 1)
        const chrom_x = chrom[x]
        chrom[x] = chrom[y]
        chrom[y] = chrom_x
        return chrom
    },

    flipMutation(chrom) {
        const index = EA.getRandomInt(0, chrom.length - 1)
        chrom[index] = (chrom[index] + 3) % 6
        return chrom
    },

    valueMutation(chrom) {
        const index = EA.getRandomInt(0, chrom.length - 1)
        chrom[index] = EA.getRandomInt(0, 5)
        return chrom
    },

    reverseMutation(chrom) {
        const x = EA.getRandomInt(0, chrom.length - 1)
        const y = EA.getRandomInt(0, chrom.length - 1)
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
        const x = EA.getRandomInt(0, chrom1.length - 1)
        const y = EA.getRandomInt(0, chrom2.length - 1)
        const start = Math.min(x, y)
        const end = Math.max(x, y)
        const subseq1 = chrom1.slice(start, end)
        const subseq2 = chrom2.slice(start, end)
        const child1 = chrom1.slice(0, start).concat(subseq2, chrom1.slice(end))
        const child2 = chrom2.slice(0, start).concat(subseq1, chrom2.slice(end))
        return [child1, child2]
    },

    step(pop, cross, mutation) {
        let child1 = []
        let child2 = []
        let children = []

        for(let i = 0; i < 2; i++) {
            pop.pop()
        }

        //crossover
        if (cross === "true") {
            children = EA.crossover(pop[0], pop[1])
        } else {
            children.push(pop[0], pop[1])
        }

        //mutation
        if (mutation == "flip") {
            child1 = EA.flipMutation(children[0])
            child2 = EA.flipMutation(children[1])
            pop.push(child1, child2)
        } else if (mutation == "value") {
            child1 = EA.valueMutation(children[0])
            child2 = EA.valueMutation(children[1])
            pop.push(child1, child2)
        } else if (mutation == "swap") {
            child1 = EA.swapMutation(children[0])
            child2 = EA.swapMutation(children[1])
            pop.push(child1, child2)
        } else if (mutation == "reverse") {
            child1 = EA.reverseMutation(children[0])
            child2 = EA.reverseMutation(children[1])
            pop.push(child1, child2)
        }
        return pop
    },

    stepGA(pop, category, iterations, cross, mutation) {
        for (let i = 0; i < iterations; i++) {
            const newPop = EA.step(pop, cross, mutation)
            const heapPop = EA.buildHeap(newPop, category)
            pop = heapPop
        }
        return pop[0]
    },

    stepFreshGA(pop, popSize, chromLength, category, iterations, cross, mutation) {
        for (let i = 0; i < iterations; i++) {
            const mutPop = EA.buildHeap(EA.step(pop, cross, mutation), category)
            const fittest = mutPop.slice(0, 5)
            const newPop = fittest.concat(EA.genPop(popSize - 5, chromLength))
            const heapPop = EA.buildHeap(newPop, category)
            pop = heapPop
        }
        return pop[0]
    },

    run(popSize, chromLength, category, iterations, refresh, cross, mutation) {
        const pop = EA.buildHeap(EA.genPop(popSize, chromLength), category)
        if (iterations <= 0) {
            return pop[0]
        }
        if (refresh === "true") {
            return EA.stepFreshGA(pop, popSize, chromLength, category, iterations, cross, mutation)
        }
        return EA.stepGA(pop, category, iterations, cross, mutation)
    }
}