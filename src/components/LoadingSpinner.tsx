import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-yellow-400" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-gray-400 text-lg"
      >
        Chargement des données météo...
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
