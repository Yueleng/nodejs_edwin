const execute = require('child_process').exec
execute('dir', (err, stdout) => {
    if (err) {
        console.log(err)
        return err
    } else {
        console.log(stdout)
    }
})