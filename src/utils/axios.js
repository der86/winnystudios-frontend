// src/utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // backend API
  withCredentials: false,
});

export default instance;
