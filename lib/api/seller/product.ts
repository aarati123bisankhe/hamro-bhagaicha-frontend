import axios from "@/lib/api/axios";
import { API } from "@/lib/api/endpoints";

export type SellerProductCategory = "plant" | "pot" | "combo";

export type SellerProduct = {
  id?: string;
  sellerId?: string;
  name: string;
  description: string;
  category: SellerProductCategory;
  price: number;
  stock: number;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateSellerProductPayload = Omit<
  SellerProduct,
  "id" | "createdAt" | "updatedAt"
>;

type ApiResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T;
};

export const createSellerProduct = async (payload: CreateSellerProductPayload) => {
  try {
    const response = await axios.post<ApiResponse<SellerProduct>>(
      API.SELLER.PRODUCT.CREATE,
      payload
    );
    return response.data;
  } catch (error: unknown) {
    const message =
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as { response?: { data?: { message?: string } } }).response?.data
        ?.message === "string"
        ? (error as { response?: { data?: { message?: string } } }).response!.data!.message!
        : error instanceof Error
        ? error.message
        : "Create product failed";

    throw new Error(message);
  }
};

export const fetchSellerInventory = async (params?: {
  sellerId?: string;
  search?: string;
}) => {
  try {
    const response = await axios.get<ApiResponse<SellerProduct[]>>(
      API.SELLER.PRODUCT.INVENTORY,
      { params }
    );
    return response.data;
  } catch (error: unknown) {
    const message =
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as { response?: { data?: { message?: string } } }).response?.data
        ?.message === "string"
        ? (error as { response?: { data?: { message?: string } } }).response!.data!.message!
        : error instanceof Error
        ? error.message
        : "Fetch inventory failed";

    throw new Error(message);
  }
};
