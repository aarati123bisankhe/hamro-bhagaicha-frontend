// import axios from "axios";

// const BASE_URL = process.env.NEXT_PUBLIC_URL_API || "https://localhost:5050"

// export const axiosInstance = axios.create(
//     {
//         baseURL: BASE_URL,
//         headers: { 
//             'Content-Type': 'application/json'
//         }
//     }
// )

// export default axiosInstance;

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050";

console.log("Axios Base URL:", BASE_URL); // debug to check

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;


