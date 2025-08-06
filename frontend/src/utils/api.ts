import axios from "axios";

const api = axios.create({
  baseURL: "https://freelancehub-backend-h85j.onrender.com",
  withCredentials: false, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
