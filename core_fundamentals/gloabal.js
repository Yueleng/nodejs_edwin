var path = require('path')
var name = "Alan Wang"

var newName = name.toUpperCase();

global.console.log(`newName variable is ${newName}`)

console.log(__dirname)
console.log(path.basename(__filename))