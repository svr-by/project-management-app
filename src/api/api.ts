import axios from 'axios';
import { SERVER_URL, LOCAL_STORAGE } from 'core/constants';
import { getLocalValue } from 'core/services/storageService';

const API = axios.create({ baseURL: SERVER_URL });

API.interceptors.request.use((config) => {
  const token = getLocalValue<string>(LOCAL_STORAGE.TOKEN);
  if (config.headers && token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default API;
