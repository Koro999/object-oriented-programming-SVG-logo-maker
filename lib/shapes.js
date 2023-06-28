//parent class shapes 
//canvas is 300x200
class Shapes {
    //grabs the fillColor which is the only property all the shapes should share 
    constructor(fillColor) {
        this.fillColor = fillColor;
    }
    renderXML() {
        throw new Error('Child class must implement a render method')
    }
}
//circle class
class Circle extends shapes {
    constructor(fillColor) {
        super(fillColor)
    }
    renderXML() {
        return  `<circle cx="150" cy="100" r="20" stroke=${this.fillColor} fill=${this.fillColor} stroke-width="5"/>`
    }
}
//square class
class Square extends shapes {
    constructor(fillColor) {
        super(fillColor)
    }
    renderXML() {
        return  `<rect x="130" y="80" width="40" height="40" stroke=${this.fillColor} fill=${this.fillColor} stroke-width="5"/>`
    }
}
//triangle class 
class Triangle extends shapes {
    constructor(fillColor) {
        super(fillColor)
    }
    renderXML() {
        return  `<polygon points="130 120, 150 80, 170 120" stroke=${this.fillColor} fill=${this.fillColor} stroke-width="5"/>`
    }
}

module.exports = { Circle, Square, Triangle}
  