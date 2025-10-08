
import api, { PaginationParams } from './api';

export interface Request {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  person_id: string;
  document_url?: string;
  updated_at: string;
}

export const categoriesService = {
  getAll: async (params: PaginationParams) => {
    const response = await api.get('category', { params });
    return {
      data: response.data.data,
      pagination: response.data.pagination
    };
  },
  
  findOne: async (category_id: string) => {
    const response = await api.get(`/category/${category_id}`);
    return response.data;
  },

  create: async (data: { title: string; description: string }) => {
    const response = await api.post('category', data);
    return response.data;
  },
  
  update: async (id: string, data) => {
    const response = await api.put(`category/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`category/${id}`);
    return response.data;
  }
};
