const util = require(`util`)

module.exports.title = 'None'
module.exports.func = () => {
    util.log('Hello World')
    return 'Hello the World'
}

console.log(module)
console.log(module.exports)
console.log(module.exports.func)
console.log(module.exports.func())