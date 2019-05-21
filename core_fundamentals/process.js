console.log(process.argv)


var flag = process.argv.indexOf('--user')
console.log(flag)

// To run the file
// console type: node process --user Alan

process.stdout.write('Ask me a question ')

process.stdin.on('data', answer => {
    console.log(answer.toString().trim())

    process.exit()
})