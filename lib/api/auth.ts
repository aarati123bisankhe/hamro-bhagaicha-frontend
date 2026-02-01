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
      err.response?.data?.message || err.message || "Login Failed" );
  }
};

export const whoAmI = async () => {
    try{
        const response = await axios.get(API.Auth.WHOAMI);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error.response?.data?.message
      || error.message || 'Whoami failed');
  }
};

export const updateProfile = async (profileData: any) => {
  try {
    const response = await axios.put(
      API.Auth.UPDATEPROFILE,
      profileData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // for file upload/multer
        }
      }
    );
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error.response?.data?.message
      || error.message || 'Update profile failed');
  }
};