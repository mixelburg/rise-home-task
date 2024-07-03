import {getWeather} from "./weather.ts";

type DivId = string | null | undefined;

const getDivById = (divId: DivId): HTMLDivElement | null => {
    if (divId) {
        return document.getElementById(divId) as HTMLDivElement | null;
    }
    return null;
};

const createDivInBody = (): HTMLDivElement => {
    const newDiv = document.createElement('div');
    document.body.appendChild(newDiv);
    return newDiv;
};

const getOrCreateDiv = (divId: DivId): HTMLDivElement => {
    const div = getDivById(divId);
    return div ? div : createDivInBody();
};

const isValidNumber = (value: string): boolean => {
    const numberRegex = /^-?\d+(\.\d+)?$/;
    return numberRegex.test(value);
}

const injectLogic = (div: HTMLDivElement): void => {
    div.innerHTML = `
        <p>Injected logic!</p>
        <label for="cityInput">Enter city:</label>
        <input type="text" id="cityInput" placeholder="City">
        <br>
        <label for="latitudeInput">Enter latitude:</label>
        <input type="text" id="latitudeInput" placeholder="Latitude" value="51.5">
        <br>
        <label for="longitudeInput">Enter longitude:</label>
        <input type="text" id="longitudeInput" placeholder="Longitude" value="-0.11">
        <br>
        <button id="submitButton">Submit</button>
    `;

    const submitButton = div.querySelector('#submitButton') as HTMLButtonElement;

    submitButton.addEventListener('click', async () => {
        const cityInput = (div.querySelector('#cityInput') as HTMLInputElement).value;
        const latitudeInput = (div.querySelector('#latitudeInput') as HTMLInputElement).value;
        const longitudeInput = (div.querySelector('#longitudeInput') as HTMLInputElement).value;

        if (!isValidNumber(latitudeInput)) {
            alert('Invalid latitude');
            return;
        }
        if (!isValidNumber(longitudeInput)) {
            alert('Invalid longitude');
            return;
        }

        console.log('City:', cityInput);
        console.log('Latitude:', latitudeInput);
        console.log('Longitude:', longitudeInput);

        await getWeather(latitudeInput, longitudeInput);

    });
};

const main = (divId?: DivId): void => {
    const targetDiv = getOrCreateDiv(divId);
    injectLogic(targetDiv);
};

// Read the div ID from the script tag attribute
const scriptTag = document.currentScript;
const divId = scriptTag?.getAttribute('data-div-id');

// Run the main function with the div ID
main(divId);
