import { create } from 'apisauce';

const api = create({
    baseURL: process.env.DEV_URL ? process.env.DEV_URL : 'https://softasks.herokuapp.com/'
});
console.log(process.env.API_URL);
api.setHeader('Authorization', 'Bearer ');

export default api;