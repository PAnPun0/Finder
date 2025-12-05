import axios from 'axios';

// Адрес бэкенда (пока локальный, потом поменяете на боевой)
import API_URL from './url';

const $api = axios.create({
  baseURL: API_URL,
});

// ПЕРЕХВАТЧИК (Interceptor):
// Перед каждым запросом проверяем, есть ли токен в localStorage,
// и если есть — добавляем его в заголовок Authorization.
$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = "Bearer ${token}";
  }
  return config;
});

export default $api;