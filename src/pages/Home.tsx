import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RefreshCw, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWeather } from '@/hooks/useWeather';
import WeatherCard from '@/components/WeatherCard';
import LoadingSpinner from '@/components/LoadingSpinner';

const Home: React.FC = () => {
  const { weatherData, loading, error, lastUpdate, refresh } = useWeather();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative text-center mb-12 pb-8 border-b border-white/10"
        >
          <Link to="/login">
            <Button variant="ghost" size="sm" className="absolute top-0 right-0">
              <Shield className="w-4 h-4" />
              Admin
            </Button>
          </Link>

          <motion.div
            className="text-6xl mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            🇧🇪
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-extralight text-white tracking-wide mb-3">
            Météo Belgique
          </h1>
          <p className="text-gray-400">Conditions météorologiques en temps réel</p>
        </motion.header>

        <main>
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400">
                <span className="text-2xl">❌</span>
                <span>{error}</span>
              </div>
              <div className="mt-6">
                <Button variant="secondary" onClick={refresh}>
                  <RefreshCw className="w-4 h-4" />
                  Réessayer
                </Button>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {weatherData.map((city, index) => (
                  <WeatherCard
                    key={city.name}
                    city={city}
                    isMain={index === 0 && city.main}
                    index={index}
                  />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col items-center mt-12"
              >
                <Button variant="secondary" size="lg" onClick={refresh} className="group">
                  <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  Actualiser
                </Button>

                {lastUpdate && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-4 text-sm text-gray-500"
                  >
                    Dernière mise à jour : {lastUpdate.toLocaleString('fr-BE')}
                  </motion.p>
                )}
              </motion.div>
            </>
          )}
        </main>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm"
        >
          <p>
            Données fournies par{' '}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Open-Meteo
            </a>
          </p>
          <p className="mt-2">© 2025 Météo Belgique</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Home;
