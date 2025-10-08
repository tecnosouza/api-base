import api, { PaginationParams } from './api';

export interface ProductRequest {
  model: string;
  description: string;
  values: string;
  applications: string;
  is_active: boolean | string;
  category_id: string | number;
  image?: File; // opcional, apenas se houver upload
}

export const productsService = {
  getAll: async (params: PaginationParams) => {
    const response = await api.get('product', { params });
    return {
      data: response.data.data,
      pagination: response.data.pagination,
    };
  },

  findOne: async (product_id: string) => {
    const response = await api.get(`/product/${product_id}`);
    return response.data;
  },

  create: async (data: ProductRequest) => {
    const formData = new FormData();
    formData.append('model', data.model);
    formData.append('description', data.description);
    formData.append('values', data.values);
    formData.append('applications', data.applications);
    formData.append('is_active', String(data.is_active));
    formData.append('category_id', String(data.category_id));
    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await api.post('product', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  update: async (id: string, data: ProductRequest) => {
    const formData = new FormData();
    formData.append('model', data.model);
    formData.append('description', data.description);
    formData.append('values', data.values);
    formData.append('applications', data.applications);
    formData.append('is_active', String(data.is_active));
    formData.append('category_id', String(data.category_id));
    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await api.put(`product/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`product/${id}`);
    return response.data;
  },
};
