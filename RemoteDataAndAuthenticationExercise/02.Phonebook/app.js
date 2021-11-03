function attachEvents() {
    let loadButton = document.getElementById('btnLoad');
    let createButton = document.getElementById('btnCreate');

    loadButton.addEventListener('click', loadContacts);
    createButton.addEventListener('click', createContact);
}

let personInput = document.getElementById('person')
let phoneInput = document.getElementById('phone')

let phonebookList = document.getElementById('phonebook');

async function createContact() {
    let contact = {
        person: personInput.value,
        phone: phoneInput.value
    };

    personInput.value = '';
    phoneInput.value = '';

    let options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    }

    let res = await fetch('http://localhost:3030/jsonstore/phonebook', options);
    await res.json();

    loadContacts();
}

async function loadContacts(e) {
    let res = await fetch('http://localhost:3030/jsonstore/phonebook');
    let data = await res.json();

    let contacts = Object.values(data);

    phonebookList.replaceChildren();

    contacts.forEach(c => {
        let liElement = document.createElement('li');
        liElement.textContent = `${c.person}: ${c.phone}`;

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', deleteContact.bind(null, liElement, c._id));

        liElement.appendChild(deleteButton);
        phonebookList.appendChild(liElement);
    })
}

async function deleteContact(contactElement, id) {
    contactElement.remove();

    let res = await fetch(`http://localhost:3030/jsonstore/phonebook/${id}`, {
        method: 'delete'
    });

    await res.json();
}

attachEvents();