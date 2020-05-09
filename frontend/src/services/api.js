import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333/api',
    headers: { 'x-access-token': localStorage.getItem('token') }
});

export default api;