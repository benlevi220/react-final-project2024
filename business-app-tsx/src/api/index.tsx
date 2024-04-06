import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export const productionURL: string = import.meta.env.VITE_API_URL as string;

export const developmentURL: string = 'http://localhost:5000';

export const baseURL: string =
  import.meta.env.VITE_NODE_ENV === 'development'
    ? developmentURL
    : productionURL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});

// List of endpoints where "Authorization" header should be excluded
const excludeAuthHeaderEndpoints: string[] = ['/login', '/signup'];

// Add an interceptor to set the "Authorization" header for requests, excluding specific endpoints
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const authToken: string | null = localStorage.getItem('bcard2');
    if (authToken && config.url) {
      // Initialize headers if undefined
      config.headers = config.headers || {};

      // Check if config.url should exclude the "Authorization" header
      if (
        !excludeAuthHeaderEndpoints.some(endpoint =>
          config.url?.endsWith(endpoint)
        )
      ) {
        config.headers['x-auth-token'] = JSON.parse(authToken);
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const errorResponse = (err: any) => ({
  message: err?.response?.data || 'Something Went Wrong',
});

export default axiosInstance;
