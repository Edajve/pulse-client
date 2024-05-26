import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';

const PostContractAuthentication = () => {
    return (
        <SafeAreaView className='w-full h-full bg-primary px-5 '>
            <View className='w-full h-full items-center justify-center'>
                <Text className='text-white text-base font-psemibold text-2xl'>
                    All Set from Your End!
                </Text>
                <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                    If you initiated the scan, let the participant scan your QR code. If you've just scanned your participant after being scanned, congratulations, you've entered a consentual contract!
                </Text>
                <CustomButton
                    title='Home'
                    containerStyle={'w-[90vw] mt-10'}
                    handlePress={() => router.replace('/home')}
                />
            </View>
        </SafeAreaView>
    )

}

export default PostContractAuthentication;