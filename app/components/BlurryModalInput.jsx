import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import CustomButton from './CustomButton';
import FormField from '../components/FormField'

const BlurryModalInput = ({
    visible
    , onRequestClose
    , title, styles
    , onSubmit
    , onSkip
    , affirmativeButtonTitle
    , negativeButtonTitle
}) => {
    const [form, setForm] = useState({
        "revokeReason": ""
    })

    const submitReason = () => {
        onSubmit(form.revokeReason)
    }

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
                    
                    <FormField
                        title={title}
                        value={form.revokeReason}
                        otherStyles='mt-7'
                        keyboardType='default'
                        placeholder='This can be optional'
                        handleChangeText={(e) => setForm({ ...form, revokeReason: e })}
                    />
                    <View className='flex-row w-[100%] justify-between'>

                        <CustomButton
                            title={affirmativeButtonTitle}
                            containerStyle='mt-5 w-[48%]'
                            handlePress={() => submitReason()}
                        />

                        <CustomButton
                            title={negativeButtonTitle}
                            containerStyle='mt-5 w-[48%]'
                            handlePress={onSkip}
                        />
                    </View>
                </View>
            </BlurView>
        </Modal>
    );
};

export default BlurryModalInput;
