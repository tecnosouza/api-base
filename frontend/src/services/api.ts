/* eslint-disable @typescript-eslint/no-explicit-any */

/// <reference types="vite/client" />

import axios from 'axios';
import { RequestStatus, MonthlyPaymentStatus } from '../enum/enums';

const API_BASE_URL = String(import.meta.env.VITE_API_URL);
const API_VERSION = String(import.meta.env.VITE_API_VERSION);

const api = axios.create({
  baseURL: `${API_BASE_URL}/${API_VERSION}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para lidar com respostas de erro
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  name: string;
  role: string;
  id: string;
  email: string;
  profile?: {
    fullName: string;
    phone: string;
    company: string;
  };
}

export interface AuthResponse {
  data: any;
  message: string;
  token: string;
  user: User;
}

export interface FilterItem {
  column: string;
  operator: string;
  value: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  filters?: FilterItem[] | string; // Can be array or JSON string
  sortBy?: string;
  order?: 'asc' | 'desc';
  [key: string]: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    last_page: number;
  };
}

export interface Request {
  enrollment_executed_at: any;
  dataCriacao(dataCriacao: any, arg1: string): import("react").ReactNode;
  id: string;
  title: string;
  description: string;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
  person_id: string;
  document_url?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  referemce: string;
  upload_date: string;
  person_id: string;
  file_url?: string;
}

export interface MonthlyPayment {
  id: string;
  competencia: string;
  valor: number;
  data_vencimento: string;
  data_pagamento?: string;
  status: MonthlyPaymentStatus;
  forma_pagamento?: string;
  person_id: string;
}

export interface Company {
  id: string;
  cnpj: string;
  company_name: string;
  trading_name?: string;
  legal_nature?: string;
  opening_date?: string;
  share_capital?: number;
  email?: string;
  telefone?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  uf?: string;
  cep?: string;
}

/**
 * Helper function to ensure API responses have the correct structure
 * Returns a safe PaginatedResponse even if the API returns unexpected data
 */
const safePaginatedResponse = <T>(response: any): PaginatedResponse<T> => {
  return {
    data: Array.isArray(response?.data) ? response.data : [],
    pagination: response?.pagination || {
      page: 1,
      limit: 10,
      total: 0,
      last_page: 0
    }
  };
};

export const authAPI = {
  login: async (data: LoginData): Promise<AuthResponse> => {

    const payload = {
      username: data.email,
      password: data.password,
    };

    const response = await api.post('/login', payload);
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/person/me');
    return response.data;
  },
};

export default api;