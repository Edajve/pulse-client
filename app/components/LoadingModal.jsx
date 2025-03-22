import { BlurView } from 'expo-blur';
import React from 'react';
import { Modal, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native';

const LoadingModal = ({ additionalStyles, text, intensity = 15 }) => {
    return (
        <Modal animationType='fade' transparent={true}>
            <BlurView
                id='blur-test-id'
                className='flex-1 justify-center items-center'
                intensity={intensity} // <- use the prop here
            >
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="orange" />
                    <Text className="mt-4 text-lg text-white">{text}</Text>
                </View>
            </BlurView>
        </Modal>
    );
};

export default LoadingModal;
