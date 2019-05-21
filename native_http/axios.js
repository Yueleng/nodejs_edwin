const axios = require('axios')
let username = 'yueleng'
axios.get('https://api.github.com/users/' + username).then((res) => {
    console.log(res.data)
}).catch((err)=>{

})