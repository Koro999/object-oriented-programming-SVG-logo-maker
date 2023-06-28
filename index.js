//import needed libraries 
const shapes = require('./lib/shapes')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const inquirer = require('inquirer')
const fs = require('fs')
//arrays holding basic color values, keywords and hex
const colorKeywords= ['black', 'silver', 'gray', 'white', 'maroon', 'red', 'purple', 'fuchsia', 'green', 'lime', 'olive', 'yellow', 'navy', 'blue', 'teal', 'aqua']
const colorHex = ['#000000', '#C0C0C0', '#808080', '#FFFFFF', '#800000', '#FF0000','#800080', '#FF00FF', '#008000', '#00FF00', '#808000', '#FFFF00', '#000080', '#0000FF', '#008080', '#00FFFF'  ]
//array holding questions 
const questions = [ 
    {
        type:"input",
        message: "Please enter text for logo (1-3 characters)",
        name: "logoText",
        validate: (answer) => {
            if(answer.length == 0 || answer.length > 3){
                return "Please make sure text is 1-3 characters."
            }
            return true
        }
    },
    {
        type:"input",
        message: "Enter the color of the text (basic color keyword or HEX value)",
        name: "textColor",
        validate: (answer) => {
            if (validateColorAnswer(answer) == false) {
                return "Please enter a valid basic color keyword or HEX value (https://www.w3.org/TR/css-color-3/#html4)"
            }
            return true
        }
    },
    {
        type:"list",
        message: "Enter the shape that you would like for logo",
        choices: ["circle", "square", "triangle"],
        name: "shape"
    },
    {
        type:"input",
        message: "Enter the color of the shape (basic color keyword or HEX value)",
        name: "shapeColor",
        validate: (answer) => {
            if (validateColorAnswer(answer) == false) {
                return "Please enter a valid basic color keyword or HEX value"
            }
            return true
        }
    },
]
//functions to validate color values, using .map to create arrays holding just true and false values 
const validateColorAnswer = (answer) => {
    //maps the color keyword, to compare values 
    const colorKeywordCompare = colorKeywords.map(data => {
        if(data == answer){
            return true
        }
        else {
            return false
        }
    })
    //maps the color hex, to compare values 
    const colorHexCompare = colorHex.map(data => {
        if(data == answer){
            return true
        }
        else {
            return false
        }
    })
    //pass into filter function
    return filterColorValidation(colorKeywordCompare, colorHexCompare)
}
//filters these arrays to just one value for comparison
const filterColorValidation = (keywordValidated, HexValidated) => {
    //filter both arrays to a single true or empty array
    const filterKeyword = keywordValidated.filter(data => data === true)
    const filterHex = HexValidated.filter(data => data === true)
    //if either array is reduced to a single true return true
    if (filterKeyword[0] === true || filterHex[0] === true){
        return true
    }
    //otherwise return false
    else {
        return false
    }
}
// function that calls on shapes.js to generate text 
const shapeCreate = (shape, color) => {
    shapeLowerCase = shape.toLowerCase()
    // switch statement, compare user chosen shape and run corresponding library
    switch(shapeLowerCase) {
        case "circle": {
            const circle = new shapes.Circle(color)           
            return circle.renderSVG();
        }
        case "triangle": {
            const triangle = new shapes.Triangle(color)           
            return triangle.renderSVG();
        }
        case "square": {
            const square = new shapes.Square(color)
            return square.renderSVG();
        }
    }
}
//function returning the content of the svg file
function svgContent ({logoText, textColor, shape, shapeColor}) {
    const shapeSVG = shapeCreate(shape,shapeColor)
    //text to be added into the svg file
    return `<svg version="1.1" width="300" height="200">
${shapeSVG}
<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}">${logoText}</text>\t`
}
//init function
function init() {
    //inquirer package
    inquirer.prompt(questions).then(response =>{
        //fs.writeFilesync creates the file directory, with the specific content
        fs.writeFileSync("logo.svg", svgContent(response), (err) => 
        err ? console.error(err) : console.log('Generated logo.svg'))
    })
}
//call init 
init();