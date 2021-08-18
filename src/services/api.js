import axios from 'axios';

const api = axios.create({
  baseURL: 'https://trilha-teste.herokuapp.com/',
});

export default api;