import { Thermometer, Droplets, Wind, Compass } from 'lucide-react';
import type { WeatherData } from '../types';

interface WeatherCardProps {
  city: WeatherData;
  isMain?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, isMain = false }) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-3xl p-6
        backdrop-blur-xl border border-white/10
        transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
        ${isMain
          ? 'col-span-full md:col-span-2 bg-gradient-to-br from-yellow-500/20 via-black/20 to-red-500/20'
          : 'bg-white/5'
        }
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className={`font-bold text-white ${isMain ? 'text-2xl' : 'text-xl'}`}>
              {city.name}
            </h2>
            <p className="text-sm text-gray-400">{city.region}</p>
          </div>
          <span className={`${isMain ? 'text-6xl' : 'text-5xl'}`}>
            {city.weatherIcon}
          </span>
        </div>

        <div className="flex items-end gap-2 mb-4">
          <span className={`font-extralight text-white ${isMain ? 'text-7xl' : 'text-5xl'}`}>
            {city.temperature}°
          </span>
          <span className="text-gray-400 text-lg mb-2">C</span>
        </div>

        <p className="text-gray-300 mb-6 capitalize">{city.weatherDescription}</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 text-gray-400">
            <div className="p-2 rounded-xl bg-white/5">
              <Thermometer className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Ressenti</p>
              <p className="text-white font-medium">{city.feelsLike}°C</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-400">
            <div className="p-2 rounded-xl bg-white/5">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Humidité</p>
              <p className="text-white font-medium">{city.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-400">
            <div className="p-2 rounded-xl bg-white/5">
              <Wind className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Vent</p>
              <p className="text-white font-medium">{city.windSpeed} km/h</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-400">
            <div className="p-2 rounded-xl bg-white/5">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Direction</p>
              <p className="text-white font-medium">{city.windDirection}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
