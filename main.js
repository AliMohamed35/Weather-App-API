const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput'); // Store the element, not its value here
const card = document.querySelector('.card');
const apiKey = "85f3c344b7493fe04fba8ab9239f5790";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value.toLowerCase();

    if (city) {

        try {
            let weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.log(error)
            errorMessage(error);
        }

    } else {
        errorMessage('Please enter a city name!');
    }
});


async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(apiUrl);


    if (!response.ok) {
        throw new Error("Couldn't fetch data")
    }

    return await response.json(); // makes the function wait until this promise resolves

};

function displayWeatherInfo(data) {
    console.log(data);

    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data;

    console.log(data.main.temp)

    const cityName = document.createElement('h1');
    const cityTemp = document.createElement('p');
    const cityhumidity = document.createElement('p');
    const cityDesc = document.createElement('p');
    const weatherEmoji = document.createElement('p');

    cityName.textContent = city;
    cityTemp.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    cityhumidity.textContent = `Humidity: ${humidity}`;
    cityDesc.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    card.appendChild(cityName);
    card.appendChild(cityTemp);
    card.appendChild(cityhumidity);
    card.appendChild(cityDesc);
    card.appendChild(weatherEmoji);
};

function getWeatherEmoji(weatherId) {

    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default: return "❓"
    }
};

function errorMessage(message) {
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay');

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}