const Test = {

    fitness(chrom, category) {
        let key_red = 0
        let key_green = 0
        let key_blue = 0
        let fitness = 0
        if (category === "b2b") {
            for (let index = chrom.length - 1; index >= 0; index--) {
                switch(index) {
                    case 17: // input/button font-weight: 200, 300, 400, 500, 600, 700
                        if (chrom[index] > 0 && chrom[index] < 5) {
                            fitness += 1
                        }
                        break;
                    case 16: // input/button font-size: 1 / 1.25 / 1.5 / 1.75 / 2 / 2.25
                        if (chrom[index] < 3) {
                            fitness += 1
                        }
                        break;
                    case 15: // input/button padding: .25 / .5 / 1 / 1.5 / 2 / 3
                        if (chrom[index] < 3) {
                            fitness += 1
                        }
                        break;
                    case 14: // label font-weight: 200, 300, 400, 500, 600, 700
                        if (chrom[index] > 0 && chrom[index] < 5) {
                            fitness += 1
                        }
                        break;
                    case 13: // label font-size: 1rem, 1.25rem, 1.5rem, 1.75rem, 2rem, 2.25rem
                        if (chrom[index] < 3) {
                            fitness += 1
                        }
                        break;
                    case 12: // form padding: .25 / .5 / 1 / 1.5 / 2 / 3
                        if (chrom[index] > 1 && chrom[index] < 4) {
                            if (chrom[index] === 2) {
                                fitness += 1
                            } else {
                                fitness += 0.5
                            }
                        }
                        break;
                    case 11: // h2 font-weight 200 / 300 / 400 / 500 / 600 / 700
                        if (chrom[index] > 0 && chrom[index] < 5) {
                            fitness += 1
                        }
                        break;
                    case 10: // h2 font-size 2.5 / 3 / 3.5 / 4 / 4.5 / 5
                        if (chrom[index] < 3) {
                            fitness += 1
                        }
                        break;
                    case 9: // section margin-tb
                        if (chrom[index] < 3) {
                            fitness += 1
                        }
                        break;
                    case 8: // font-style: Verdana, Tahoma, Trebuchet, Times, Georgia, Garamond
                        if (chrom[index] < 3) {
                            fitness += 1
                        }
                        break;
                    case 7: // form: even: border/ odd: shadow
                        if (chrom[index] % 2 === 0) {
                            fitness += 1
                        } else {
                            fitness += 1
                        }
                        break;
                    case 6: // key color (B): 0 / 51 / 102 / 153 / 204 / 255
                        key_blue = chrom[index] * 51
                        break;
                    case 5: // key color (G): 0 / 51 / 102 / 153 / 204 / 255
                        key_green = chrom[index] * 51
                        break;
                    case 4: // key color (R): 0 / 51 / 102 / 153 / 204 / 255
                        key_red = chrom[index] * 51
                        if (key_blue > key_green && key_green > key_red) {
                            fitness += 1
                        } else if (key_blue > key_green && key_blue > key_red && key_green === key_red) {
                            fitness += 0.75
                        } else if (key_blue == key_green && key_blue > key_red) {
                            fitness += 0.5
                        } else if (key_blue == key_green && key_blue == key_red && key_blue < 255) {
                            fitness += 0.25
                        }
                        break;
                    case 3: // form border-size: 0 / .25 / .5 / 1 / 2 / 4
                        if (chrom[index] < 2) {
                            if (chrom[index] === 0) {
                                fitness += 1
                            } else {
                                fitness += 0.5
                            }
                        }
                        break;
                    case 2: // form border-size: 0 / 1 / 2 / 3 / 4 / 5
                        if (chrom[index] < 3) {
                            fitness += 1
                        }
                        break;
                    case 1: // form shadow: 0 (.125rem * value) (.25rem * value) rgba(0,0,0, (.075 * value))
                        if (chrom[index] < 3) {
                            fitness += 1
                        }
                        break;
                    case 0: // border-bottom size 0 / 1 / 2 / 3 / 4 / 5
                        if (chrom[index] < 3) {
                            fitness += 1
                        }
                        break;
                }
            }
        }

        if (category === "b2c") {
            for (let index = chrom.length - 1; index >= 0; index--) {
                switch(index) {
                    case 17: // input/button font-weight: 200, 300, 400, 500, 600, 700
                        if (chrom[index] < 2 || chrom[index] > 3) {
                            fitness += 1
                        }
                        break;
                    case 16: // input/button font-size: 1 / 1.25 / 1.5 / 1.75 / 2 / 2.25
                        if (chrom[index] > 2) {
                            fitness += 1
                        }
                        break;
                    case 15: // input/button padding: .25 / .5 / 1 / 1.5 / 2 / 3
                        if (chrom[index] > 2) {
                            fitness += 1
                        }
                        break;
                    case 14: // label font-weight: 200, 300, 400, 500, 600, 700
                        if (chrom[index] < 2 || chrom[index] > 3) {
                            fitness += 1
                        }
                        break;
                    case 13: // label font-size: 1rem, 1.25rem, 1.5rem, 1.75rem, 2rem, 2.25rem
                        if (chrom[index] > 1) {
                            fitness += 1
                        }
                        break;
                    case 12: // form padding: .25 / .5 / 1 / 1.5 / 2 / 3
                        if (chrom[index] > 1 && chrom[index] < 4) {
                            if (chrom[index] === 2) {
                                fitness += 1
                            } else {
                                fitness += 0.5
                            }
                        }
                        break;
                    case 11: // h2 font-weight 200 / 300 / 400 / 500 / 600 / 700
                        if (chrom[index] < 2 || chrom[index] > 3) {
                            fitness += 1
                        }
                        break;
                    case 10: // h2 font-size 2.5 / 3 / 3.5 / 4 / 4.5 / 5
                        if (chrom[index] > 1) {
                            fitness += 1
                        }
                        break;
                    case 9: // section margin-tb
                        if (chrom[index] > 1) {
                            fitness += 1
                        }
                        break;
                    case 8: // font-style: Verdana, Tahoma, Trebuchet, Times, Georgia, Garamond
                        if (chrom[index] > 1) {
                            fitness += 1
                        }
                        break;
                    case 7: // form: even: border/ odd: shadow
                        if (chrom[index] % 2 === 1) {
                            fitness += 1
                        } else {
                            fitness += 1
                        }
                        break;
                    case 6: // key color (B): 0 / 51 / 102 / 153 / 204 / 255
                        key_blue = chrom[index] * 51
                        break;
                    case 5: // key color (G): 0 / 51 / 102 / 153 / 204 / 255
                        key_green = chrom[index] * 51
                        break;
                    case 4: // key color (R): 0 / 51 / 102 / 153 / 204 / 255
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
                    case 3: // form border-size: 0 / .25 / .5 / 1 / 2 / 4
                        if (chrom[index] < 4) {
                            if (chrom[index] < 2) {
                                fitness += 1
                            } else {
                                fitness += 0.5
                            }
                        }
                        break;
                    case 2: // form border-size: 0 / 1 / 2 / 3 / 4 / 5
                        if (chrom[index] > 2) {
                            fitness += 1
                        }
                        break;
                    case 1: // form shadow: 0 (.125rem * value) (.25rem * value) rgba(0,0,0, (.075 * value))
                        if (chrom[index] > 1) {
                            fitness += 1
                        }
                        break;
                    case 0: // border-bottom size 0 / 1 / 2 / 3 / 4 / 5
                        if (chrom[index] > 1) {
                            fitness += 1
                        }
                        break;
                }  
            } 
        }

        if (category === "neutral") {
            for (let index = chrom.length - 1; index >= 0; index--) {
                switch(index) {
                    case 17: // input/button font-weight: 200, 300, 400, 500, 600, 700
                        if (chrom[index] > 1 && chrom[index] < 4) {
                            fitness += 1
                        }
                        break;
                    case 16: // input/button font-size: 1 / 1.25 / 1.5 / 1.75 / 2 / 2.25
                        if (chrom[index] < 2) {
                            fitness += 1
                        }
                        break;
                    case 15: // input/button padding: .25 / .5 / 1 / 1.5 / 2 / 3
                        if (chrom[index] < 2) {
                            fitness += 1
                        }
                        break;
                    case 14: // label font-weight: 200, 300, 400, 500, 600, 700
                        if (chrom[index] > 1 && chrom[index] < 4) {
                            fitness += 1
                        }
                        break;
                    case 13: // label font-size: 1rem, 1.25rem, 1.5rem, 1.75rem, 2rem, 2.25rem
                        if (chrom[index] < 2) {
                            fitness += 1
                        }
                        break;
                    case 12: // form padding: .25 / .5 / 1 / 1.5 / 2 / 3
                        if (chrom[index] > 3) {
                            if (chrom[index] === 4) {
                                fitness += 1
                            } else {
                                fitness += 0.5
                            }
                        }
                        break;
                    case 11: // h2 font-weight 200 / 300 / 400 / 500 / 600 / 700
                        if (chrom[index] > 1 && chrom[index] < 4) {
                            fitness += 1
                        }
                        break;
                    case 10: // h2 font-size 2.5 / 3 / 3.5 / 4 / 4.5 / 5
                        if (chrom[index] < 2) {
                            fitness += 1
                        }
                        break;
                    case 9: // section margin-tb
                        if (chrom[index] < 2) {
                            fitness += 1
                        }
                        break;
                    case 8: // font-style: Verdana, Tahoma, Trebuchet, Times, Georgia, Garamond
                        if (chrom[index] < 2) {
                            fitness += 1
                        }
                        break;
                    case 7: // form: even: border/ odd: shadow
                        if (chrom[index] % 2 === 0) {
                            fitness += 1
                        }
                        break;
                    case 6: // key color (B): 0 / 51 / 102 / 153 / 204 / 255
                        key_blue = chrom[index] * 51
                        break;
                    case 5: // key color (G): 0 / 51 / 102 / 153 / 204 / 255
                        key_green = chrom[index] * 51
                        break;
                    case 4: // key color (R): 0 / 51 / 102 / 153 / 204 / 255
                        key_red = chrom[index] * 51
                        if (key_blue == key_green && key_blue == key_red && key_blue < 255) { 
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
                    case 3: // form border-size: 0 / .25 / .5 / 1 / 2 / 4
                        if (chrom[index] > 1) {
                            if (chrom[index] > 2) {
                                fitness += 1
                            } else {
                                fitness += 0.5
                            }
                        }
                        break;
                    case 2: // form border-size: 0 / 1 / 2 / 3 / 4 / 5
                        if (chrom[index] < 3) {
                            fitness += 1
                        }
                        break;
                    case 1: // form shadow: 0 (.125rem * value) (.25rem * value) rgba(0,0,0, (.075 * value))
                        if (chrom[index] < 2) {
                            fitness += 1
                        }
                        break;
                    case 0: // border-bottom size 0 / 1 / 2 / 3 / 4 / 5
                        if (chrom[index] < 2) {
                            fitness += 1
                        }
                        break;
                }
            }
        }
        return fitness
    }
}