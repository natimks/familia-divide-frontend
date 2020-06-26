import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8088'
});

export default api;