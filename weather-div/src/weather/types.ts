export const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
export type Weekday = typeof daysOfWeek[number];


export type DayWeather = {
    weekday: Weekday;
    temperature: number;
    weatherType: WeatherType;
    windSpeed: number;
    description: string;
}

export type WeatherForecast = {
    city: string
    days: DayWeather[]
}

export enum WeatherType {
    Clear = 'Clear',
    Clouds = 'Clouds',
    Rain = 'Rain',
    Snow = 'Snow',
    Thunderstorm = 'Thunderstorm',
}

export type Coordinates = {
    lat: number,
    lon: number
}