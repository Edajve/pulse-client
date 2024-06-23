import { render } from '@testing-library/react-native';
import React from 'react';
import SignIn from '../../app/(auth)/sign-in.jsx';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';

jest.mock('../../context/GlobalProvider.js', () => ({
    useGlobalContext: jest.fn(),
}));

// jest.mock('expo-router', () => ({
//     router: {
//         push: jest.fn(),
//     },
// }));

describe('SignIn component test', () => {
    beforeEach(() => {
        // Mocking useGlobalContext to return necessary values
        useGlobalContext.mockReturnValue({
            isLoading: false,
            isLoggedIn: false,
            user: null,
            setIsLoggedIn: jest.fn(),
            setUser: jest.fn(),
            setToken: jest.fn(),
            setId: jest.fn(),
            setScannieId: jest.fn(),
            token: '',
            id: '',
            scannieId: { scannieId: '' },
        });
    });

    test('should render SignIn page', () => {
        const { getByText } = render(<SignIn />);

        // Check if important elements are rendered
        expect(getByText('Log in to Pulse')).toBeTruthy();
        expect(getByText('Email')).toBeTruthy();
        expect(getByText('Password')).toBeTruthy();
        expect(getByText('Log In')).toBeTruthy();
        expect(getByText('Reset Password')).toBeTruthy();
        expect(getByText('Sign Up')).toBeTruthy();
    });
});
