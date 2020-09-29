//first
const calc = require("./calc")
const numbersToAdd = [
    3,4,10,2
]
const result = calc.sum(numbersToAdd)
console.log(`result is ${result}`)

//second
const _ = require('lodash')
console.log(_.assign({ 'a': 1 }, { 'b': 2 }, { 'c': 3 }));

//third
const fs = require('fs')
console.log("open your mind, Quade!")

fs.readFile('file.md', 'utf-8', function (err, content) {
    if (err) {
        console.log("something wrong")
        return console.log(err)
    }
    console.log(content)
})
console.log("end of all")