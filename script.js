const apiKey = "0f8a1009206260bd52341f937b69f631";
const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");

//we want to trigger a function everytime the button in the form is clicked

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  //get the value of the textbox
  const cityName = cityInputEl.value;

  getWeatherData(cityName);
});

async function getWeatherData(cityName) {
  //try and catch is one of the easiest ways to retrieve info because we deal with both situations, either you get the data or you don't
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new error("Network response was not working");
    }

    const data = await response.json();

    console.log(data);
    const temperature = Math.round(data.main.temp);
    console.log(data);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const details = [
      `Feels like: ${data.main.temp}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind Speed: ${data.wind.speed} m/s`,
    ];

    weatherDataEl.querySelector(".icon").innerHTML = `<img
            src="http://openweathermap.org/img/wn/${icon}.png"
            alt="Weather Icon"/>`;

    weatherDataEl.querySelector(".temperature").textContent = `${temperature}°`;
    weatherDataEl.querySelector(".description").textContent = description;
    weatherDataEl.querySelector(".details").innerHTML = details
      .map((details) => `<div>${details}</div>`)
      .join("");
  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";

    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".description").textContent =
      "An error happened, please try again";
    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}
