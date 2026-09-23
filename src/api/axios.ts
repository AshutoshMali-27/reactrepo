import axios from "axios";

export const axiosInstace=axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    timeout:5000,
    withCredentials: true,
     headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    
})