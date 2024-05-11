const searchButton = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");
const forecastCardDiv = document.querySelector(".forecast-card");
const currentWeatherDiv = document.querySelector(".currentWeather");
const API_Key = "4df3041d75d070a2b702feea67f93a6c";
const Cityh2 = document.querySelector("#City")
const Temph4 = document.querySelector("#Temp")
const Windh4 = document.querySelector("#Wind")
const Humidityh4 = document.querySelector("#Humidity")


function getCurrentWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${API_Key}&units=imperial`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        Cityh2.textContent = data.name
        Temph4.textContent = `Temp: ${data.main.temp}`;
        Windh4.textContent = `Wind: ${data.wind.speed}`;
        Humidityh4.textContent = `Humidity: ${data.main.humidity}`;
    })
}

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

        for(i = 0; i < selectedData.length; i++) {
            const dateH3 = document.querySelector(`#Date-${i}`);
            //const icon = document.querySelector(`#Icon-${i}`);`https://openweathermap.org/img/w/${day.weather[0].icon}.png`);
            const TempH5 = document.querySelector(`#Temp-${i}`);
            const HumidityH5 = document.querySelector(`#Humidity-${i}`);
            const WindH5 = document.querySelector(`#Wind-${i}`);

            dateH3.textContent = selectedData[0].dt_txt;
            //icon.textContent = selectedData[i].dt_txt
            TempH5.textContent = selectedData[i].main.temp;
            HumidityH5.textContent = selectedData[i].main.humidity;
            WindH5.textContent = selectedData[i].wind.speed;
        }


    })
}





searchButton.addEventListener("click", function () {
    getCurrentWeather();
    getForecastWeather()




    
})
// create a click button that gives the list of cities
//const searchButton = function (event){
//event.preventDefault(); 
//const Cityh2 = event.target.id; 
//console.log("Cityh2: ", Cityh2);
//getCurrentWeather( Cityh2);
localStorage.setItem('Cityh2', JSON.stringify(cityInput));


//};
//cityInput.addEventListener("click", searchButton);
 


