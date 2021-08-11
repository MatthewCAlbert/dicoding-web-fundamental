import axios from "axios";

const ApiProvider = () => {
  const baseURL = "https://moop.hexalogi.cyou/api/v1/";
  // const baseURL = "http://localhost:5000/api/v1/";
  const storageKey = "api_dicoding_moop_token";

  const axiosInstance = axios.create({
    baseURL,
    timeout: 1000 * 5,
  });

  axiosInstance.interceptors.request.use((config) => {
    const currentToken = localStorage.getItem(storageKey) || "";
    config.headers.common["Authorization"] = `${currentToken}`;
    config.headers.common["Access-Control-Allow-Origin"] = "*";

    return config;
  });

  axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response && err.response.status === 401) {
        return Promise.reject(err);
      }
    }
  );

  return axiosInstance;
};

export default ApiProvider;
