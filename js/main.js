const weatherRegion = document.querySelector(".weather__region");
const weatherImage = document.querySelector(".weather__image");
const weatherDegree = document.querySelector(".weather__degree");
const weatherDesc = document.querySelector(".weather__desc");
const searchForm = document.querySelector(".search__form");
const searchInput = document.querySelector(".search__input");
const forecastDay = document.querySelector(".forecastday");
const weatherUpdate = document.querySelector(".weather__update");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchWeatherData(searchInput.value);
});

document.addEventListener("DOMContentLoaded", () => {
    fetchWeatherData();
});

async function fetchWeatherData(region = "Tashkent") {
    let response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=${region}&days=7&aqi=yes&alerts=yes`
    );
    response
        .json()
        .then((res) => {
            if (res.error) {
                throw new Error("Bunday shahar mavjud emas");
            }
            renderWeather(res);
        })
        .catch((err) => {
            alert(err);
        });
}

function renderWeather(data) {
    console.log(data);
    weatherRegion.innerHTML = `${data.location.name}, ${data.location.country}`;
    weatherDegree.textContent = `${data.current.temp_c}°`;
    weatherImage.src = data.current.condition.icon;
    weatherDesc.textContent = data.current.condition.text;
    weatherUpdate.innerHTML = `Last updated: ${
        data.current.last_updated.split(" ")[1]
    }`;

    let forecastdayItems = "";
    let date = new Date();
    let hour = date.getHours();

    data.forecast.forecastday[0].hour.slice(hour).forEach((el) => {
        forecastdayItems += `
            <div class="forecastday__item">
                <p>${el.time.split(" ")[1]}</p>
                <img src="${el.condition.icon}" alt="">
                <p>${el.temp_c}°</p>
            </div>
        `;
    });
    forecastDay.innerHTML = forecastdayItems;
}
