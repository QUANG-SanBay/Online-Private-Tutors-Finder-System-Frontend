import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/tutorsFinder'; // <-- nếu backend có context-path '/tutorsFinder' đổi thành 'http://localhost:8080/tutorsFinder'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// mặc định chấp nhận JSON
axiosInstance.defaults.headers.common['Accept'] = 'application/json';

// Thêm token + xử lý FormData (không ép Content-Type khi là FormData)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  // ✅ Không gửi token cho endpoints /auth/** (login, register, forgot password, etc.)
  const isAuthEndpoint = config.url?.startsWith('/auth/');
  
  if (token && !isAuthEndpoint) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Nếu data là FormData, cho browser tự set Content-Type (cần có boundary)
  if (config.data && (config.data instanceof FormData)) {
    if (config.headers) delete config.headers['Content-Type'];
  } else {
    // Nếu không phải FormData, đảm bảo JSON header
    config.headers = config.headers || {};
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      // refresh token logic
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;