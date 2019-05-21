const EventEmitter = require('events').EventEmitter

let emitter = new EventEmitter()

emitter.on('newEvent', message => {
    console.log(`Message: ${message}`)
})

emitter.emit('newEvent', 'Hello guys this is Alan Wang!')