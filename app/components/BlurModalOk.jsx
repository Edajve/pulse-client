import { BlurView } from 'expo-blur';
import React from 'react';
import { Modal, Text, View } from 'react-native';
import CustomButton from './CustomButton';

const BlurModalOk = ({
    visible
    , onRequestClose
    , title
    , styles
    , onYes
    , onNo
    , affirmativeButtonTitle
    
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
                <View className={`bg-primary p-4 rounded-2xl items-center w-[90vw] border border-secondary ${styles}`}>
                    <Text className='text-md text-gray-100 font-psemibold'>
                        {title}
                    </Text>
                    <View className='flex-row w-[100%] justify-between'>

                        <CustomButton
                            title={affirmativeButtonTitle}
                            containerStyle='mt-5 w-[100%]'
                            handlePress={onYes}
                        />
                    </View>
                </View>
            </BlurView>
        </Modal>
    );
};

export default BlurModalOk;
