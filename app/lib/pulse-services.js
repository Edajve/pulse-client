import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://192.168.1.166:8080/api/v1' // Your Spring Boot backend URL
});

export const register = async (AuthenticateRequest) => {
    try {
        const response = await apiClient.post(`/auth/register`, AuthenticateRequest);
        return response;
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
}

export const getUser = async () => {
   return false;
}
