
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

export const filesService = {
  getAll: async (params: PaginationParams) => {
    const response = await api.get('/files', { params });

    return {
      data: response.data.files,
      pagination: response.data.pagination 
    };
  },

  downloadCsv: async () => {
  const response = await api.get('/files/export/csv', {
    responseType: 'blob',
    validateStatus: (status) => status >= 200 && status < 300 || status === 204
  });

  if (response.status === 204) {
    // Nenhum conteúdo — lançar um erro para ser tratado no catch
    throw new Error("Nenhum aluno disponível para exportação.");
  }

  const blob = new Blob([response.data], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'alunos.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

};
