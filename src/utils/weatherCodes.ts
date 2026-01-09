import type { WeatherInfo } from '../types';

export const weatherCodes: Record<number, WeatherInfo> = {
  0: { description: 'Ciel dégagé', icon: '☀️' },
  1: { description: 'Principalement dégagé', icon: '🌤️' },
  2: { description: 'Partiellement nuageux', icon: '⛅' },
  3: { description: 'Couvert', icon: '☁️' },
  45: { description: 'Brouillard', icon: '🌫️' },
  48: { description: 'Brouillard givrant', icon: '🌫️' },
  51: { description: 'Bruine légère', icon: '🌧️' },
  53: { description: 'Bruine modérée', icon: '🌧️' },
  55: { description: 'Bruine dense', icon: '🌧️' },
  61: { description: 'Pluie légère', icon: '🌧️' },
  63: { description: 'Pluie modérée', icon: '🌧️' },
  65: { description: 'Pluie forte', icon: '🌧️' },
  66: { description: 'Pluie verglaçante légère', icon: '🌨️' },
  67: { description: 'Pluie verglaçante forte', icon: '🌨️' },
  71: { description: 'Neige légère', icon: '❄️' },
  73: { description: 'Neige modérée', icon: '❄️' },
  75: { description: 'Neige forte', icon: '❄️' },
  77: { description: 'Grains de neige', icon: '❄️' },
  80: { description: 'Averses légères', icon: '🌦️' },
  81: { description: 'Averses modérées', icon: '🌦️' },
  82: { description: 'Averses violentes', icon: '🌦️' },
  85: { description: 'Averses de neige légères', icon: '🌨️' },
  86: { description: 'Averses de neige fortes', icon: '🌨️' },
  95: { description: 'Orage', icon: '⛈️' },
  96: { description: 'Orage avec grêle légère', icon: '⛈️' },
  99: { description: 'Orage avec grêle forte', icon: '⛈️' }
};

export const getWeatherInfo = (code: number): WeatherInfo => {
  return weatherCodes[code] || { description: 'Inconnu', icon: '❓' };
};

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};
