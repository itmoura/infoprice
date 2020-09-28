import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:7888'
});

export default api;