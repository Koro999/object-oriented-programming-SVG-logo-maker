//import library
const shapes = require('../lib/shapes')

//create a test for square
describe('', () => {
    //statement to test 
    it('Square Test', () => {
        //call an instance of the square class
        const Triangle = new shapes.Square('blue');
        //what to expect of the answer
        expect(Triangle.renderSVG()).toEqual('<rect x="130" y="80" width="40" height="40" fill="blue"/>');
    })
})

//create a test for circle
describe('', () => {
    //statement to test 
    it('Circle Test', () => {
        //call an instance of the circle class
        const Triangle = new shapes.Circle('blue');
        //what to expect of the answer
        expect(Triangle.renderSVG()).toEqual('<circle cx="50%" cy="50%" r="20" fill="blue"/>');
    })
})

//create a test for triangle
describe('', () => {
    //statement to test 
    it('Triangle Test', () => {
        //call an instance of the triangle class
        const Triangle = new shapes.Triangle('blue');
        //what to expect of the answer
        expect(Triangle.renderSVG()).toEqual('<polygon points="130 120, 150 80, 170 120" fill="blue"/>');
    })
})
