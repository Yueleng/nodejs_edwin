const fs = require('fs')

if (!fs.existsSync('views')) {
    fs.mkdir('views', (err) => {
        if (err) return err
        fs.writeFile('./views/new.html', 'this is a new directory and data', (err) => {
            if (err) return err
            console.log('Directory and file saved')
        })
    })
}
