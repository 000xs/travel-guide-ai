import axios from "axios";
import { getSession } from "next-auth/react";

// Base API URL
const baseUrl = process.env.NEXT_PUBLIC_API_URL

// Axios instance
const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensure cookies are sent with requests
});

// Placeholder function to update the session with a new access token
const updateSession = async (updatedSession) => {
  // Implement this function to update the session in your app
  console.log("Updated session:", updatedSession);
};

// Request Interceptor: Attaches access tokens to outgoing requests
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const session = await getSession();
      console.log("Session in request interceptor:", session); // Debugging: Log the session

      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      } else {
        console.warn("No access token found in session"); // Debugging: Log missing token
      }

      return config;
    } catch (error) {
      console.error("Error in request interceptor:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor: Handles token refresh on 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const session = await getSession();
        const refreshToken = session?.refreshToken;

        if (refreshToken) {
          // Attempt to refresh the token
          const refreshResponse = await axios.post(`${baseUrl}/auth/refresh`, {
            refreshToken,
          });

          const newAccessToken = refreshResponse.data.accessToken;

          // Update the session with the new access token
          const updatedSession = { ...session, accessToken: newAccessToken };
          await updateSession(updatedSession);

          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        if (typeof window !== "undefined") {
          window.location.href = "/auth/signin"; // Redirect to sign-in page
        }
      }
    }

    return Promise.reject(error);
  }
);

// API Methods
export const chatAPI = {
  /**
   * Sends a message to the server.
   * @param {string} message - The message to send.
   * @param {string|null} threadId - Optional thread ID.
   * @returns {Promise<any>} - The server response.
   */
  sendMessage: async (message, threadId = null) => {
    try {
      const response = await apiClient.post("/chat", {
        thread_id: threadId,
        message,
      });
      return response;
    } catch (error) {
      console.error("Chat API Error:", error.response?.data || error.message);
      throw error;
    }
  },
};

export const planAPI = {
  /**
   * Fetches the plan from the server.
   * @returns {Promise<any>} - The plan data.
   */
  getPlan: async () => {
    try {
      const response = await apiClient.get("/plan");
      return response;
    } catch (error) {
      console.error("Plan API Error:", error.response?.data || error.message);
      throw error;
    }
  },
  /**
   * Fetches the plan from the server.
   * @returns {Promise<any>} - The plan data.
   */
  getPlanById: async (id) => {
    try {
      const response = await apiClient.get(`/plan/${id}`);
      return response;
    } catch (error) {
      console.error("Plan API Error:", error.response?.data || error.message);

      // Return a meaningful error object or throw the error
      return {
        error: true,
        message: error.response?.data?.message || "Failed to fetch plan",
        status: error.response?.status || 500,
      };
    }
  },

  /**
   * Creates a new plan on the server.
   * @param {Object} data - The data to send in the request body.
   * @returns {Promise<any>} - The server response.
   */
  createPlan: async (data) => {
    try {
      const response = await apiClient.post("/plan", data);
      return response;
    } catch (error) {
      console.error("Plan API Error:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default apiClient;
