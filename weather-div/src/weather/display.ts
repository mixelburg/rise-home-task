import {WeatherForecast} from "./types.ts";
import {getWeatherIcon} from "./icons.ts";

export const displayWeatherForecast = (forecast: WeatherForecast, targetDiv: HTMLElement) => {
    targetDiv.innerHTML = ''; // Clear any existing content in the target div

    targetDiv.style.fontFamily = 'Roboto, Arial, sans-serif';

    const daysContainer = document.createElement('div');
    daysContainer.style.display = 'flex';
    daysContainer.style.flexDirection = 'row';
    daysContainer.style.gap = '5px';

    for (const dayWeather of forecast.days) {

        const dayDiv = document.createElement('div');
        dayDiv.style.display = 'flex';
        dayDiv.style.flexDirection = 'column';
        dayDiv.style.gap = '5px';
        dayDiv.style.border = '1px solid #ccc';
        dayDiv.style.padding = '5px';
        dayDiv.style.textAlign = 'center';
        dayDiv.style.width = '100px';

        const dayHeader = document.createElement('div');
        dayHeader.style.fontSize = '1em';
        dayHeader.style.fontWeight = '700';
        dayHeader.textContent = dayWeather.weekday;
        dayDiv.appendChild(dayHeader);

        const iconImg = document.createElement('img');
        iconImg.src = getWeatherIcon(dayWeather.weatherType);
        iconImg.alt = dayWeather.weatherType;
        dayDiv.appendChild(iconImg);

        const descriptionP = document.createElement('div');
        descriptionP.style.fontWeight = '700';
        descriptionP.textContent = dayWeather.description;
        dayDiv.appendChild(descriptionP);

        const temperatureP = document.createElement('div');
        temperatureP.style.fontSize = '2em';
        temperatureP.textContent = `${Math.ceil(dayWeather.temperature)}°C`;
        dayDiv.appendChild(temperatureP);

        const windSpeedP = document.createElement('div');
        // make font size smaller
        windSpeedP.style.fontSize = '0.8em';
        windSpeedP.textContent = `Wind Speed: ${Math.ceil(dayWeather.windSpeed)} km/h`;
        dayDiv.appendChild(windSpeedP);


        daysContainer.appendChild(dayDiv);
    }

    targetDiv.appendChild(daysContainer);
};