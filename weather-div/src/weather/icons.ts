import {WeatherType} from "./types.ts";

const weatherIcons = {
    [WeatherType.Clear]: 'https://openweathermap.org/img/wn/01d@2x.png',
    [WeatherType.Clouds]: 'https://openweathermap.org/img/wn/04d@2x.png',
    [WeatherType.Rain]: 'https://openweathermap.org/img/wn/10d@2x.png',
    [WeatherType.Snow]: 'https://openweathermap.org/img/wn/13d@2x.png',
    [WeatherType.Thunderstorm]: 'https://openweathermap.org/img/wn/11d@2x.png'
} satisfies Record<WeatherType, string>

export const getWeatherIcon = (weatherType: WeatherType) => {
    return weatherIcons[weatherType] || weatherIcons[WeatherType.Clear];
}

