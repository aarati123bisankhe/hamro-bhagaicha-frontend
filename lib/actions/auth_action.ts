"use server"

import { revalidatePath } from "next/cache";
import {login, register, updateProfile, whoAmI} from "../api/auth";
import { setAuthToken, setUserData } from "../cookie";

export async function handleRegister(formData: any) {
    try{
        const result = await register(formData)
        if(result.success){
            return{
                success: true,
                message: "Registration Successfull",
                data: result.data
            }
        }
        return {success: false, message: result.message || "Registration Faled"}
    }catch(err:Error | any){
        return {success: false, message: err.message}
    }
}


export async function handleLogin(loginData: any) {
    try{
        const result = await login(loginData);
        if(result.success){
            //here also
            setAuthToken(result.token);
            setUserData(result.data);

            return {success: true, message: 'Login successfull', data: result.data

            };
        }
        return {success: false, message: result.message || 'Login Failed'};
    }catch(err: Error | any){
        return {success: false, message: err.message}
    }
}


export async function handleWhoAmI() {
    try {
        const result = await whoAmI();
        if (result.success) {
            return {
                success: true,
                message: 'User data fetched successfully',
                data: result.data
            };
        }
        return { success: false, message: result.message || 'Failed to fetch user data' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function handleUpdateProfile(profileData: FormData) {
    try {
        const result = await updateProfile(profileData);
        if (result.success) {
            await setUserData(result.data); // update cookie 
            revalidatePath('/user/profile'); // revalidate profile page/ refresh new data
            return {
                success: true,
                message: 'Profile updated successfully',
                data: result.data
            };
        }
        return { success: false, message: result.message || 'Failed to update profile' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}