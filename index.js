//import needed libraries 
const inquirer = require('inquirer')
const fs = require('fs')
const shapes = require('./lib/shapes')
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
                return "Please enter a valid basic color keyword or HEX value"
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

    return filterColorValidation(colorKeywordCompare, colorHexCompare)
}
//filters these arrays to just one value for comparison
const filterColorValidation = (keywordValidated, HexValidated) => {
    const filterKeyword = keywordValidated.filter(data => data === true)
    const filterHex = HexValidated.filter(data => data === true)

    if (filterKeyword[0] === true || filterHex[0] === true){
        return true
    }
    else {
        return false
    }
}
// function that calls on shapes.js to generate text 
const shapeCreate = (shape, color) => {
    shapeLowerCase = shape.toLowerCase()
    //compare user chosen shape and run corresponding library
    //should return a string 
    switch(shapeLowerCase) {
        case "circle": {
            const circle = shapes.Circle(color)           
            return circle;
        }
        case "triangle": {
            const triangle = shapes.Triangle(color)           
            return triangle;
        }
        case "square": {
            const square = shapes.Square(color)
           return square;
        }
    }
}

//content of the svg file
function svgContent ({text, textColor, shape, shapeColor}) {
    const shapeXML = shapeCreate(shape,shapeColor)

    return `<svg version="1.1" width="300" height="200">
    ${shapeXML}
    <text x="150" y="100" fill=${textColor}>${text}</text>
    \t`
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