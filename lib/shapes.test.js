//import library
const shapes = require('../lib/shapes')

//create a test for triangle
//need to decide test metrics
describe('', () => {
    //if statement to test 
    it('Triangle Test', () => {
        //call an instance of the triangle class
        const Triangle = new Triangle();
        
        Triangle.fillColor("blue");

        expect(Triangle.render()).toEqual('<polygon points="150, 18 244, 182 56, 182" fill="blue" />');
    })
})