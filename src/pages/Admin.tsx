import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LogOut, Plus, Pencil, Trash2, Settings, FileText, MapPin,
  Users, Activity, Clock, Check
} from 'lucide-react';
import type { City } from '../types';
import { isAuthenticated, logout, getUsername } from '../utils/auth';
import { loadCities, saveCities } from '../utils/cities';
import Modal from '../components/Modal';

interface NewCity {
  name: string;
  region: string;
  lat: string;
  lon: string;
}

interface Stat {
  label: string;
  value: string | number;
  change: string;
  icon: React.FC<{ className?: string }>;
}

interface Tab {
  id: string;
  label: string;
  icon: React.FC<{ className?: string }>;
}

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState<City[]>([]);
  const [activeTab, setActiveTab] = useState('cities');
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [newCity, setNewCity] = useState<NewCity>({
    name: '',
    region: '',
    lat: '',
    lon: ''
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    setCities(loadCities());
  }, [navigate]);

  const showNotification = (message: string): void => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddCity = (): void => {
    if (!newCity.name || !newCity.region || !newCity.lat || !newCity.lon) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    if (cities.some(c => c.name.toLowerCase() === newCity.name.toLowerCase())) {
      alert('Cette ville existe déjà.');
      return;
    }

    const updatedCities: City[] = [...cities, {
      name: newCity.name,
      region: newCity.region,
      lat: parseFloat(newCity.lat),
      lon: parseFloat(newCity.lon)
    }];

    saveCities(updatedCities);
    setCities(updatedCities);
    setShowModal(false);
    setNewCity({ name: '', region: '', lat: '', lon: '' });
    showNotification(`La ville "${newCity.name}" a été ajoutée.`);
  };

  const handleDeleteCity = (index: number): void => {
    const city = cities[index];
    if (city.main) {
      alert('Impossible de supprimer la ville principale.');
      return;
    }

    if (confirm(`Êtes-vous sûr de vouloir supprimer "${city.name}" ?`)) {
      const updatedCities = cities.filter((_, i) => i !== index);
      saveCities(updatedCities);
      setCities(updatedCities);
      showNotification(`La ville "${city.name}" a été supprimée.`);
    }
  };

  const handleEditCity = (index: number): void => {
    const city = cities[index];
    const newName = prompt('Nom de la ville :', city.name);
    if (newName === null) return;

    const newLat = prompt('Latitude :', String(city.lat));
    if (newLat === null) return;

    const newLon = prompt('Longitude :', String(city.lon));
    if (newLon === null) return;

    const updatedCities = [...cities];
    updatedCities[index] = {
      ...city,
      name: newName.trim() || city.name,
      lat: parseFloat(newLat) || city.lat,
      lon: parseFloat(newLon) || city.lon
    };

    saveCities(updatedCities);
    setCities(updatedCities);
    showNotification(`La ville "${updatedCities[index].name}" a été modifiée.`);
  };

  const handleLogout = (): void => {
    logout();
    navigate('/login');
  };

  const stats: Stat[] = [
    { label: 'Visiteurs aujourd\'hui', value: '1,247', change: '+12%', icon: Users },
    { label: 'Villes actives', value: cities.length, change: 'Toutes opérationnelles', icon: MapPin },
    { label: 'Requêtes API', value: '45.2K', change: 'Ce mois', icon: Activity },
    { label: 'Temps de réponse', value: '124ms', change: 'Moyenne', icon: Clock },
  ];

  const tabs: Tab[] = [
    { id: 'cities', label: 'Gestion des villes', icon: MapPin },
    { id: 'settings', label: 'Paramètres', icon: Settings },
    { id: 'logs', label: 'Journaux', icon: FileText },
  ];

  return (
    <div className="min-h-screen">
      <nav className="bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-white font-semibold">
            <span className="text-2xl">🇧🇪</span>
            Météo Belgique - Admin
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm flex items-center gap-2">
              <Users className="w-4 h-4" />
              {getUsername()}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/30 rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {notification && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 flex items-center gap-2">
            <Check className="w-5 h-5" />
            {notification}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">{stat.label}</span>
                <stat.icon className="w-5 h-5 text-gray-500" />
              </div>
              <p className="text-3xl font-light text-white mb-1">{stat.value}</p>
              <p className="text-sm text-green-400">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6 border-b border-white/10 pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'text-yellow-400 border-yellow-400'
                  : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'cities' && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white">Villes configurées</h2>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-medium rounded-lg hover:shadow-lg hover:shadow-yellow-500/30 transition-all"
              >
                <Plus className="w-4 h-4" />
                Ajouter une ville
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">Ville</th>
                    <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">Région</th>
                    <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">Latitude</th>
                    <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">Longitude</th>
                    <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">Statut</th>
                    <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cities.map((city, index) => (
                    <tr key={city.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-medium text-white">{city.name}</span>
                        {city.main && (
                          <span className="ml-2 text-xs text-yellow-400">(Principal)</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-400">{city.region}</td>
                      <td className="px-6 py-4 text-gray-400">{city.lat}</td>
                      <td className="px-6 py-4 text-gray-400">{city.lon}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/30 rounded-full">
                          Actif
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditCity(index)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCity(index)}
                            disabled={city.main}
                            className={`p-2 rounded-lg transition-all ${
                              city.main
                                ? 'text-gray-600 cursor-not-allowed'
                                : 'text-gray-400 hover:text-red-400 hover:bg-red-500/10'
                            }`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Paramètres généraux</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Intervalle de mise à jour (minutes)</label>
                <input type="number" defaultValue={10} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-400/50" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Unité de température</label>
                <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-400/50">
                  <option value="celsius">Celsius (°C)</option>
                  <option value="fahrenheit">Fahrenheit (°F)</option>
                </select>
              </div>
            </div>
            <button className="mt-6 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-medium rounded-lg hover:shadow-lg hover:shadow-yellow-500/30 transition-all">
              Sauvegarder
            </button>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Journaux d'activité</h2>
            <div className="space-y-3">
              {[
                { time: '14:32:15', type: 'INFO', message: 'Connexion admin réussie' },
                { time: '14:30:00', type: 'INFO', message: 'Mise à jour météo effectuée' },
                { time: '14:15:22', type: 'ERROR', message: 'Tentative de connexion échouée' },
              ].map((log, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                  <span className="text-gray-500 text-sm">{log.time}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    log.type === 'ERROR' ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'
                  }`}>
                    {log.type}
                  </span>
                  <span className="text-gray-300">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Ajouter une ville">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Nom de la ville *</label>
            <input
              type="text"
              value={newCity.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewCity({ ...newCity, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-400/50"
              placeholder="Ex: Mons"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Région *</label>
            <select
              value={newCity.region}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setNewCity({ ...newCity, region: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-400/50"
            >
              <option value="">Sélectionner une région</option>
              <option value="Bruxelles-Capitale">Bruxelles-Capitale</option>
              <option value="Flandre">Flandre</option>
              <option value="Wallonie">Wallonie</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Latitude *</label>
              <input
                type="number"
                step="0.0001"
                value={newCity.lat}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewCity({ ...newCity, lat: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-400/50"
                placeholder="50.4542"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Longitude *</label>
              <input
                type="number"
                step="0.0001"
                value={newCity.lon}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewCity({ ...newCity, lon: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-400/50"
                placeholder="3.9523"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowModal(false)}
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all"
            >
              Annuler
            </button>
            <button
              onClick={handleAddCity}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-medium rounded-xl hover:shadow-lg hover:shadow-yellow-500/30 transition-all"
            >
              Ajouter
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Admin;
