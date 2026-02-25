import axios from "../axios";
import { API } from "../endpoints";

export const fetchUsers = async () => {
  const response = await axios.get(API.ADMIN.USER.ALL);
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
    const response = await axios.post(API.ADMIN.USER.CREATE, userData);
    return response.data;
  } catch (error: unknown) {
    const message =
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as { response?: { data?: { message?: string } } }).response
        ?.data?.message === "string"
        ? (error as { response?: { data?: { message?: string } } }).response!.data!
            .message!
        : error instanceof Error
          ? error.message
          : "Create user failed";

    throw new Error(message);
  }
};

export const deleteUserById = async (userId: string) => {
  try {
    const response = await axios.delete(API.ADMIN.USER.DELETE(userId));
    return response.data;
  } catch (error: unknown) {
    const message =
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as { response?: { data?: { message?: string } } }).response
        ?.data?.message === "string"
        ? (error as { response?: { data?: { message?: string } } }).response!.data!
            .message!
        : error instanceof Error
          ? error.message
          : "Delete user failed";

    throw new Error(message);
  }
};

export type UpdateAdminUserPayload = {
  fullName: string;
  email: string;
  phoneNumber: string;
  role: "user" | "admin";
  address?: string;
};

export const updateUserById = async (
  userId: string,
  payload: UpdateAdminUserPayload
) => {
  try {
    const response = await axios.put(API.ADMIN.USER.UPDATE(userId), payload);
    return response.data;
  } catch (error: unknown) {
    const message =
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as { response?: { data?: { message?: string } } }).response
        ?.data?.message === "string"
        ? (error as { response?: { data?: { message?: string } } }).response!.data!
            .message!
        : error instanceof Error
          ? error.message
          : "Update user failed";

    throw new Error(
      message
    );
  }
};
