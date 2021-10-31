async function lockedProfile() {
    let profiles = await getAllProfiles();

    document.querySelector('.profile').remove();

    profiles.forEach((profile, userId) => {
        let htmlProfile = createProfile(userId + 1, profile);
        document.getElementById('main').appendChild(htmlProfile);
    });
}

async function getAllProfiles() {
    let url = 'http://localhost:3030/jsonstore/advanced/profiles';

    let res = await fetch(url);
    let data = await res.json();

    return Object.values(data);
}

function createProfile(userId, profile) {
    let divProfileElement = document.createElement('div');
    divProfileElement.classList.add('profile');

    //img
    let imgElement = document.createElement('img');
    imgElement.src = './iconProfile2.png';
    imgElement.classList.add('userIcon');
    divProfileElement.appendChild(imgElement);

    //lock
    let lockLabelElement = document.createElement('label');
    lockLabelElement.textContent = 'Lock';
    divProfileElement.appendChild(lockLabelElement);

    let lockInputElement = document.createElement('input');
    lockInputElement.type = 'radio';
    lockInputElement.name = `user${userId}Locked`;
    lockInputElement.value = 'lock';
    lockInputElement.checked = true;
    divProfileElement.appendChild(lockInputElement);

    //unlock
    let unlockLabelElement = document.createElement('label');
    unlockLabelElement.textContent = 'Unlock';
    divProfileElement.appendChild(unlockLabelElement);

    let unlockInputElement = document.createElement('input');
    unlockInputElement.type = 'radio';
    unlockInputElement.name = `user${userId}Locked`;
    unlockInputElement.value = 'unlock';
    divProfileElement.appendChild(unlockInputElement);

    divProfileElement.appendChild(document.createElement('br'));
    divProfileElement.appendChild(document.createElement('hr'));

    //username
    let usernameLabelElement = document.createElement('label');
    usernameLabelElement.textContent = 'Username';
    divProfileElement.appendChild(usernameLabelElement);

    let usernameInputElement = document.createElement('input');
    usernameInputElement.type = 'text';
    usernameInputElement.name = `user${userId}Username`;
    usernameInputElement.value = profile.username;
    usernameInputElement.disabled = true;
    usernameInputElement.readOnly = true;
    divProfileElement.appendChild(usernameInputElement);

    //div hidden fields
    let divHiddenFieldsElement = document.createElement('div');
    divHiddenFieldsElement.id = `user${userId}HiddenFields`;
    divHiddenFieldsElement.appendChild(document.createElement('hr'));

    //email
    let emailLabelElement = document.createElement('label');
    emailLabelElement.textContent = 'Email:';
    divHiddenFieldsElement.appendChild(emailLabelElement);

    let emailInputElement = document.createElement('input');
    emailInputElement.type = 'email';
    emailInputElement.name = `user${userId}Email`;
    emailInputElement.value = profile.email;
    emailInputElement.disabled = true;
    emailInputElement.readOnly = true;
    divHiddenFieldsElement.appendChild(emailInputElement);

    //age
    let ageLabelElement = document.createElement('label');
    ageLabelElement.textContent = 'Age:';
    divHiddenFieldsElement.appendChild(ageLabelElement);

    let ageInputElement = document.createElement('input');
    ageInputElement.type = 'email';
    ageInputElement.name = `user${userId}Age`;
    ageInputElement.value = profile.age;
    ageInputElement.disabled = true;
    ageInputElement.readOnly = true;
    divHiddenFieldsElement.appendChild(ageInputElement);

    divHiddenFieldsElement.style.display = 'none';
    divProfileElement.appendChild(divHiddenFieldsElement);

    //button
    let buttonElement = document.createElement('button');
    buttonElement.textContent = 'Show more';
    buttonElement.addEventListener('click', showHiddenInfoHandler)
    divProfileElement.appendChild(buttonElement);

    return divProfileElement;
}

function showHiddenInfoHandler(e) {
    let button = e.target;
    let lockInputElement = e.target.parentElement.querySelector('input');
    let divHiddenFieldsElement = e.target.parentElement.querySelector('div');

    if (button.textContent == 'Show more') {
        if (!lockInputElement.checked) {
            divHiddenFieldsElement.style.display = 'inline';
            button.textContent = 'Hide it';
        }
    } else {
        if (!lockInputElement.checked) {
            divHiddenFieldsElement.style.display = 'none';
            button.textContent = 'Show more';
        }
    }
}