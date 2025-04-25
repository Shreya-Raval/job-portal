import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import ParticlesComponent from './components/ParticleComponent';

const Home = () => {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black px-4 overflow-hidden">
      <ParticlesComponent />
      
      <div className="relative z-10 bg-gray-900 p-8 rounded-2xl shadow-xl max-w-md w-full text-center backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome to Jobify</h1>
        <h2 className="text-2xl font-light text-blue-400 mb-6">Your career journey starts here</h2>
        <p className="text-gray-300 mb-8">Connect with top employers and discover opportunities that match your skills and ambitions.</p>
        
        <div className="flex flex-col space-y-4">
          <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105">
            Login
          </Link>
          <Link to="/register" className="border border-blue-500 text-blue-400 hover:bg-blue-900 hover:bg-opacity-30 font-medium py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;