import axios from "axios";
import {API} from "./endpoints"

export const register = async (registrationData: any) => {
    try{
        const response = await axios.post(API.Auth.REGISTER, registrationData)
        return response.data
    }catch(err: Error | any){
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Registration Failed"
        )
  }

}

export const login = async (loginData: any) => {
    try{
        const response = await axios.post(API.Auth.LOGIN, loginData);
        return response.data; 
    }catch(err: Error | any){
        throw new Error(
            err.response?.data?.message 
            || err.message 
            ||  'login failed'
        )
    }
}