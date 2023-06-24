class Constructor {

    do(element, chrom) {
        const weight = ["200", "300", "400", "500", "600", "700"]
        const space = [".25", ".5", "0.75", "1", "1.25", "1.5"]
        const radius = [".125", ".25", ".375", ".5", ".75", "1"]
        const font_family = ["Verdana", "Tahoma", "Trebuchet MS", "Times New Roman", "Georgia", "Garamond"]
        let key_red = 0
        let key_green = 0
        let key_blue = 0
        let border = false
        let shadow = false
        for (let index = chrom.length - 1; index >= 0; index--) {
            switch(index) {
                case 17:
                    if (element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.tagName === "BUTTON" || element.tagName === "P") {
                        element.style.fontWeight = weight[chrom[index]]
                    }
                    break;
                case 16:
                    if (element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.tagName === "BUTTON" || element.tagName === "P") {
                        element.style.fontSize = (chrom[index] + 8) * .125 + "rem"
                    }
                    break;
                case 15:
                    if (element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.tagName === "BUTTON") {
                        element.style.padding = space[chrom[index]] + "rem"
                    }
                    break;
                case 14:
                    if (element.tagName === "LABEL") {
                        element.style.fontWeight = weight[chrom[index]]
                    }
                    break;
                case 13:
                    if (element.tagName === "LABEL") {
                        element.style.fontSize = (chrom[index] + 15) * .05 + "rem"
                    }
                    break;
                case 12:
                    if (element.tagName === "FORM") {
                        element.style.padding = space[chrom[index]] + "rem"
                    }
                    break;
                case 11:
                    if (element.tagName === "H2") {
                        element.style.fontWeight = weight[chrom[index]]
                    }
                    break;
                case 10:
                    if (element.tagName === "H2") {
                        element.style.fontSize = (chrom[index] + 5) * .5 + "rem"
                    }
                    break;
                case 9:
                    if (element.tagName === "SECTION") {
                        element.style.marginBottom = space[chrom[index]] + "rem"
                    }
                    break;
                case 8:
                    if (element.tagName === "FORM") {
                        element.style.fontFamily = font_family[chrom[index]]
                    }
                    break;
                case 7:
                    if (chrom[index] % 2 === 0) {
                        border = true;
                    } else {
                        shadow = true;
                    }
                    break;
                case 6:
                    key_blue = (chrom[index]) * 51
                    break;
                case 5:
                    key_green = (chrom[index]) * 51
                    break;
                case 4:
                    key_red = (chrom[index]) * 51
                    if ((element.tagName === "FORM" || element.tagName === "H2" || element.tagName === "INPUT" || element.tagName === "TEXTAREA")) {
                        if(border) {
                            element.style.borderColor = "rgb(" + key_red + "," + key_green + "," + key_blue + ")"
                        } else {
                            element.style.borderColor = "rgba(204,204,204, 1)"
                        }
                    }
                    if (element.tagName === "BUTTON") {
                        element.style.backgroundColor = "rgb(" + key_red + "," + key_green + "," + key_blue + ")"
                        if (((this.contrast(key_red, key_green, key_blue) + 0.05)/(this.contrast(0, 0, 0) + 0.05)) > 10.5) {
                            element.style.color = "black"
                        } else {
                            element.style.color = "white"
                        }
                    }
                    break;
                case 3:
                    if ((element.tagName === "FORM" || element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.tagName === "BUTTON")) {
                        element.style.borderRadius = radius[chrom[index]] + "rem"
                    }
                    break;
                case 2:
                    if (element.tagName === "FORM") {
                        if (border) {
                            element.style.borderWidth = (chrom[index] + 1) + "px"
                            element.style.borderStyle = "solid"
                        } else {
                            element.style.borderWidth = 1 + "px"
                            element.style.borderStyle = "solid"
                        }
                    }
                    break;
                case 1:
                    if (shadow) {
                        if(element.tagName === "FORM") {
                            element.style.boxShadow = "0rem " + chrom[index] * .125 + "rem " + chrom[index] * .25 + "rem rgba(0,0,0, " + chrom[index] * .075 + ")"
                        }
                        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
                            element.style.boxShadow = "inset 0rem " + chrom[index] * .125 + "rem " + chrom[index] * .25 + "rem rgba(0,0,0, " + chrom[index] * .03 + ")"
                        }
                    } else {
                        element.style.boxShadow = "0rem 0rem 0rem rgba(0,0,0, 0)"
                    }
                    break;
                case 0:                     
                    if (element.tagName === "H2") {
                        if (border) {
                            element.style.borderTopWidth = 0 + "px"
                            element.style.borderRightWidth = 0 + "px"
                            element.style.borderBottomWidth = chrom[index] + "px"
                            element.style.borderLeftWidth = 0 + "px"
                            element.style.borderStyle = "solid"
                        } else {
                            element.style.borderTopWidth = 0 + "px"
                            element.style.borderRightWidth = 0 + "px"
                            element.style.borderBottomWidth = 0 + "px"
                            element.style.borderLeftWidth = 0 + "px"
                            element.style.borderStyle = "none"
                        }
                    }
                    break;
            }
        }
    }

    contrast(red, green, blue) {
        return 0.2126 * (red/255) + 0.7152 * (green/255) + 0.0722 * (blue/255)
    }
}