import api from "../lib/axios";

const authService = {
  login: async (username, password) => {
    return await api.post("/auth/login", { username, password });
  },

  logout: async () => {
    return await api.post("/auth/logout");
  },

  // Có thể thêm các method khác như refresh token, verify token, etc.
  verifyToken: async (token) => {
    return await api.get("/auth/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default authService;
