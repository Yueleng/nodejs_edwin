if (process.env.NODE_ENV === 'production') {
    module.export = require('./prod-database')
} else {
    module.exports = require('./dev-database')
}