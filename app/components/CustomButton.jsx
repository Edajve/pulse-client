import { router } from "expo-router";
import React from 'react';
import { Text, TouchableOpacity } from "react-native";

const CustomButton = ({title, handlePress, containerStyle, textStyles, isLoading}) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            handlePress={() => router.push('/sign-in')}
            className={`bg-secondary
            rounded-xl
            min-h-[62px]
            justify-center
            items-center ${containerStyle}
            ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading}
        >
            <Text
                className={`text-primary
                font-psemibold
                text-lg
                ${textStyles}`}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;