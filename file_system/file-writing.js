const fs = require('fs')

fs.writeFile('./modules/data.html', 'Hello this file has just been created\n', 'utf8', 
            err => {
    if (err) return err
    console.log('The file has been saved')
})

fs.appendFile('./modules/data.html', 'Extra data appended to this file', 'utf8', 
            err => {
    if (err) return err
    console.log('The text has been appended.')
})