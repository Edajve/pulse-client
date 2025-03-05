import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";
import { router } from 'expo-router';

const Settings = () => {

    const SettingsOption = ({ title, route }) => {
        return (
            <TouchableOpacity
                onPress={() => router.push(route)}
            >

                <View className="flex-row justify-between items-center py-2 mb-2">
                    <Text className="text-lg text-gray-100 font-normal">
                        {title}
                    </Text>
                    <Image
                        className="w-4 h-4"
                        source={icons.rightArrow}
                        resizeMode="contain"
                    />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView className="px-4 my-6">
                <Text className='text-4xl text-gray-200 font-psemibold'>
                    Settings
                </Text>
                <View className='w-[100vw]'>
                    <View
                        id='account-section'
                        className='w-[93vw] mt-6 px-4 pt-3'
                    >
                        <SettingsOption title='Account' route="account" />
                        <SettingsOption title='Stats' route='stats' />
                        <SettingsOption title='Privacy & Security' route='security'/>
                        {/* <SettingsOption title='Display' route='display'/> */}
                        <SettingsOption title='Payments' route='payments'/>
                        <SettingsOption title='Tutorial' route='tutorial'/>
                    </View>
                </View>
                <View className='w-[100vw]'>
                    <View
                        id='account-section'
                        className='w-[93vw] mt-6 px-4 pt-3'
                    >
                        <SettingsOption title='Copyright Information' route='copyright'/>
                        <SettingsOption title='Privacy Policy' route='privacyPolicy'/>
                        <SettingsOption title='Contact Us' route='rateUs'/>
                        <SettingsOption title='About'  route='about'/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Settings;
