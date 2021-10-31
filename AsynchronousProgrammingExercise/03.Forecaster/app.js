async function attachEvents() {

    let location = document.getElementById('location');

    let symbols = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°',
    }

    let forecastElement = document.getElementById('forecast');
    let currentElement = document.getElementById('current');
    let upcomingElement = document.getElementById('upcoming');

    let button = document.getElementById('submit');

    button.addEventListener('click', getWeather);

    async function getWeather() {
        currentElement.replaceChildren();

        if(forecastElement.children.length == 3) {
            forecastElement.children[2].remove();
        }

        if (upcomingElement.children.length > 1) {
            upcomingElement.children[1].remove();
        }

        let url = 'http://localhost:3030/jsonstore/forecaster/locations';

        let res = await fetch(url);
        let data = await res.json();


        try {
            let city = Array.from(data).find(l => l.name == location.value);

            if (city == undefined) {
                throw new Error('Error');
            }
    
            let locationCode = city.code;
    
            forecastElement.style.display = 'block';
    
            getCurrentCondition(locationCode);
            getUpcomingCondition(locationCode);

        } catch {
            let errorElement = document.createElement('div');
            errorElement.classList.add('label');
            errorElement.textContent = 'Error';
            forecastElement.appendChild(errorElement);
        } 

        location.value = '';
    }

    async function getCurrentCondition(locationCode) {
        let res = await fetch('http://localhost:3030/jsonstore/forecaster/today/' + locationCode);
        let data = await res.json();

        let forecast = data.forecast;

        let lowTemp = forecast.low;
        let highTemp = forecast.high;
        let condition = forecast.condition;

        //1. div 
        let divForecasts = document.createElement('div');
        divForecasts.classList.add('forecasts');

        //1.1 span symbol
        let spanSymobl = document.createElement('span');
        spanSymobl.classList.add('condition', 'symbol');
        spanSymobl.textContent = symbols[condition];

        //1.2 span condition
        let spanCondition = document.createElement('span');
        spanCondition.classList.add('condition');

        //1.2.1 span location
        let spanLocation = document.createElement('span');
        spanLocation.classList.add('forecast-data');
        spanLocation.textContent = data.name;

        //1.2.2 span grades
        let spanGrades = document.createElement('span');
        spanGrades.classList.add('forecast-data');
        spanGrades.textContent = `${lowTemp}${symbols.Degrees}/${highTemp}${symbols.Degrees}`;

        //1.2.3 span concrete condition 
        let spanConcreteCondition = document.createElement('span');
        spanConcreteCondition.classList.add('forecast-data');
        spanConcreteCondition.textContent = condition;

        //apend to div 1.2
        spanCondition.appendChild(spanLocation);
        spanCondition.appendChild(spanGrades);
        spanCondition.appendChild(spanConcreteCondition);

        // apend to div 1
        currentElement.appendChild(spanSymobl);
        currentElement.appendChild(spanCondition);
    }

    async function getUpcomingCondition(locationCode) {
        let res = await fetch('http://localhost:3030/jsonstore/forecaster/upcoming/' + locationCode);
        let data = await res.json();

        let forecasInfoDiv = document.createElement('div');
        forecasInfoDiv.classList.add('forecast-info');

        let forecastArr = data.forecast;

        for (const forecast of forecastArr) {
            let lowTemp = forecast.low;
            let highTemp = forecast.high;
            let condition = forecast.condition;

            //1. div 
            let divForecasts = document.createElement('span');
            divForecasts.classList.add('upcomming');

            //1.1 span symbol
            let spanSymobl = document.createElement('span');
            spanSymobl.classList.add('symbol');
            spanSymobl.textContent = symbols[condition];

            //1.2.2 span grades
            let spanGrades = document.createElement('span');
            spanGrades.classList.add('forecast-data');
            spanGrades.textContent = `${lowTemp}${symbols.Degrees}/${highTemp}${symbols.Degrees}`;

            //1.2.3 span concrete condition 
            let spanConcreteCondition = document.createElement('span');
            spanConcreteCondition.classList.add('forecast-data');
            spanConcreteCondition.textContent = condition;

            //apend to div 1.2
            divForecasts.appendChild(spanSymobl);
            divForecasts.appendChild(spanGrades);
            divForecasts.appendChild(spanConcreteCondition);

            // apend to div 1
            forecasInfoDiv.appendChild(divForecasts);
        }

        upcomingElement.appendChild(forecasInfoDiv);
    }
}

attachEvents();