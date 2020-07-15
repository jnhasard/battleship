import axios from "axios";

const default_url = "https://battleship.iic2513.phobos.cl";

export const axiosInstance = axios.create({
  baseURL: default_url,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});
