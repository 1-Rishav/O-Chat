import axios from "axios";
// "http://localhost:5001/api"
const BASE_URL = import.meta.env.MODE === "production" ? "https://o-chat-vfpl.onrender.com/api" : "/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies with the request
});
