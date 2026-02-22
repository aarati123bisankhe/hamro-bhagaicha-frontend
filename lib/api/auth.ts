import axios, { axiosInstance } from "@/lib/api/axios";
import { API } from "./endpoints";
import { LoginData, RegisterData } from "@/app/(auth)/schema";

export const register = async (registerData: RegisterData) => {
    try {
        const response = await axios.post(API.Auth.REGISTER, registerData)
        return response.data
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message || error.message || 'Registration failed')
    }
}

export const login = async (loginData: LoginData) => {
    try {
        const response = await axios.post(API.Auth.LOGIN, loginData)
        return response.data
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message || error.message || 'Login failed')
    }
}

export const whoAmI = async () => {
    try{
        const response = await axios.get(API.Auth.WHOAMI);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error.response?.data?.message
      || error.message || 'Whoami failed');
  }
}

export const updateProfile = async (profileData: any) => {
  try {
    const response = await axios.put(
      API.Auth.UPDATEPROFILE,
      profileData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', 
        }
      }
    );
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error.response?.data?.message
      || error.message || 'Update profile failed');
  }
}


export const requestPasswordReset = async (email: string) => {
    try {
        const response = await axios.post(API.Auth.REQUEST_PASSWORD_RESET, { email });
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message || error.message || 'Request password reset failed');
    }
};

export const resetPassword = async (token: string, newPassword: string) => {
    try {
        const response = await axios.post(API.Auth.RESET_PASSWORD(token), { newPassword: newPassword });
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message || error.message || 'Reset password failed');
    }
}