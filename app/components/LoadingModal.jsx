import { BlurView } from 'expo-blur';
import React from 'react';
import { Modal, Text, View } from 'react-native';
import CustomButton from './CustomButton';
import { ActivityIndicator } from 'react-native';

const LoadingModal = ({ additionalStyles, text }) => {
    return (
        <Modal  
            animationType='fade'
            transparent={true}
        >
             <BlurView
                id='blur-test-id'
                blurAmount={60}           // You can set the blur amount as needed
                className='flex-1 justify-center items-center '
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
