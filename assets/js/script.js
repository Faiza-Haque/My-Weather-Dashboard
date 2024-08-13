const searchButton = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");
const forecastCardDiv = document.querySelector(".forecast-card");
const currentWeatherDiv = document.querySelector(".currentWeather");
const API_Key = "4df3041d75d070a2b702feea67f93a6c";
const Cityh2 = document.querySelector("#City")
const Temph4 = document.querySelector("#Temp")
const Windh4 = document.querySelector("#Wind")
const Humidityh4 = document.querySelector("#Humidity")
const firstIcondiv = document.querySelector("#Icon")
const Dateh4 = document.querySelector("#Today-Date")

const searchHistoryDiv = document.querySelector("#search-history")
// Function to get current weather data from the API
function getCurrentWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${API_Key}&units=imperial`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            Cityh2.textContent = data.name
            Temph4.textContent = `Temp: ${data.main.temp}`;
            Dateh4.textContent = dayjs(data.dt * 1000).format("MM/DD/YYYY");
            Windh4.textContent = `Wind: ${data.wind.speed}`;
            Humidityh4.textContent = `Humidity: ${data.main.humidity}`;
            const iconImg = document.createElement("img");
            firstIcondiv.innerHTML = ""
            firstIcondiv.appendChild(iconImg);
            iconImg.alt = "forecast"
            iconImg.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        })
}
// Function to get forecast data from the API
function getForecastWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&appid=${API_Key}&units=imperial`)
        .then(res => res.json())
        .then(data => {
            console.log("Date for 5 day forecast")
            console.log(data)

            const selectedData = [
                data.list[0],
                data.list[8],
                data.list[16],
                data.list[24],
                data.list[32],
            ]

            console.log(selectedData)

            for (i = 0; i < selectedData.length; i++) {
                const dateH3 = document.querySelector(`#Date-${i}`);
                const iconDiv = document.querySelector(`#Icon-${i}`);

                const TempH5 = document.querySelector(`#Temp-${i}`);
                const HumidityH5 = document.querySelector(`#Humidity-${i}`);
                const WindH5 = document.querySelector(`#Wind-${i}`);

                dateH3.textContent = dayjs(selectedData[i].dt * 1000).format("MM/DD/YYYY");
                const iconImg = document.createElement("img");
                iconDiv.innerHTML = ""
                iconDiv.appendChild(iconImg);
                iconImg.alt = "forecast"
                iconImg.src = `https://openweathermap.org/img/w/${selectedData[i].weather[0].icon}.png`;
                //icon.textContent = selectedData[i].dt_txt
                TempH5.textContent = `Temp: ${selectedData[i].main.temp}`;
                HumidityH5.textContent = `Humidity: ${selectedData[i].main.humidity}`;
                WindH5.textContent = `Wind Speed: ${selectedData[i].wind.speed}`
            }


        })
}

searchButton.addEventListener("click", function () {
    getCurrentWeather();
    getForecastWeather()

    const citiesArr = JSON.parse(localStorage.getItem('Cityh2')) || [];
    citiesArr.push(cityInput.value);

    localStorage.setItem('Cityh2', JSON.stringify(citiesArr));
    loadSearchhistory()
})
// invoke a function
// Function to load the search history
function loadSearchhistory() {
    const savedCities = JSON.parse(localStorage.getItem('Cityh2')) || [];
    //                      0            1             2
    if (savedCities) {



        searchHistoryDiv.innerHTML = ""

        for (i = 0; i < savedCities.length; i++) {
            let citiesBtn = document.createElement("button");
            citiesBtn.textContent = savedCities[i];
            citiesBtn.addEventListener("click", function (event) {

                console.log(event.target.textContent)

                cityInput.value = event.target.textContent
                searchButton.click()

                // https://api.openweathermap.org/data/2.5/forecast?q=&appid=4df3041d75d070a2b702feea67f93a6c&units=imperial


            })

            searchHistoryDiv.append(citiesBtn);
        }

        console.log(savedCities)
        getCurrentWeather(savedCities[0]);
        getForecastWeather(savedCities[0])
    }
}
loadSearchhistory()
