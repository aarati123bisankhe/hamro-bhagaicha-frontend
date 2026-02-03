import axios from "../axios";
import { API } from "../endpoints";

export const fetchUsers = async () => {
  const response = await axios.get((API as any).ADMIN.USER.ALL);
  return response.data.data;
};

export const createUser = async (userData: {
  fullName: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  role: string;
  
}) => {
  try {
    const response = await axios.post(
      (API as any).ADMIN.USER.CREATE,
      userData
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Create user failed"
    );
  }
};