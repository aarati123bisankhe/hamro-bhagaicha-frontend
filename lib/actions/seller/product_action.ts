"use server";

import {
  createSellerProduct,
  fetchSellerInventory,
  type CreateSellerProductPayload,
} from "@/lib/api/seller/product";
import { getUserData } from "@/lib/cookie";

export const handleCreateSellerProduct = async (
  payload: Omit<CreateSellerProductPayload, "sellerId">
) => {
  try {
    const user = await getUserData();
    const sellerId = user?.id || user?._id;

    const response = await createSellerProduct({
      ...payload,
      sellerId,
    });

    if (response.success === false) {
      return {
        success: false,
        message: response.message || "Failed to create product",
      };
    }

    return {
      success: true,
      data: response.data,
      message: response.message || "Product added successfully",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Create product action failed",
    };
  }
};

export const handleGetSellerInventory = async (search?: string) => {
  try {
    const user = await getUserData();
    const sellerId = user?.id || user?._id;

    const response = await fetchSellerInventory({
      sellerId,
      search: search?.trim() || undefined,
    });

    if (response.success === false) {
      return {
        success: false,
        message: response.message || "Failed to fetch inventory",
        data: [],
      };
    }

    return {
      success: true,
      data: response.data || [],
      message: response.message || "Inventory fetched successfully",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Fetch inventory action failed",
      data: [],
    };
  }
};
