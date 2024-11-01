import axios from "axios";

export const register = async (data) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/register`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
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
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}