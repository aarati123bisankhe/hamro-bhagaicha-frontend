// import { createUser, fetchUsers } from "@/lib/api/admin/user";

// export const handleCreateUser = async (data: {
//   fullName: string;
//   email: string;
//   password: string;
//   address: string;
//   phoneNumber: string;
//   role: string;
// }) => {
//   try {
//     const response = await createUser(data);

//     if (!response.success) {
//       return { success: false, message: response.message };
//     }

//     return { success: true, data: response.data };
//   } catch (error: any) {
//     return {
//       success: false,
//       message: error.message || "Create user failed",
//     };
//   }
// };

// export const getUsers = async () => {
//   try {
//     const users = await fetchUsers();
//     return users;
//   } catch (error: any) {
//     return [];
//   }
// };


"use server";

import {
  createUser,
  deleteUserById,
  fetchUsers,
  updateUserById,
  type UpdateAdminUserPayload,
} from "@/lib/api/admin/user";
import { revalidatePath } from "next/cache";

export const handleCreateUser = async (formData: FormData) => {
  try {
    const data = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      address: formData.get('address') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      role: formData.get('role') as string,
    };
    const response = await createUser(data);

    if (!response.success) {
      return {
        success: false,
        message: response.message,
      };
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Create user failed",
    };
  }
};

export const getUsers = async () => {
  try {
    return await fetchUsers();
  } catch {
    return [];
  }
};


export const handleDeleteUser = async (id: string) => {
  try {
    const response = await deleteUserById(id);
    if (response.success) {
      revalidatePath("/admin/users");
      return {
        success: true,
        message: "Delete user successful",
      };
    }

    return {
      success: false,
      message: response.message || "Delete user failed",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Delete user action failed",
    };
  }
};

export const handleUpdateUser = async (
  id: string,
  payload: UpdateAdminUserPayload
) => {
  try {
    const response = await updateUserById(id, payload);
    if (response.success) {
      revalidatePath("/admin/users");
      return {
        success: true,
        message: response.message || "User updated successfully",
      };
    }

    return {
      success: false,
      message: response.message || "Update user failed",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Update user action failed",
    };
  }
};
