import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5167/api/",
});

export default api;