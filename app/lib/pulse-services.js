import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://192.168.1.166:8080/api/v1' // Your Spring Boot backend URL by IP-Address
});

export const register = async (RegisterRequest) => {
    try {
        const response = await apiClient.post(`/auth/register`, RegisterRequest);
        return response;
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
}

export const authenticate = async (AuthenticateRequest) => {
    try {
        const response = await apiClient.post(`/auth/authenticate`, AuthenticateRequest);
        return response;
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
}



export const getUser = async () => {
   return false;
}
