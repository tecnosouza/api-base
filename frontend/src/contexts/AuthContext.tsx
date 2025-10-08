import { CustomErrorToast, CustomToast } from "@/components/ui/CustomToast";
import { FormData } from "@/interfaces/FormData";
import { authAPI, User } from "@/services/api";
import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContextContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [person, setPerson] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um token salvo e validar
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setPerson(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await authAPI.login({ email, password });
      
      localStorage.setItem('auth_token', response.data.token);
      const responseUser = await authAPI.getCurrentUser();
      console.log('responseUser: ', responseUser)
      localStorage.setItem('user_data', JSON.stringify(responseUser));
      // Dados do usuário são setados aqui
      setPerson(response.data.person);

      CustomToast({ message: 'Login realizado com sucesso!' });
    } catch (error: unknown) {
      CustomErrorToast({ message: 'Erro ao fazer login' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setPerson(null);
    CustomToast({ message: 'Logout realizado com sucesso!' });
  };

  const value = {
    user: person,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
