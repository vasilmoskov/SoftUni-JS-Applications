async function getInfo() {

    let busId = document.getElementById('stopId').value;
    let stopNameDivElement = document.getElementById('stopName');
    let busUlElement = document.getElementById('buses');

    try {
        stopNameDivElement.textContent = 'Loading...';
        busUlElement.replaceChildren();

        if (busId == '') {
            throw new Error();
        }

        let res = await fetch('http://localhost:3030/jsonstore/bus/businfo/' + busId);
        let data = await res.json();

        stopNameDivElement.textContent = `${data.name}`;

        let buses = data.buses;

        for (let bus in buses) {
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${bus} arrives in ${buses[bus]} minutes`;
            busUlElement.appendChild(liElement);
        }

    } catch (error) {
        stopNameDivElement.textContent = 'Error';
    }
}