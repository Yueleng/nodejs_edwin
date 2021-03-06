const mongoose = require('mongoose')

const User = mongoose.model('users', { // same name as the database
    firstName: {
        type: String,
        requred: true,
        minlength: 4,
        trim: true
    },

    lastName: {
        type: String,
        requred: true,
        minlength: 4,
        trim: true
    },

    isActive: {
        type: Number,
        default: 0
    }
})

module.exports = User