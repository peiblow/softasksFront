import { create } from 'apisauce';

const api = create({
    baseURL: process.env.DEV_URL ? process.env.DEV_URL : 'http://localhost:3001'
});

api.setHeader('Authorization', 'Bearer ');

export default api;