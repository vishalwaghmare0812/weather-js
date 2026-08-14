// weather 
console.log("weather js connected!")
const weatherform = document.querySelector(".weatherform");
const inputCity = document.querySelector(".inputCity");
const card = document.querySelector(".card");
const apiKey = "64019bc00d8f2bda5c89b9bf593a5f1d";

weatherform.addEventListener("submit", async event => {

    // don`t refresh
    event.preventDefault();
    const city = inputCity.value.toLowerCase().trim();

    if (city) {

        try {
            const weatherData = await getWeatherData(city);
            displayWeatherinfo(weatherData);
        }
        catch (error) {
            // thats error form db
            console.error(error);
            displayError(error);
        }

    } else {
        // empty or city error
        displayError("Please enter a city");
    }

});

async function getWeatherData(city) {

    // API Call / get data 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    // API data fetching
    const response = await fetch(apiUrl);

    // catch user input error (404) 
    if (!response.ok) {
        throw new Error("Cloud not fetch weather data");
    }

    // convert data in reading format as Json format
    return await response.json();

}

function displayWeatherinfo(data) {

    // JSon format data

    // obj destruction
    const { name: city, main: { humidity, temp }, weather: [{ description, id }] } = data;


    // reset card
    card.textContent = "";
    card.style.display = "flex";

    // ele creation 
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const WeatherEmoji = document.createElement("p");

    // set date
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`
    descDisplay.textContent = description;
    WeatherEmoji.textContent = getWeatherEmoji(id);

    // set css Class
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("pClass");
    humidityDisplay.classList.add("pClass")
    descDisplay.classList.add("pClass")
    WeatherEmoji.classList.add("weatherEmoji")


    // append
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(WeatherEmoji);

}

function getWeatherEmoji(weatherID) {


    switch (true) {

        case (weatherID >= 200 && weatherID < 300): return "⛈️";
        case (weatherID >= 300 && weatherID < 400): return "🌧️";
        case (weatherID >= 500 && weatherID < 600): return "🌧️";
        case (weatherID >= 600 && weatherID < 700): return "❄️";
        case (weatherID >= 700 && weatherID < 800): return "🌁";
        case (weatherID === 800): return "☀️";
        case (weatherID >= 801 && weatherID < 810): return "☁️";
        default: return "❔";
    }

}

function displayError(msg) {

    // craete ele and set value
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = msg;
    errorDisplay.classList.add("errorDisplay");

    // reset card
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);


}