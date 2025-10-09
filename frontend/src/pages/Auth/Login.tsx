import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.password) return;

    setIsLoading(true);
    try {
      await login(formData.username, formData.password);
      navigate("/categories");
    } catch {
      // Erros já tratados no AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-gray-900"
      style={{
        backgroundImage:
          "url('/lovable-uploads/medium-shot-men-looking-project.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Overlay escuro para contraste */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Container principal */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white/95 rounded-2xl shadow-2xl">
        <div className="text-center mb-6">
          <img
            src="/lovable-uploads/logo-pollimper-cinza.png"
            alt="Logo Polimper"
            className="mx-auto mb-3 h-14 w-auto"
          />
          <h1 className="text-3xl font-bold text-gray-900">Polimper</h1>
          <p className="text-sm text-gray-600 mt-1">Acesse sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Usuário
            </label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-600 
                         bg-white text-gray-900"
              placeholder="seu.usuario"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-600 
                         bg-white text-gray-900"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium 
                       rounded-md hover:bg-blue-700 transition 
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
