// // api.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
// });

// export const login = async (username, password) => {
//   return await api.post('/auth/login/', { username, password })
//     .then(res => res.data) // ✅ return just the data
//     .catch(err => {
//       // Optional: handle errors here or rethrow for caller to handle
//       throw err.response?.data || err;
//     });
// };

// export const register = async (username, password, email) => {
//   return await api.post('/auth/register/', { username, password, email })
//     .then(res => res.data)
//     .catch(err => {
//       throw err.response?.data || err;
//     });
// };

// export default api;


// api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Attach token on every request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 (unauthorized) globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Access token expired → attempt refresh
      const refresh = localStorage.getItem("refresh");

      if (refresh) {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/auth/refresh/`,
            { refresh }
          );

          const newAccess = res.data.access;
          localStorage.setItem("access", newAccess);

          // retry original request
          error.config.headers["Authorization"] = `Bearer ${newAccess}`;
          return api(error.config);
        } catch (err) {
          // refresh also failed → logout
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/login"; // force relogin
        }
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (username, password) => {
  return await api
    .post("/auth/login/", { username, password })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response?.data || err;
    });
};

export const register = async (username, password, email) => {
  return await api
    .post("/auth/register/", { username, password, email })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response?.data || err;
    });
};

export default api;
