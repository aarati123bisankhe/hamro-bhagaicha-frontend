import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_URL_API || "https://localhost:5050"

export const axiosInstance = axios.create(
    {
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json'
        }
    }
)

export default axiosInstance;