function solve() {

    let spanElement = document.querySelector('#info span');
    let departButton = document.getElementById('depart');
    let arriveButton = document.getElementById('arrive');

    let stop = {
        next: 'depot'
    }

    async function depart() {
        departButton.disabled = true;
        spanElement.textContent = 'Loading...';

        let url = 'http://localhost:3030/jsonstore/bus/schedule/' + stop.next;

        let res = await fetch(url);
        stop = await res.json();

        spanElement.textContent = `Next stop: ${stop.name}`;
        arriveButton.disabled = false;
    }

    function arrive() {
        spanElement.textContent = `Arriving at: ${stop.name}`;
        departButton.disabled = false;
        arriveButton.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();