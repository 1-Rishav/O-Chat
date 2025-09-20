import axios from "axios";

const BASE_URL = "https://o-chat-vfpl.onrender.com";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies with the request
});
