import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import { useEffect } from 'react';
import { getTranslation } from '../../constants/translations/translations';

const PostContractAuthentication = () => {
    const { setScannieId } = useGlobalContext()

    useEffect(() => {
        // Clear scannie id that the scanner scanned bc record is already in db
        setScannieId({
            "scannieId": ""
        })
    }, [])

    return (
        <SafeAreaView className='w-full h-full bg-primary px-5 '>
            <View className='w-full h-full items-center justify-center'>
                <Text className='text-white text-base font-psemibold text-2xl'>
                   {getTranslation('text.allSetOnYourEnd')}
                </Text>
                <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                    {getTranslation('longText.postScan.letOtherUserScan')}
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