const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white/20 rounded-full" />
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-yellow-400 rounded-full animate-spin" />
      </div>
      <p className="mt-6 text-gray-400 text-lg">Chargement des données météo...</p>
    </div>
  );
};

export default LoadingSpinner;
