const fs = require('fs')

try {
    fs.unlinkSync('./newDir/newfile.js')
    fs.rmdirSync('./newDir')
} catch (err) {
    console.log(err)
}


