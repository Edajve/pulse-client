import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import SignIn from '../../app/(auth)/sign-in.jsx';
import { useGlobalContext } from '../../context/GlobalProvider';
import { authenticate } from '../../app/lib/pulse-services.js';
import { useRouter } from 'expo-router';
import { getByTestId } from '@testing-library/react';

jest.mock('expo-router', () => ({
    ...jest.requireActual('expo-router'), // Use actual implementation for other functions
    useRouter: jest.fn(), // Mock useRouter function
}));

jest.mock('../../context/GlobalProvider.js', () => ({
    useGlobalContext: jest.fn(),
}));

jest.mock('../../app/lib/pulse-services.js', () => ({
    authenticate: jest.fn(),
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

    test('should show pop up when user only puts in password field and not email as well', async () => {
        const { getByPlaceholderText, getByText, findByTestId } = render(<SignIn />);
        fireEvent.changeText(getByPlaceholderText('password'), 'testPassword');
        fireEvent.press(getByText('Log In'));
        const modal = await findByTestId('blur-modal-container');
        expect(modal).toBeTruthy();
    });

    // still needs to be worked on, the react-router replace is not verifying correctly
    test.skip('should navigate to home page after correct home page', async () => {
        useRouter.mockReturnValue({
            replace: jest.fn(),
        });

        authenticate.mockResolvedValue({
            data: {
                token: 'mockedToken',
                id: 'mockedId',
            },
        });

        const { getByPlaceholderText, getByText } = render(<SignIn />);

        fireEvent.changeText(getByPlaceholderText('email'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('password'), 'testPassword');
        
        const continueButton = getByTestId('loginBtn');
        expect(continueButton).toBeTruthy()
        fireEvent.press(continueButton);

        await waitFor(() => {
            expect(useGlobalContext().setToken).toHaveBeenCalledWith('mockedToken');
            expect(useGlobalContext().setId).toHaveBeenCalledWith('mockedId');
            expect(useGlobalContext().setIsLoggedIn).toHaveBeenCalledWith(true);
            expect(useRouter().replace).toHaveBeenCalledWith('/home');
        });
    });
});
