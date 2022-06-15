import axios from "axios";

export const axiosMiddleware = (store: any) => (next: any) => (action: any) => {
  axios.interceptors.request.use(async (config: any) => {
    config.headers.put["Content-Type"] = "application/json";

    return config;
  });

  return next(action);
};
