import axios from "axios";

const apiClient = axios.create({
   // baseURL: 'http://192.168.1.166:8080/api/v1'  // this is the default way you have been developing
    // baseURL: 'http://192.168.1.249:8080/api/v1' // <--- this is used when using iphone for development
    baseURL: 'https://ethylenic-setaceously-veta.ngrok-free.dev/api/v1'

});

export const register = async (RegisterRequest) => {
    try {
        return await apiClient.post(`/auth/register`, RegisterRequest);
    } catch (error) {
        throw error;
    }
}

export const authenticate = async (AuthenticateRequest) => {
    try {
        const response = await apiClient.post(`/auth/authenticate`, AuthenticateRequest);
        return response.data; // Ensure we return response.data
    } catch (error) {
        throw error; // Rethrow the error to be caught in useApi
    }
};

export const getUser = async (id, token) => {
    try {

        const response = await apiClient.get(`/account/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        // need to use some type of login system for this
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
    try {
        const response = await apiClient.post(
            `/contract/create`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response; // Ensure the entire response is returned
    } catch (err) {
        return err.response || { status: 500, message: "Unknown error" }; // Ensure error response has a status
    }
};

export const activeContracts = async (userId, token) => {
    try {

        const response = await apiClient.get(`/contract/valid/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {

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

    }
}

export const revokeContract = async (contractId, userId, token, requestBody) => {
    try {
        const response = await apiClient.put(`/contract/update/revoke/${contractId}/${userId}`,
            requestBody, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        return error;
    }
}

export const getContractStats = async (userId, token) => {
    try {

        const response = await apiClient.get(`/account/stats/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        return error;
    }
}

export const resetPassword = async (requestBody) => {
    
    try {
        const response = await apiClient.put(`/auth/password/reset`, requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            // Log the full error response
            console.error('Error response data:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
        } else {
            console.error('Error message:', error.message);
        }
        throw error; // Re-throw the error if needed
    }
};

export const getAuthMethodByLocalHash = async (localHash) => {
    try {
        const response = await apiClient.get(`/auth/authMethod?localHash=${localHash}`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : error.message;
    }
};

export const updateUser = async (userId, updateUserRequestPayload, token) => {
    try {
        const response = await apiClient.put(
            `/account/update/${userId}`,
            updateUserRequestPayload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (error) {
        return error;
    }
};

export const registerWithPin = async (RegisterRequest) => {
    try {
        return await apiClient.post(`/auth/authenticate/pin`, RegisterRequest);
    } catch (error) {
        throw error;
    }
}


export const resetPin = async (RegisterRequest) => {
    try {
        return await apiClient.put(`/auth/reset/pin`, RegisterRequest);
    } catch (error) {
        throw error;
    }
}

export const registerWithLocalHash = async (localHash) => {
    try {
        return await apiClient.post(`/auth/authenticate/hash/${localHash}`);
    } catch (error) {
        throw error;
    }
}

export const getContractsByNameAndUserId = async (name, userId, token) => {
    try {
        
        const response = await apiClient.get(
            `/contract/search?name=${name}&userId=${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching contracts:", error.response?.data || error.message);
        return error.response?.data || { message: "An unexpected error occurred." };
    }
};