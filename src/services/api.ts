import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.96:3333',
    //'http://192.168.1.70:3333',
});

export default api;