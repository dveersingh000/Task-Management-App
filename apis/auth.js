import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log("BASE_URL:", BASE_URL); 

export const register = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/user/register`, data, {
            headers: {
                'Content-Type': 'application/json' 
            }
        });
        return response;
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
}

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/user/login`, {
            email,
            password,
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}
