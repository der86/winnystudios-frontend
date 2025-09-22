// src/utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://winnystudios-backend-8.onrender.com", // backend API
  withCredentials: false,
});

export default instance;
