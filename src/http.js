import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:4000/web/api'
});

export default http;
