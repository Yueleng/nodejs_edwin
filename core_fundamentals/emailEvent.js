const emitter = require('./modules/sendEmail.js')

emitter.on('emailEvent', message => {
    console.log(`Message: ${message}`)
})

emitter.emit('emailEvent', 'Send activation email to user after registration')