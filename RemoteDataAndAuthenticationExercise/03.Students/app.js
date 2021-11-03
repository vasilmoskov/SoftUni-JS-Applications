let form = document.getElementById('form');
let tableElement = document.querySelector('#results tbody');
let url = 'http://localhost:3030/jsonstore/collections/students';

function attachEvents() {
    loadStudents();
    form.addEventListener('submit', onSubmit);
}

attachEvents();

async function onSubmit(event) {
    event.preventDefault();

    let formData = new FormData(form);

    let firstName = formData.get('firstName');
    let lastName = formData.get('lastName');
    let facultyNumber = formData.get('facultyNumber');
    let grade = formData.get('grade');

    if (firstName.trim() == '' || lastName.trim() == '' || facultyNumber.trim() == '' || isNaN(Number(facultyNumber))
        || grade == '' || isNaN(Number(grade))) {
        return;
    }

    let student = {
        firstName, lastName, facultyNumber, grade
    }

    let options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    }

    let res = await fetch(url, options);
    await res.json();

    loadStudents();
}

async function loadStudents() {
    let res = await fetch(url);
    let data = await res.json();

    let students = Object.values(data);

    tableElement.replaceChildren();

    students.forEach(s => {
        let trElement = document.createElement('tr');

        let tdFirstName = document.createElement('td');
        tdFirstName.textContent = s.firstName;

        let tdLastName = document.createElement('td');
        tdLastName.textContent = s.lastName;

        let tdFacultyNumber = document.createElement('td');
        tdFacultyNumber.textContent = s.facultyNumber;

        let tdGrade = document.createElement('td');
        tdGrade.textContent = Number(s.grade).toFixed(2);

        trElement.appendChild(tdFirstName);
        trElement.appendChild(tdLastName);
        trElement.appendChild(tdFacultyNumber);
        trElement.appendChild(tdGrade);

        tableElement.appendChild(trElement);
    })
}

