"use server"

import {login, register} from "../api/auth";
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