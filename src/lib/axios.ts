import axios from "axios";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getSession } from "next-auth/react";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session) {
    config.headers.Authorization = `Bearer ${session.user.accessToken}`;
  }

  return config;
});

// if the request failed due to token, let next-auth handle it the refresh and retry
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      if (!originalRequest._retryCount) {
        originalRequest._retryCount = 0;
      }

      if (originalRequest._retryCount < 3) {
        originalRequest._retryCount += 1;
        const session = await getSession();
        if (!session?.user.accessToken) {
          return Promise.reject(error);
        }
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
