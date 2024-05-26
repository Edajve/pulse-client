import React from 'react'
import { ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

const ActiveContracts = ({ contract }) => {

    const parseTime = (time) => {
        if (time.length > 10) {
            return time.substring(0, 10)
        }
        return time;
    }

    const dynamicStatusColor = (status) => {
        switch (status) {
            case "PROGRESS":
                return 'text-yellow-600';
            case "ACTIVE":
                return 'text-green-600';
            case "FINISHED":
                return 'text-blue-600';
            case "CANCELLED":
                return 'text-red-600';
            default:
                return 'text-grey-100';
        }
    }
    
    const showCancelReason = () => {
        return contract.status === 'CANCELLED'
    }

    return (
        <View className='flex mt-6 px-4 space-y-6 w-full border-b border-gray-600'>
            <View className='flex justify-between items-start flex-row mb-6'>
                <View>
                    <Text className='font-plite text-xs text-gray-100'>
                        Christopher & Jasmine
                    </Text>
                    <Text className={`font-plite text-2xs text-gray-100 pt-[4px]`}>
                        STATUS: <Text className={`font-plite text-2xs ${dynamicStatusColor(contract.status)}`}>
                            {contract.status}
                        </Text>
                    </Text>


                </View>
                <View>
                    <Text className='font-plite text-xs text-gray-100'>
                        Started: {parseTime(contract.start_time)}
                    </Text>
                    <Text className='font-plite text-xs text-gray-100'>
                        Duration: {contract.duration_minutes}m
                    </Text>

                    {showCancelReason() && (
                        <Text className='font-plite text-xs text-gray-100'>
                        Cancel Reason: Both Rovoked
                    </Text>
                    )}
                </View>
            </View>
        </View>
    )
}

export default ActiveContracts;
