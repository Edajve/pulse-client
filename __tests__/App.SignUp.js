import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignUp from '../app/(auth)/sign-up';
import { register } from '../app/lib/pulse-services';

jest.mock('../app/lib/pulse-services', () => ({
    register: jest.fn().mockResolvedValue(),
}));

describe('SignUp component test', () => {
    test('should render SignUp form test', () => {
        const { getByText } = render(<SignUp />);

        // Check if important elements are rendered
        expect(getByText('Sign Up to Pulse')).toBeTruthy();
        expect(getByText('First Name')).toBeTruthy();
        expect(getByText('Last Name')).toBeTruthy();
        expect(getByText('Email')).toBeTruthy();
        expect(getByText('Password')).toBeTruthy();
        expect(getByText('Sign Up')).toBeTruthy();
    });

    test('should submit the form with valid data', async () => {
        const { getByPlaceholderText, getByText, getByTestId } = render(<SignUp />);

        // Fill in the form
        fireEvent.changeText(getByPlaceholderText('First Name'), 'John');
        fireEvent.changeText(getByPlaceholderText('Last Name'), 'Doe');
        fireEvent.changeText(getByPlaceholderText('Email'), 'john.doe@example.com');
        fireEvent.changeText(getByPlaceholderText('Password'), 'password');
        fireEvent.changeText(getByPlaceholderText('Date of Birth (18+) MM-DD-YYYY'), '01-01-1990');

        // Select options in dropdowns
        fireEvent.press(getByTestId('sexDropDown'));
        fireEvent.press(get);

        // Submit the form
        fireEvent.press(getByText('Sign Up'));

        // Wait for the form submission to complete
        await waitFor(() => {
            expect(register).toHaveBeenCalledTimes(1); // Ensure register function was called
            expect(register).toHaveBeenCalledWith(expect.objectContaining({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password',
                dateOfBirth: '01-01-1990',
                role: 'USER',
                sex: 'MALE',
                countryRegion: 'UNITED_STATES',
            }));
        });
    });

    // Add more tests for form validation, error handling, etc.
});
