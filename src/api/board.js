import api from './api';

export const getBoard = (dados) => api.get('/', dados);
export const addBoard = (dados) => api.post('/', dados);
