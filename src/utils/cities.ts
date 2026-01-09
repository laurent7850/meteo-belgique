import type { City } from '../types';

export const defaultCities: City[] = [
  { name: 'Bruxelles', region: 'Bruxelles-Capitale', lat: 50.8503, lon: 4.3517, main: true },
  { name: 'Anvers', region: 'Flandre', lat: 51.2194, lon: 4.4025 },
  { name: 'Gand', region: 'Flandre', lat: 51.0543, lon: 3.7174 },
  { name: 'Liège', region: 'Wallonie', lat: 50.6326, lon: 5.5797 },
  { name: 'Bruges', region: 'Flandre', lat: 51.2093, lon: 3.2247 },
  { name: 'Namur', region: 'Wallonie', lat: 50.4674, lon: 4.8720 },
  { name: 'Charleroi', region: 'Wallonie', lat: 50.4108, lon: 4.4446 },
  { name: 'Louvain', region: 'Flandre', lat: 50.8798, lon: 4.7005 }
];

const STORAGE_KEY = 'meteoCities';

export const loadCities = (): City[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved) as City[];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCities));
    return defaultCities;
  } catch {
    return defaultCities;
  }
};

export const saveCities = (cities: City[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
};
