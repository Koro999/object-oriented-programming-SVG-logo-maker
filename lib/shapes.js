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
class Circle extends Shapes {
    constructor(fillColor) {
        super(fillColor)
    }
    renderSVG() {
        return  `<circle cx="50%" cy="50%" r="20" fill="${this.fillColor}"/>`
    }
}
//square class
class Square extends Shapes {
    constructor(fillColor) {
        super(fillColor)
    }
    renderSVG() {
        return  `<rect x="130" y="80" width="40" height="40" fill="${this.fillColor}"/>`
    }
}
//triangle class 
class Triangle extends Shapes {
    constructor(fillColor) {
        super(fillColor)
    }
    renderSVG() {
        return  `<polygon points="130 120, 150 80, 170 120" fill="${this.fillColor}"/>`
    }
}

module.exports = { Shapes, Circle, Square, Triangle}
  