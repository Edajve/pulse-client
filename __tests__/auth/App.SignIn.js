import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import SignIn from '../../app/(auth)/sign-in.jsx';
import { useGlobalContext } from '../../context/GlobalProvider';
import { authenticate } from '../../app/lib/pulse-services.js';
import { useRouter } from 'expo-router';

jest.mock('expo-router', () => ({
    ...jest.requireActual('expo-router'),
    useRouter: jest.fn(),
}));

jest.mock('../../context/GlobalProvider.js', () => ({
    useGlobalContext: jest.fn(),
}));

jest.mock('../../app/lib/pulse-services.js', () => ({
    authenticate: jest.fn(),
}));

describe('SignIn Component', () => {
    let mockRouterReplace, mockGlobalContext;

    beforeEach(() => {
        mockRouterReplace = jest.fn();

        useRouter.mockReturnValue({
            replace: mockRouterReplace,
        });

        mockGlobalContext = {
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
        };

        useGlobalContext.mockReturnValue(mockGlobalContext);
        jest.clearAllMocks();
    });

    test('renders the SignIn page correctly', () => {
        const { getByText } = render(<SignIn />);

        expect(getByText('Log in to Qssense')).toBeTruthy();
        expect(getByText('Email')).toBeTruthy();
        expect(getByText('Password')).toBeTruthy();
        expect(getByText('Log In')).toBeTruthy();
        expect(getByText('Reset Password')).toBeTruthy();
        expect(getByText('Sign Up')).toBeTruthy();
    });

    test('displays an error when Log In is clicked with no fields present', async () => {
        const { getByText, findByTestId } = render(<SignIn />);
        fireEvent.press(getByText('Log In'));

        const modal = await findByTestId('blur-modal-container');
        expect(modal).toBeTruthy();
    });

    test('displays an error when only email is entered', async () => {
        const { getByPlaceholderText, getByText, findByTestId } = render(<SignIn />);
        fireEvent.changeText(getByPlaceholderText('email'), 'test@example.com');
        fireEvent.press(getByText('Log In'));

        const modal = await findByTestId('blur-modal-container');
        expect(modal).toBeTruthy();
    });

    test('displays an error when only password is entered', async () => {
        const { getByPlaceholderText, getByText, findByTestId } = render(<SignIn />);
        fireEvent.changeText(getByPlaceholderText('password'), 'testPassword');
        fireEvent.press(getByText('Log In'));

        const modal = await findByTestId('blur-modal-container');
        expect(modal).toBeTruthy();
    });

    test('displays an error when the email format is incorrect', async () => {
        const { getByPlaceholderText, getByText, findByTestId } = render(<SignIn />);
        fireEvent.changeText(getByPlaceholderText('email'), 'invalidemail');
        fireEvent.changeText(getByPlaceholderText('password'), 'ValidPass123!');
        fireEvent.press(getByText('Log In'));

        const modal = await findByTestId('blur-modal-container');
        expect(modal).toBeTruthy();
    });

    test('shows an error when authentication fails', async () => {
        authenticate.mockRejectedValue(new Error('Invalid credentials'));

        const { getByPlaceholderText, getByText, findByTestId } = render(<SignIn />);
        fireEvent.changeText(getByPlaceholderText('email'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('password'), 'testPassword');
        fireEvent.press(getByText('Log In'));

        await waitFor(() => {
            expect(findByTestId('blur-modal-container')).toBeTruthy();
        });
    });

});