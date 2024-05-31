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
    try {
        return await apiClient.post(`/auth/authenticate`, AuthenticateRequest);
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }

    // return true; // -> this is to force correct credentials for during development
}

export const getUser = async (id, token) => {
    try {

        const response = await apiClient.get(`/account/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {

    }
}

export const getUserQrCode = async (accountId, token) => {
    try {
        const response = await apiClient.get(`/qr/${accountId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user QR code:', error);
        throw error;
    }
};

export const isUsersQrValid = async (userID, uuid, token) => {
    try {
        const response = await apiClient.post(`/qr/authenticate/${userID}`,
            {
                uuid: uuid
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching user QR code:', error);
        throw error;
    }
}

export const createOrUpdateContract = async (payload, token) => {

    console.log(payload)
    await apiClient.post(
        `/contract/create`,
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    ).then((response) => {
        return response.data
    }).catch((err) => {
        if (err) {
            return err
        }
    })
}

export const activeContracts = async (userId, token) => {
    try {

        const response = await apiClient.get(`/contract/valid/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        return error;
    }
}

export const InactiveContracts = async (userId, token) => {
    try {

        const response = await apiClient.get(`/contract/inactive/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        return error;
    }
}

export const getContract = async (contractId, token) => {
    try {

        const response = await apiClient.get(`/contract/${contractId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        return error;
    }
}

export const InProgressContracts = async (userId, token) => {
    try {

        const response = await apiClient.get(`/contract/progress/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        return error;
    }
}