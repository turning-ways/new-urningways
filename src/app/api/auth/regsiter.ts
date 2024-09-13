"use server";

import api from "@/lib/axios";

export const register = async (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}) => {
  try {
    const res = await api.post("/auth/register", data);
    return {
      data: res.data,
      status: 201,
    };
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const resendEmail = async (data: { email: string }) => {
  try {
    const res = await api.post("/auth/resend-email", data);
    return {
      data: res.data,
      status: 200,
    };
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const verifyEmail = async (data: { token: string }) => {
  try {
    const res = await api.post("/auth/verify-email", data);
    return {
      data: res.data,
      status: 200,
    };
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const sendResetPasswordEmail = async (data: { email: string }) => {
  try {
    const res = await api.post("/auth/forgot-password?type=web", data);
    return {
      data: res.data,
      status: 200,
    };
  } catch (error: any) {
    return {
      data: "Either the email is not registered or the request is invalid",
      status: 400,
    };
  }
};

export const verifyResetPasswordToken = async (data: { token: string }) => {
  try {
    const res = await api.get(
      `/auth/verify-password-reset?token=${data.token}`
    );
    return {
      data: res.data,
      status: 200,
    };
  } catch (error: any) {
    return {
      data: error.response.data,
      status: 400,
    };
  }
};

export const resetPassword = async (data: {
  token: string;
  password: string;
}) => {
  try {
    const res = await api.post(`/auth/reset-password?type=web`, data);
    return {
      data: res.data,
      status: 200,
    };
  } catch (error: any) {
    return {
      data: error.response.data,
      status: 400,
    };
  }
};
