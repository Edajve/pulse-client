import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import Home from '../../app/(tabs)/home.jsx';
import { InProgressContracts, InactiveContracts, activeContracts } from '../../app/lib/pulse-services';
import { useGlobalContext } from '../../context/GlobalProvider';

// Mock the pulse-services module
jest.mock('../../app/lib/pulse-services', () => ({
    register: jest.fn().mockResolvedValue(),
    activeContracts: jest.fn(),
    InactiveContracts: jest.fn(),
    InProgressContracts: jest.fn(),
}));

// Mock the GlobalProvider and useGlobalContext
jest.mock('../../context/GlobalProvider', () => ({
    __esModule: true,
    useGlobalContext: jest.fn(),
    default: ({ children }) => children,
}));

// Define mocked responses for API calls
const mockedActiveContractsResponse = [
    { id: '1', participantOne: { firstName: 'John' }, participantTwo: { firstName: 'Doe' } },
];

const mockedInactiveContractsResponse = [];

const mockedInProgressContractsResponse = [
    {
        "id": 21,
        "participantOne": {
            "id": 353,
            "firstName": "Ashley",
            "lastName": "Tisdale",
            "email": "Tt",
            "password": "$2a$10$ks5fjjhgNnjAL7Hjj1swLeCMwj/gIKD.Jju5mXjcnxwpFAmnFNRKW",
            "role": "USER",
            "accountCreatedDate": "2024-05-26T08:23:10.007",
            "sex": "non_binary",
            "dateOfBirth": "01-01-1980",
            "countryRegion": "united_states",
            "enabled": true,
            "accountNonExpired": true,
            "accountNonLocked": true,
            "credentialsNonExpired": true,
            "username": "Tt",
            "authorities": [
                {
                    "authority": "USER"
                }
            ]
        },
        "participantTwo": null,
        "startTime": "2024-06-02T23:32:01.29295",
        "endTime": null,
        "status": "PROGRESS",
        "didParticipantOneRevoke": false,
        "didParticipantTwoRevoke": false,
        "participantOneRevokeContractReason": null,
        "participantTwoRevokeContractReason": null,
        "contractCancelReason": null,
        "durationMinutes": 60,
        "contractNumber": 3
    },
    {
        "id": 24,
        "participantOne": {
            "id": 353,
            "firstName": "Ashley",
            "lastName": "Tisdale",
            "email": "Tt",
            "password": "$2a$10$ks5fjjhgNnjAL7Hjj1swLeCMwj/gIKD.Jju5mXjcnxwpFAmnFNRKW",
            "role": "USER",
            "accountCreatedDate": "2024-05-26T08:23:10.007",
            "sex": "non_binary",
            "dateOfBirth": "01-01-1980",
            "countryRegion": "united_states",
            "enabled": true,
            "accountNonExpired": true,
            "accountNonLocked": true,
            "credentialsNonExpired": true,
            "username": "Tt",
            "authorities": [
                {
                    "authority": "USER"
                }
            ]
        },
        "participantTwo": null,
        "startTime": "2024-06-23T20:25:33.76014",
        "endTime": null,
        "status": "PROGRESS",
        "didParticipantOneRevoke": false,
        "didParticipantTwoRevoke": false,
        "participantOneRevokeContractReason": null,
        "participantTwoRevokeContractReason": null,
        "contractCancelReason": null,
        "durationMinutes": 60,
        "contractNumber": 1
    }
];

const mockedUser = useGlobalContext.mockReturnValue({
    isLoading: false,
    isLoggedIn: true,
    user: {
        "id": 252,
        "firstName": "Ronald",
        "lastName": "Riles",
        "email": "Ad",
        "password": "$2a$10$2f7H3.5GZvqVsYFL9UNRcuyst3teJ7/aKhEvQPuXw3ZD6LEgRnv1G",
        "role": "USER",
        "accountCreatedDate": "2024-05-22T04:49:07.081",
        "sex": "female",
        "dateOfBirth": "12-12-1997",
        "countryRegion": "united_states",
        "enabled": true,
        "accountNonExpired": true,
        "accountNonLocked": true,
        "credentialsNonExpired": true,
        "username": "Ad",
        "authorities": [
            {
                "authority": "USER"
            }
        ]
    },
    token: 'randomtoken',
    id: '252',
    scannieId: { scannieId: '' }
});

describe.skip('Home component', () => {
    beforeEach(() => {
        // Reset mocks and clear calls history before each test
        jest.clearAllMocks();

        // Mock implementations with responses
        activeContracts.mockResolvedValue(mockedActiveContractsResponse);
        InactiveContracts.mockResolvedValue(mockedInactiveContractsResponse);
        InProgressContracts.mockResolvedValue(mockedInProgressContractsResponse);
    });

    test('renders home screen with initial data', async () => {
        // Mock useGlobalContext to return mockedUser
        useGlobalContext.mockReturnValue(mockedUser);

        // Render the Home component
        const { getByText, findByText } = render(<Home />);

        // Check if the component renders correctly initially
        expect(getByText('Home')).toBeTruthy();
        expect(getByText('Active Consent')).toBeTruthy();
        expect(getByText('In Progress Consent')).toBeTruthy();

        // Wait for API calls to resolve and verify data rendering
        await waitFor(() => {
            expect(findByText('John Doe')).toBeTruthy(); 
        });
    });
});
