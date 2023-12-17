class WeatherWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.fetchWeatherData();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
        :host {
            display: block;
            margin: 0;
            padding: 0;
            color: #ecf0f1; 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
        
          #info-weather {
            margin: auto;
            max-width: 400px;
            background-color: #2c3e50;
            color: #ecf0f1;
            font-size: 16px;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
          }
        
          #info-weather h1 {
            color: #3498db; 
            font-size: 24px;
          }
        

        
          .weather-info-label {
            font-weight: bold;
          }
        
          .weather-info-value {
            color: #f39c12; 
          }
        </style>
        <div id="info-weather">
          <h1>Weather Information</h1>
          <p id="temperature"></p>
          <p id="feels-like"></p>
          <p id="conditions"></p>
          <p id="sunrise"></p>
          <p id="sunset"></p>
          <p id="precipitation"></p>
          <p id="wind"></p>
          <p id="pressure"></p>
          <p id="humidity"></p>
          <p id="visibility"></p>
          <p id="cloudiness"></p>
          <p id="snow"></p>
          <p id="wind-direction"></p>
        </div>
      `;
  }

  fetchWeatherData() {
    const apiKey = "dd5f3a82b623c4a7d261ad991ba50c73";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${apiKey}`;

    const realApiUrl = apiUrl
      .replace("{lat}", "55.7522")
      .replace("{lon}", "37.6156");

    fetch(realApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not successful");
        }
        return response.json();
      })
      .then((data) => {
        const temperature = data.main.temp;
        const feelsLike = data.main.feels_like;
        const conditions = data.weather[0].description;
        const windSpeed = data.wind.speed;
        const pressure = data.main.pressure;
        const humidity = data.main.humidity;
        const visibility = data.visibility;
        const cloudiness = data.clouds.all;
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        const precipitation =
          data.weather[0].main === "Rain" || data.weather[0].main === "Snow"
            ? "Yes"
            : "No";
        const rainVolume = data.rain ? `${data.rain["1h"]} mm` : "N/A";
        const snowVolume = data.snow ? `${data.snow["1h"]} mm` : "N/A";
        const uvIndex = data.uvi;
        const dewPoint = data.main.dew_point;
        const windDirection = data.wind.deg;

        this.shadowRoot.getElementById(
          "temperature"
        ).innerText = `Temperature: ${temperature}°F`;
        this.shadowRoot.getElementById(
          "feels-like"
        ).innerText = `Feels like: ${feelsLike}°F`;
        this.shadowRoot.getElementById(
          "conditions"
        ).innerText = `Conditions: ${conditions}`;
        this.shadowRoot.getElementById(
          "wind"
        ).innerText = `Wind speed: ${windSpeed} m/s`;
        this.shadowRoot.getElementById(
          "pressure"
        ).innerText = `Pressure: ${pressure} hPa`;
        this.shadowRoot.getElementById(
          "humidity"
        ).innerText = `Humidity: ${humidity}%`;
        this.shadowRoot.getElementById(
          "visibility"
        ).innerText = `Visibility: ${visibility} meters`;
        this.shadowRoot.getElementById(
          "cloudiness"
        ).innerText = `Cloudiness: ${cloudiness}%`;
        this.shadowRoot.getElementById(
          "sunrise"
        ).innerText = `Sunrise: ${sunrise}`;
        this.shadowRoot.getElementById(
          "sunset"
        ).innerText = `Sunset: ${sunset}`;
        this.shadowRoot.getElementById(
          "precipitation"
        ).innerText = `Precipitation: ${precipitation}`;
        this.shadowRoot.getElementById(
          "rain"
        ).innerText = `Rain: ${rainVolume}`;
        this.shadowRoot.getElementById(
          "snow"
        ).innerText = `Snow: ${snowVolume}`;
        this.shadowRoot.getElementById(
          "uv-index"
        ).innerText = `UV Index: ${uvIndex}`;
        this.shadowRoot.getElementById(
          "dew-point"
        ).innerText = `Dew Point: ${dewPoint}°F`;
        this.shadowRoot.getElementById(
          "wind-direction"
        ).innerText = `Wind Direction: ${windDirection}°`;
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }
}

customElements.define("weather-widget", WeatherWidget);
