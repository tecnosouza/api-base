import React from 'react';
import logo from '../../public/lovable-uploads/logo-pollimper.png';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 -mt-20">
      <img src={logo} alt="Logo da Empresa" className="h-max w-max" />
      <h1 className="text-4xl font-bold text-gray-800">Bem-vindo à Home!</h1>
      <p className="text-lg text-gray-600 mt-4">Esta é a página inicial da sua aplicação.</p>
    </div>
  );
};

export default Home;