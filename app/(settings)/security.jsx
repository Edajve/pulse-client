import { router } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";
import InformationBlock from '../components/SettingsInformationBlocks';
import { ROUTES } from '../utilities/Routes';

const Security = () => {

    return (
        <SafeAreaView className="bg-primary h-full p-5">
            <View className='mt-4 mb-9'>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image
                        className='w-[25px] h-[25px]'
                        source={icons.leftArrow}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => router.push(ROUTES.RESET_PASSWORD)}>
                    <InformationBlock title='Click to reset password' text='**********' />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push(ROUTES.RESET_PIN)}>
                    <InformationBlock title='Click to reset PIN' text='****' />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Security