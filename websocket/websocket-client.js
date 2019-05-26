const WS = new WebSocket('ws://localhost:3232')

WS.onopen = () => {
    console.log('CONNECTION OPEN')
    displayTitle('CONNECTED TO SERVER')
}

WS.onclose = () => {
    console.log('CONNECTION CLOSED')
    displayTitle('DISCONNECTED TO SERVER')
}

function displayTitle(title) {
    document.querySelector('h1').innerHTML = title;
}

WS.onmessage = (payload) => {
    
    //console.log(payload)
    console.log(payload.data)
    displayMessage(payload.data)
}

function displayMessage(message) {
    let h1 = document.createElement('h1')
    h1.innerText = message
    document.querySelector('div.messages').appendChild(h1)
}

document.forms[0].onsubmit = () => {
    
    // onsole.log(document.getElementById('message'))
    
    let input = document.getElementById('message')
    // console.log(input.value)
    
    WS.send(input.value)
}