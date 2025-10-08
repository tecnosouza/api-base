import api from "./api";

const getRequestNotes = async (noteTable: string, noteReferenceId: string, page: number, limit: number) => {
  const response = await api.get(`/notes/${noteTable}/${noteReferenceId}?page=${page}&limit=${limit}`);
  return response.data;
};

const notesService = {
  getRequestNotes,
};

export default notesService;
