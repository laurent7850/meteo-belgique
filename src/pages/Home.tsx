import { Link } from 'react-router-dom';
import { RefreshCw, Shield } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';
import WeatherCard from '../components/WeatherCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home: React.FC = () => {
  const { weatherData, loading, error, lastUpdate, refresh } = useWeather();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="relative text-center mb-12 pb-8 border-b border-white/10">
          <Link
            to="/login"
            className="absolute top-0 right-0 flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-400/50 rounded-full transition-all duration-300"
          >
            <Shield className="w-4 h-4" />
            Admin
          </Link>

          <div className="text-6xl mb-4">🇧🇪</div>
          <h1 className="text-4xl sm:text-5xl font-extralight text-white tracking-wide mb-3">
            Météo Belgique
          </h1>
          <p className="text-gray-400">Conditions météorologiques en temps réel</p>
        </header>

        <main>
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400">
                <span className="text-2xl">❌</span>
                <span>{error}</span>
              </div>
              <button
                onClick={refresh}
                className="mt-6 flex items-center gap-2 mx-auto px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Réessayer
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {weatherData.map((city, index) => (
                  <WeatherCard
                    key={city.name}
                    city={city}
                    isMain={index === 0 && city.main}
                  />
                ))}
              </div>

              <div className="flex flex-col items-center mt-12">
                <button
                  onClick={refresh}
                  className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-full text-white transition-all duration-300 hover:scale-105"
                >
                  <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  Actualiser
                </button>

                {lastUpdate && (
                  <p className="mt-4 text-sm text-gray-500">
                    Dernière mise à jour : {lastUpdate.toLocaleString('fr-BE')}
                  </p>
                )}
              </div>
            </>
          )}
        </main>

        <footer className="mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
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
        </footer>
      </div>
    </div>
  );
};

export default Home;
