let authorElement = document.getElementsByName('author')[0];
let contentlement = document.getElementsByName('content')[0];
let sendButton = document.getElementById('submit');
let refreshButton = document.getElementById('refresh');
let messagesField = document.getElementById('messages');

function attachEvents() {
    sendButton.addEventListener('click', sendMessage);
    refreshButton.addEventListener('click', refreshHandler)
}

let url = 'http://localhost:3030/jsonstore/messenger';

async function sendMessage(event) {
    let message = {
        author: authorElement.value,
        content: contentlement.value
    }

    messagesField.value += `\n${message.author}: ${message.content}`

    authorElement.value = '';
    contentlement.value = '';

    let options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    }

    let res = await fetch(url, options);
    await res.json();
}

async function refreshHandler(event) {
    let res = await fetch(url);
    let data = await res.json();

    let messages = Object.values(data);
   
    messagesField.value = messages.map(m => `${m.author}: ${m.content}`).join('\n');
}



attachEvents();