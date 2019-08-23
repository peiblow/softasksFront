import api from './api';

export const getBoard = (dados) => api.get('/', dados);
