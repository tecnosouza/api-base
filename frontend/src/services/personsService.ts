
import api, { PaginationParams } from './api';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'ADMIN' | 'USER' | 'DEV' ;
  phone?: string;
  company?: string;
  is_active?: boolean;
}

export const personsService = {
  getAll: async (params: PaginationParams) => {
    const response = await api.get('/person', { params }); 
    return {
      data: response.data.data,
      pagination: response.data.pagination
    };
  },

  create: async (data: {
    name: string;
    last_name: string;
    date_of_birth: string;
    rg?: string;
    cpf: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    username: string;
    password: string;
    admin?: boolean;
  }) => {
    const response = await api.post('/person', data);
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/person/${id}`);
    return response.data;
  },

  update: async (id: string, data: Partial<User>) => {
    const response = await api.put(`/person/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/person/${id}`);
    return response.data;
  }
};
