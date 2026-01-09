export interface City {
  name: string;
  region: string;
  lat: number;
  lon: number;
  main?: boolean;
}

export interface WeatherData extends City {
  temperature: number;
  feelsLike: number;
  humidity: number;
  weatherCode: number;
  weatherDescription: string;
  weatherIcon: string;
  windSpeed: number;
  windDirection: string;
}

export interface WeatherInfo {
  description: string;
  icon: string;
}

export interface SessionData {
  username: string;
  loggedIn: boolean;
  timestamp: number;
}

export interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
}
