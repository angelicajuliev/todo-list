import axios from "axios";

const API_URL = "http://localhost:9000";
const instance = axios.create({
  baseURL: API_URL,
  timeout: 500000,
});

instance.interceptors.request.use(function (request) {
  axios.defaults.headers["Content-Type"] = "application/json";
  return request;
});

export default instance;
