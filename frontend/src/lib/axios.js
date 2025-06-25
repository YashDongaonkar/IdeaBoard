import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

const api = axios.create({
    baseURL:process.env.BASE_URL
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api