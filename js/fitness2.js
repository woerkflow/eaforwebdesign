class Test {

    fitness(chrom, category) {
        let key_red = 0
        let key_green = 0
        let key_blue = 0
        let fitness = 0
        if (category === "b2b") {
            for (let index = chrom.length - 1; index >= 0; index--) {
                switch(index) {
                    case 2: // key color (B): 0 / 51 / 102 / 153 / 204 / 255
                        key_blue = chrom[index] * 51
                        break;
                    case 1: // key color (G): 0 / 51 / 102 / 153 / 204 / 255
                        key_green = chrom[index] * 51
                        break;
                    case 0: // key color (R): 0 / 51 / 102 / 153 / 204 / 255
                        key_red = chrom[index] * 51
                        if (key_blue > key_green && key_green > key_red) {
                            fitness += 1
                        } else if (key_blue > key_green && key_blue > key_red && key_green === key_red) {
                            fitness += 0.75
                        } else if (key_blue === key_green && key_blue > key_red) {
                            fitness += 0.5
                        } else if (key_blue === key_green && key_blue === key_red && key_blue < 255) {
                            fitness += 0.25
                        }
                        break;
                }
            }
        }

        if (category === "b2c") {
            for (let index = chrom.length - 1; index >= 0; index--) {
                switch(index) {
                    case 2: // key color (B): 0 / 51 / 102 / 153 / 204 / 255
                        key_blue = chrom[index] * 51
                        break;
                    case 1: // key color (G): 0 / 51 / 102 / 153 / 204 / 255
                        key_green = chrom[index] * 51
                        break;
                    case 0: // key color (R): 0 / 51 / 102 / 153 / 204 / 255
                        key_red = chrom[index] * 51
                        if (key_blue !== key_green && key_green !== key_red) {
                            fitness += 1
                        } else if ((key_red > key_green && key_green === key_blue && key_red - key_green > 51) || 
                                (key_red < key_green && key_green === key_blue && key_green - key_red > 51) ||
                                (key_green > key_red && key_red === key_blue && key_green - key_red > 51) || 
                                (key_green < key_red && key_red === key_blue && key_red - key_green > 51) ||
                                (key_blue > key_green && key_green === key_red && key_blue - key_green > 51) || 
                                (key_blue < key_green && key_green === key_red && key_green - key_blue > 51)) { 
                            fitness += 0.5
                        }
                        break;
                }  
            } 
        }

        if (category === "neutral") {
            for (let index = chrom.length - 1; index >= 0; index--) {
                switch(index) {
                    case 2: // key color (B): 0 / 51 / 102 / 153 / 204 / 255
                        key_blue = chrom[index] * 51
                        break;
                    case 1: // key color (G): 0 / 51 / 102 / 153 / 204 / 255
                        key_green = chrom[index] * 51
                        break;
                    case 0: // key color (R): 0 / 51 / 102 / 153 / 204 / 255
                        key_red = chrom[index] * 51
                        if (key_blue === key_green && key_blue === key_red && key_blue < 255) {
                            fitness += 1
                        } else if ((key_red > key_green && key_green === key_blue && key_red - key_green === 51) || 
                                   (key_red < key_green && key_green === key_blue && key_green - key_red === 51) ||
                                   (key_green > key_red && key_red === key_blue && key_green - key_red === 51) || 
                                   (key_green < key_red && key_red === key_blue && key_red - key_green === 51) ||
                                   (key_blue > key_green && key_green === key_red && key_blue - key_green === 51) || 
                                   (key_blue < key_green && key_green === key_red && key_green - key_blue === 51)) {
                            fitness += 0.5
                        } 
                        break;
                }
            }
        }
        return fitness
    }
}