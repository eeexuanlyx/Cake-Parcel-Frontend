import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const registerUser = async (registerData) => {
  try {
    const response = await axiosInstance.post("/auth/register", registerData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    }
    throw new Error("An unexpected error occured");
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await apiInstance.post("/auth/login", loginData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    }
    throw new Error("An unexpected error occurred");
  }
};

export default apiInstance;
