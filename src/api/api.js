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

export const getProducts = async ({ search, type }) => {
  try {
    const response = await axiosInstance.get("/products", {
      params: { search, type },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getUserProfile = async () => {
  try {
    const response = await apiInstance.get("/profile");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateProfile = async ({ email, password }) => {
  try {
    const response = await apiInstance.put("/profile", { email, password });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getAddressContact = async () => {
  try {
    const response = await apiInstance.get("/profile/address");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateAddressContact = async (payload) => {
  try {
    const response = await apiInstance.post("/profile/address", payload);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const addToCart = async (cartItem) => {
  try {
    const response = await apiInstance.post("/cart", cartItem);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const getCartItems = async () => {
  try {
    const response = await apiInstance.get("/cart");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch cart items");
  }
};

export const removeFromCart = async (id) => {
  try {
    const response = await apiInstance.delete(`/cart/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to remove cart item");
  }
};

export const updateCartItem = async ({ id, quantity, selected_flavour }) => {
  try {
    const response = await apiInstance.put(`/cart/${id}`, {
      ...(quantity !== undefined && { quantity }),
      ...(selected_flavour !== undefined && { selected_flavour }),
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update cart item");
  }
};

export default apiInstance;
