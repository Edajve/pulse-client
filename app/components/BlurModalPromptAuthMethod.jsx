import { BlurView } from 'expo-blur';
import React from 'react';
import { Modal, Text, View } from 'react-native';
import CustomButton from './CustomButton';
import { getTranslation } from '../../constants/translations/translations';

const BlurModalPromptAuthMethod = ({
    visible
    , onRequestClose
    , title
    , styles
    , firstSelection
    , secondSelection
    , thirdSelection
}) => {
    return (
        <Modal
            visible={visible}
            onRequestClose={onRequestClose}
            animationType='fade'
            transparent={true}
        >
            <BlurView
                intensity={10}
                className='flex-1 justify-center items-center'
            >
                <View className={`bg-primary p-4 rounded-2xl items-center w-[95vw] h-[65vh] border border-secondary ${styles}`}>
                    <Text className='text-lg text-gray-100 font-psemibold mt-5'>
                        {title}
                    </Text>
                    <View className='flex-col w-[80vw] justify-between mt-10'>

                        <CustomButton
                            title={getTranslation('auth.basic')}
                            containerStyle='mt-5 w-[100%]'
                            handlePress={firstSelection}
                        />

                        <CustomButton
                            title={getTranslation('auth.pin')}
                            containerStyle='mt-5 w-[100%]'
                            handlePress={secondSelection}
                        />

                        <CustomButton
                            title={getTranslation('auth.biometric')}
                            containerStyle='mt-5 w-[100%]'
                            handlePress={thirdSelection}
                        />

                        <CustomButton
                            title={getTranslation('auth.cancel')}
                            containerStyle='mt-5 w-[100%]'
                            handlePress={onRequestClose}
                        />
                    </View>
                </View>
            </BlurView>
        </Modal>
    );
};

export default BlurModalPromptAuthMethod;
