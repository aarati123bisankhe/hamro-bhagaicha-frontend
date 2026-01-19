import axios from "axios";
import {API} from "./endpoints"
import axiosInstance from "./axios";

export const register = async (registrationData: any) => {
  try {
    const response = await axiosInstance.post(API.Auth.REGISTER, registrationData);
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Registration Failed"
    );
  }
};

export const login = async (loginData: any) => {
  try {
    const response = await axiosInstance.post(API.Auth.LOGIN, loginData);
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Login Failed"
    );
  }
};