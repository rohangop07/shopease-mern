import axios from "axios";

const api = axios.create({
  baseURL: "https://shopease-mern-c12c.onrender.com/api",
});

export default api;