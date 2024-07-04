import {getCoordinates, getWeather} from "./weather/weather.ts";
import {Coordinates} from "./weather/types.ts";
import {DivId, getOrCreateDiv, isValidNumber} from "./utils.ts";
import {displayWeatherForecast} from "./weather/display.ts";


const loadRobotoFont = () => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
};


const injectLogic = (div: HTMLDivElement): void => {
    div.innerHTML = `
<div style="width: 300px">
<h2>weather forecast</h2>
        <label for="cityInput">Enter city:</label>
        <input type="text" id="cityInput" placeholder="City" value="london  ">
        <br>
        <label for="latitudeInput">Enter latitude:</label>
        <input type="text" id="latitudeInput" placeholder="Latitude">
        <br>
        <label for="longitudeInput">Enter longitude:</label>
        <input type="text" id="longitudeInput" placeholder="Longitude">
        <br>
        <button id="submitButton">Submit</button>
</div>
    `;
    div.style.all = 'unset';

    const submitButton = div.querySelector('#submitButton') as HTMLButtonElement;

    submitButton.addEventListener('click', async () => {
        const cityInput = (div.querySelector('#cityInput') as HTMLInputElement).value;
        const latitudeInput = (div.querySelector('#latitudeInput') as HTMLInputElement).value;
        const longitudeInput = (div.querySelector('#longitudeInput') as HTMLInputElement).value;

        let coordinates: Coordinates | null = null;
        if (cityInput) {
            try {
                coordinates = await getCoordinates(cityInput);
            } catch (err) {
                console.error('Failed to get coordinates:', err);
                alert(`Failed to get coordinates: ${err}`)
            }
        } else {
            if (!isValidNumber(latitudeInput)) {
                alert('Invalid latitude');
                return;
            }
            if (!isValidNumber(longitudeInput)) {
                alert('Invalid longitude');
                return;
            }
            coordinates = {
                lat: parseFloat(latitudeInput),
                lon: parseFloat(longitudeInput)
            };
        }
        if (!coordinates) {
            alert('Failed to get coordinates');
            return;
        }

        console.log('City:', cityInput);
        console.log('Coords', coordinates);

        try {
            const weather = await getWeather(coordinates);
            console.log(weather)
            displayWeatherForecast(weather, div);
        } catch (err) {
            console.error('Failed to get weather:', err);
            alert(`Failed to get weather: ${err}`)
        }
    });
};

const main = (divId?: DivId): void => {
    loadRobotoFont();

    const targetDiv = getOrCreateDiv(divId);
    injectLogic(targetDiv);
};

// Read the div ID from the script tag attribute
const scriptTag = document.currentScript;
const divId = scriptTag?.getAttribute('data-div-id');

// Run the main function with the div ID
main(divId);
