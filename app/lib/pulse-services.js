import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://192.168.1.166:8080/api/v1' // Your Spring Boot backend URL by IP-Address
});

export const register = async (RegisterRequest) => {
    try {
        return await apiClient.post(`/auth/register`, RegisterRequest);
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
}

export const authenticate = async (AuthenticateRequest) => {
    // return true;
    try {
        return await apiClient.post(`/auth/authenticate`, AuthenticateRequest);
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
}

export const logout = () => {

}

export const getUser = async () => {
   return false;
}
