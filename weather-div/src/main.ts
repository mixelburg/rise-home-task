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
    div.style.all = 'unset'; // Reset all inherited styles
    div.style.position = 'relative'; // Restore position property to allow positioning inside the div
    div.innerHTML = `
<div style="width: 200px">
    <h2 style="all: unset; font-size: 1.5em; margin: 0.5em 0;">Weather Forecast</h2>
    <label for="cityInput" style="all: unset; display: block; margin: 0.5em 0;">Enter city:</label>
    <input type="text" id="cityInput" placeholder="City" value="london" style="all: unset; display: block; width: 100%; padding: 0.5em; border: 1px solid #ccc; margin-bottom: 0.5em;">
    <label for="latitudeInput" style="all: unset; display: block; margin: 0.5em 0;">Enter latitude:</label>
    <input type="text" id="latitudeInput" placeholder="Latitude" style="all: unset; display: block; width: 100%; padding: 0.5em; border: 1px solid #ccc; margin-bottom: 0.5em;">
    <label for="longitudeInput" style="all: unset; display: block; margin: 0.5em 0;">Enter longitude:</label>
    <input type="text" id="longitudeInput" placeholder="Longitude" style="all: unset; display: block; width: 100%; padding: 0.5em; border: 1px solid #ccc; margin-bottom: 0.5em;">
    <button id="submitButton" style="all: unset; display: block; width: 100%; padding: 0.5em; background-color: #007bff; color: white; border: none; cursor: pointer; border-radius: 5px">Submit</button>
</div>
`;

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
