import { useGlobalContext } from '../context/GlobalProvider.js';
export const setupGlobalContextMock = (isLoggedIn = false) => {
    jest.mock('../context/GlobalProvider.js', () => ({

        useGlobalContext: jest.fn().mockReturnValue({
            isLoading: false,
            isLoggedIn: isLoggedIn, // Ensure isLoggedIn is correctly referenced here
            user: null,
            setIsLoggedIn: jest.fn(),
            setUser: jest.fn(),
            setToken: jest.fn(),
            setId: jest.fn(),
            setScannieId: jest.fn(),
            token: '',
            id: '',
            scannieId: { scannieId: '' },
        }),
    }));
};