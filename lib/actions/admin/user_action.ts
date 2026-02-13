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

import { createUser, fetchUsers } from "@/lib/api/admin/user";
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
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Create user failed",
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
        const response = await deleteUser(id)
        if (response.success) {
            revalidatePath('/admin/users');
            return {
                success: true,
                message: 'Delete user successful'
            }
        }
        return {
            success: false,
            message: response.message || 'Delete user failed'
        }
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Delete user action failed' }
    }
  }

async function deleteUser(id: string) {
  // Import the actual delete user API call from your API module
  // This is a placeholder that should be replaced with the actual implementation
  try {
    const response = await fetch(`/api/admin/users/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
