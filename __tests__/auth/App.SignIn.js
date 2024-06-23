import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import SignIn from '../../app/(auth)/sign-in.jsx';
import { useGlobalContext } from '../../context/GlobalProvider';

// Mock useGlobalContext
jest.mock('../../context/GlobalProvider.js', () => ({
    useGlobalContext: jest.fn(),
}));

describe('SignIn component test', () => {
    beforeEach(() => {
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

    test('should show pop up when clicks Log In button with no fields present', async () => {
        const { getByText, findByTestId } = render(<SignIn />);
        fireEvent.press(getByText('Log In'));
        const modal = await findByTestId('blur-modal-container');
        expect(modal).toBeTruthy();
    });

    test('should show pop up when user only puts in email field and not password as well', async () => {
        const { getByPlaceholderText, getByText, findByTestId } = render(<SignIn />);
        fireEvent.changeText(getByPlaceholderText('email'), 'test@example.com');
        fireEvent.press(getByText('Log In'));
        const modal = await findByTestId('blur-modal-container');
        expect(modal).toBeTruthy();
    });

    test('should show pop up when user only puts in password field and not email as well', async () => {
        const { getByPlaceholderText, getByText, findByTestId } = render(<SignIn />);
        fireEvent.changeText(getByPlaceholderText('password'), 'testPassword');
        fireEvent.press(getByText('Log In'));
        const modal = await findByTestId('blur-modal-container');
        expect(modal).toBeTruthy();
    });
});
