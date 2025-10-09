import React from 'react';
import logo from '/lovable-uploads/logo-pollimper.png';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 -mt-20">
      {/* Logo animada e maior */}
      <img
        src={logo}
        alt="Logo da Empresa"
        className="max-w-[480px] w-full h-auto object-contain mb-8 animate-fadeInUp"
      />

      {/* Texto principal */}
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white opacity-0 animate-fadeInDelay">
        Bem-vindo à Home!
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 opacity-0 animate-fadeInDelay2">
        Esta é a página inicial da sua aplicação.
      </p>

      {/* Animações customizadas */}
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .animate-fadeInUp {
            animation: fadeInUp 0.9s ease-out forwards;
          }

          @keyframes fadeInDelay {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .animate-fadeInDelay {
            animation: fadeInDelay 1.2s ease-out forwards;
            animation-delay: 0.4s;
          }

          .animate-fadeInDelay2 {
            animation: fadeInDelay 1.2s ease-out forwards;
            animation-delay: 0.8s;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
