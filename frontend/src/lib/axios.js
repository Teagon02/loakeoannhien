import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5002/api",
});

// Request interceptor để tự động thêm token vào headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để xử lý lỗi token hết hạn
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Chỉ redirect đến login nếu đang ở trang admin hoặc có token trong localStorage
      const token = localStorage.getItem("accessToken");
      const currentPath = window.location.pathname;

      if (token || currentPath.startsWith("/admin")) {
        // Token hết hạn hoặc không hợp lệ
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
      // Nếu không có token và không ở trang admin, chỉ log error mà không redirect
    }
    return Promise.reject(error);
  }
);

export default api;
