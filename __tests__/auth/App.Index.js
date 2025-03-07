import { render, fireEvent, waitFor } from '@testing-library/react-native';
import React from 'react';
import Index from '../../app/index.jsx';
import { useGlobalContext } from '../../context/GlobalProvider.js';
import { router } from 'expo-router';

jest.mock('../../context/GlobalProvider.js', () => ({
    useGlobalContext: jest.fn(),
}));

jest.mock('expo-router', () => ({
    router: {
        push: jest.fn(),
    },
})); 

describe('Splash component test', () => {
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

    test('should render splash page when not logged in', () => {
        const { getByText } = render(<Index />);

        const continueButton = getByText('Continue');
        expect(continueButton).toBeTruthy();
    });

    test('should navigate from the splash to sign-in page', async () => {
        const { getByText } = render(<Index />);

        const continueButton = getByText('Continue');
        expect(continueButton).toBeTruthy();

        fireEvent.press(continueButton);

        // Verify navigation to the sign-in page
        await waitFor(() => {
            expect(router.push).toHaveBeenCalledWith('/sign-in');
        });
    });
});
