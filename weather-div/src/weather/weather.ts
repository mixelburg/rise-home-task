// thanks for the free key
// https://github.com/Aakashdeveloper/edu_intern_sep_22/blob/9bec79ef933e3a37f141f3d032285d38da49a8bd/extra#L176
import {Coordinates, daysOfWeek, DayWeather, WeatherForecast, WeatherType, Weekday} from "./types.ts";

const apiKey = 'fbf712a5a83d7305c3cda4ca8fe7ef29';

const getWeekday = (unixTimestamp: number): Weekday => {
    const date = new Date(unixTimestamp * 1000);
    return daysOfWeek[date.getUTCDay()];
}


const normalizeRawData = (rawData: Record<string, unknown>): WeatherForecast => {
    const days: DayWeather[] = []

    for (const day of rawData['list'] as Record<string, unknown>[]) {

        const weekday = getWeekday(day['dt'] as number)

        const weather = (day.weather as Record<string, unknown>[])[0]

        days.push({
            weekday,
            weatherType: weather.main as WeatherType,
            description: weather.description as string,
            temperature: (day.temp as Record<string, unknown>).day as number,
            windSpeed: day.speed as number,
        })
    }
    return {
        city: (rawData.city as Record<string, unknown>).name as string,
        days: days
    }
}

const getAvgWeatherPerDay = (forecast: WeatherForecast): WeatherForecast => {
    // Initialize a map to store the sums and counts for each weekday
    const weekdayStats = daysOfWeek.reduce((acc, weekday) => {
        acc[weekday] = {tempSum: 0, windSum: 0, count: 0, weatherType: [], description: []};
        return acc;
    }, {} as Record<Weekday, {
        tempSum: number;
        windSum: number;
        count: number,
        weatherType: WeatherType[],
        description: string[]
    }>);


    for (const day of forecast.days) {
        const stats = weekdayStats[day.weekday];
        stats.tempSum += day.temperature;
        stats.windSum += day.windSpeed;
        stats.weatherType.push(day.weatherType)
        stats.description.push(day.description)
        stats.count += 1;
    }

    const avgDays: DayWeather[] = daysOfWeek.map(weekday => {
        const stats = weekdayStats[weekday];
        const avgTemp = stats.count ? stats.tempSum / stats.count : 0;
        const avgWind = stats.count ? stats.windSum / stats.count : 0;

        return {
            weekday,
            temperature: avgTemp,
            weatherType: stats.weatherType[0],
            description: stats.description[0],
            windSpeed: avgWind,
        };
    });

    return {
        city: forecast.city,
        days: avgDays,
    };
};


export const getCoordinates = async (city: string): Promise<Coordinates | null> => {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${1}&appid=${apiKey}`

    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch coordinates');
    const data = await response.json() as Record<string, unknown>[];

    if (data.length) {
        return {
            lat: data[0].lat as number,
            lon: data[0].lon as number,
        }
    }
    return null
}

const getRawWeatherData = async ({lat, lon}: Coordinates) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=16&units=metric&APPID=${apiKey}`

    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch weather data');

    return await response.json();
}

export const getWeather = async (coordinates: Coordinates) => {
    const data = await getRawWeatherData(coordinates);

    const normalizedData = normalizeRawData(data);
    return getAvgWeatherPerDay(normalizedData);
}


