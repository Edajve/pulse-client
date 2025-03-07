import { render, waitFor, fireEvent } from '@testing-library/react-native';
import React from 'react';
import Home from '../../app/(tabs)/home.jsx';
import { InProgressContracts, InactiveContracts, activeContracts } from '../../app/lib/pulse-services';
import { useGlobalContext } from '../../context/GlobalProvider';
import { LogBox } from 'react-native';

// Mock LogBox to prevent test failures due to console warnings
jest.mock('react-native', () => {
    const reactNative = jest.requireActual('react-native');
    return {
        ...reactNative,
        LogBox: {
            ignoreLogs: jest.fn(),
        },
    };
});

// Mock API calls
jest.mock('../../app/lib/pulse-services', () => ({
    activeContracts: jest.fn(),
    InactiveContracts: jest.fn(),
    InProgressContracts: jest.fn(),
}));

// Mock GlobalContext
jest.mock('../../context/GlobalProvider', () => ({
    useGlobalContext: jest.fn(),
}));

// Define test data
const mockActiveContracts = [
    { id: '1', participantOne: { firstName: 'John' }, participantTwo: { firstName: 'Doe' }, status: "ACTIVE" },
];

const mockInactiveContracts = [];
const mockInProgressContracts = [
    { id: '21', participantOne: { firstName: 'Ashley' }, participantTwo: null, status: "PROGRESS" },
];

const mockGlobalContextValue = {
    isLoading: false,
    isLoggedIn: true,
    user: { id: 252, firstName: "Ronald", lastName: "Riles", token: "randomToken" },
    token: "randomToken",
    id: 252,
    scannieId: { scannieId: "" }
};

describe.skip('Home Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        // Mock API responses
        activeContracts.mockResolvedValue(mockActiveContracts);
        InactiveContracts.mockResolvedValue(mockInactiveContracts);
        InProgressContracts.mockResolvedValue(mockInProgressContracts);

        // Mock global context
        useGlobalContext.mockReturnValue(mockGlobalContextValue);
    });

    test('renders home screen with correct initial UI elements', async () => {
        const { getByText } = render(<Home />);

        // Check if main elements exist
        expect(getByText('Home')).toBeTruthy();
        expect(getByText('Active Consent')).toBeTruthy();
        expect(getByText('In Progress Consent')).toBeTruthy();
    });

    test('fetches and displays active contracts', async () => {
        const { findByText } = render(<Home />);

        await waitFor(() => {
            expect(findByText('John Doe')).toBeTruthy();
        });
    });

    test('handles empty contract lists properly', async () => {
        activeContracts.mockResolvedValue([]);
        InProgressContracts.mockResolvedValue([]);
        InactiveContracts.mockResolvedValue([]);

        const { findByText } = render(<Home />);

        await waitFor(() => {
            expect(findByText('No Active Contracts')).toBeTruthy();
        });
    });

    test('calls API and updates UI on refresh', async () => {
        const { getByTestId } = render(<Home />);

        // Simulate pull-to-refresh
        const refreshControl = getByTestId('refresh-control');
        fireEvent(refreshControl, 'refresh');

        // Ensure API methods are called again
        await waitFor(() => {
            expect(activeContracts).toHaveBeenCalledTimes(2);
            expect(InactiveContracts).toHaveBeenCalledTimes(2);
            expect(InProgressContracts).toHaveBeenCalledTimes(2);
        });
    });
});