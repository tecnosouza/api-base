import { User } from "@/services/api";

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface APIError extends Error {
  response?: unknown;
}

export interface APIResponse {
  data?: unknown;
  company?: string;
  cpfCnpj?: string;
  phone?: string;
  mobilePhone?: string;
  postalCode?: string;
  address?: string;
  addressNumber?: string;
  complement?: string;
  city?: string;
  state?: string;
  country?: string;
}