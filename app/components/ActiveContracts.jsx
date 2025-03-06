import React from 'react';
import { Text, View } from "react-native";

const ActiveContracts = ({ contract, participantOne, participantTwo }) => {

    const parseTime = (time) => {
        if (!time) return "N/A";
        return time?.substring(0, 10);
    };

    const dynamicStatusColor = (status) => {
        switch (status) {
            case "PROGRESS":
                return 'text-yellow-600';
            case "ACTIVE":
                return 'text-green-600';
            case "COMPLETED":
                return 'text-blue-600';
            case "CANCELLED":
                return 'text-red-600';
            default:
                return 'text-gray-100';
        }
    };

    const doesContractHaveEndTime = () => {
        return contract?.endTime !== null && contract?.endTime !== undefined;
    };

    const truncateName = (name) => {
        if (!name) return "Unknown"; 
        return name.length > 9 ? `${name.substring(0, 8)}…` : name;
    };

    return (
        <View className='flex mt-6 px-4 space-y-6 w-full border-b border-gray-600'>
            <View className='flex justify-between items-start flex-row mb-6'>
                <View>
                    <Text className='font-plight text-xs text-gray-100'>
                        {truncateName(participantOne)} & {truncateName(participantTwo)}
                    </Text>
                    <Text className={`font-plight text-2xs text-gray-100 pt-[4px]`}>
                        STATUS: <Text className={`font-plight text-2xs ${dynamicStatusColor(contract?.status)}`}>
                            {contract?.status || "UNKNOWN"}
                        </Text>
                    </Text>
                </View>
                <View>
                    <Text className='font-plight text-xs text-gray-100'>
                        Started: {parseTime(contract?.startTime)}
                    </Text>
                    {doesContractHaveEndTime() && (
                        <Text className='font-plight text-xs text-gray-100'>
                            Ended: {parseTime(contract?.endTime)}
                        </Text>
                    )}
                    <Text className='font-plight text-xs text-gray-100'>
                        Duration: {contract?.durationMinutes}m
                    </Text>

                    {contract?.status === 'CANCELLED' && (
                        <Text className='font-plight text-xs text-gray-100'>
                            Cancel Reason: By A Participant
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
};

export default ActiveContracts;