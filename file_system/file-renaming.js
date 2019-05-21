const fs = require('fs')

// before running: 1. Create newfile2.js with content '//same file'
//                 2. Create directory newDir
fs.renameSync('./newfile2.js', 'newDir/newfile.js')

// before running: 1. Create new directory childDir under newDir
fs.renameSync('./newDir/childDir', './Parent')

