
import api, { PaginationParams } from './api';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'ADMIN' | 'USER' | 'DEV' ;
  phone?: {
    ddd: string;
    number: string;
  };
  company?: string;
}

export const usersService = {
  getAll: async (params: PaginationParams) => {
    const response = await api.get('/profiles', { params }); 
    return {
      data: response.data.profiles,
      pagination: response.data.pagination
    };
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/profile/${id}`);
    return response.data;
  },

  update: async (id: string, data: Partial<User>) => {
    const response = await api.put(`/profiles/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/profile/${id}`);
    return response.data;
  }
};
