import axios from "axios";

const token: string = "";

const custom_axios = axios.create({
  baseURL: process.env.REACT_APP_REACT_BASE_URL,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default custom_axios;