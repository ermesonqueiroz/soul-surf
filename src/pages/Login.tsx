import React from 'react';
import { useNavigate } from 'react-router-dom';
import soulSurfLogo from '../assets/soul-surf-logo.png'; // ajuste o caminho se necessário

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home'); // troque "/home" pela rota de destino desejada
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F0F8FF]">
      <img src={soulSurfLogo} alt="Soul Surf Logo" className="w-64 mb-10" />
      <button
        onClick={handleLogin}
        className="bg-[#4BA6C5] hover:bg-[#358aa7] text-white font-bold py-3 px-8 rounded-xl text-lg shadow-md transition duration-300"
      >
        Entrar
      </button>
    </div>
  );
};

export default Login;
