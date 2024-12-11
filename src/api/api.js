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

apiInstance.interceptors.response.use(
  (response) => response, // Pass-through for successful responses
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refreshToken");

    // Check for 401 errors and avoid retrying the refresh endpoint
    if (
      error.response?.status === 401 &&
      refreshToken &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        const newAccessToken = await refreshAccessToken();

        localStorage.setItem("token", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return apiInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        console.error("Interceptor caught error:", error);
        return Promise.reject(err);
      }
    }
    if (error.response?.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login"; // Redirect to login
    }

    return Promise.reject(error);
  }
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
    const { accessToken, refreshToken, user } = response.data;

    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }

    const response = await axiosInstance.post("/auth/refresh", {
      refreshToken,
    });

    if (response.data && response.data.accessToken) {
      const { accessToken } = response.data;

      localStorage.setItem("token", accessToken);

      return accessToken;
    } else {
      throw new Error("Failed to refresh access token");
    }
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
    throw error;
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
    throw new Error("Failed to fetch products");
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
    // checkAccess
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

export const checkoutCart = async (checkoutData) => {
  try {
    const response = await apiInstance.post("/invoice/checkout", checkoutData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to checkout cart");
  }
};

export const viewOrders = async () => {
  try {
    const response = await apiInstance.get("/admin/invoices");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch orders");
  }
};

export const updateOrderStatus = async ({ id, status }) => {
  try {
    const response = await apiInstance.patch(`/admin/${id}/status`, { status });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    }
    throw new Error("Failed to update order");
  }
};

export const getMyOrders = async () => {
  try {
    const response = await apiInstance.get("/invoice/my-orders");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    }
    throw new Error("Failed to get orders");
  }
};

export const viewRequests = async () => {
  try {
    const response = await apiInstance.get("/admin/requests");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    }
    throw new Error("Failed to fetch requests");
  }
};

export default apiInstance;
