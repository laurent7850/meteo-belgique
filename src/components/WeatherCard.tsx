import { motion } from 'framer-motion';
import { Thermometer, Droplets, Wind, Compass } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { WeatherData } from '@/types';

interface WeatherCardProps {
  city: WeatherData;
  isMain?: boolean;
  index?: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, isMain = false, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={cn(isMain && 'col-span-full md:col-span-2')}
    >
      <Card
        className={cn(
          'relative overflow-hidden p-6 h-full',
          'transition-shadow duration-300 hover:shadow-2xl hover:shadow-yellow-500/10',
          isMain && 'bg-gradient-to-br from-yellow-500/20 via-black/20 to-red-500/20'
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className={cn('font-bold text-white', isMain ? 'text-2xl' : 'text-xl')}>
                {city.name}
              </h2>
              <p className="text-sm text-gray-400">{city.region}</p>
            </div>
            <motion.span
              className={cn(isMain ? 'text-6xl' : 'text-5xl')}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {city.weatherIcon}
            </motion.span>
          </div>

          <div className="flex items-end gap-2 mb-4">
            <motion.span
              className={cn('font-extralight text-white', isMain ? 'text-7xl' : 'text-5xl')}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            >
              {city.temperature}°
            </motion.span>
            <span className="text-gray-400 text-lg mb-2">C</span>
          </div>

          <p className="text-gray-300 mb-6 capitalize">{city.weatherDescription}</p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Thermometer, label: 'Ressenti', value: `${city.feelsLike}°C` },
              { icon: Droplets, label: 'Humidité', value: `${city.humidity}%` },
              { icon: Wind, label: 'Vent', value: `${city.windSpeed} km/h` },
              { icon: Compass, label: 'Direction', value: city.windDirection },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 + i * 0.1 }}
                className="flex items-center gap-3 text-gray-400"
              >
                <div className="p-2 rounded-xl bg-white/5 backdrop-blur-sm">
                  <item.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="text-white font-medium">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default WeatherCard;
