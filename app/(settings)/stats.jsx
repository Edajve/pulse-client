import { router } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";
import InformationBlock from '../components/SettingsInformationBlocks';

const Stats = () => {

    return (
        <SafeAreaView className="bg-primary h-full p-5">
            <View className='mt-4 mb-9'>
                <TouchableOpacity onPress={() => router.back('/settings')}>
                    <Image
                        className='w-[25px] h-[25px]'
                        source={icons.leftArrow}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View>
                <InformationBlock title='Total Contracts' text='10' />
                <InformationBlock title='Contracts Revoked' text='1' />
                <InformationBlock title='Successful to Revoked contract ratio' text='1.25%' />
                <InformationBlock title='Most consent parthner' text='Nikki' />
                <InformationBlock title='Most revoked parthner' text='Lala' />
            </View>
        </SafeAreaView>
    )
}

export default Stats