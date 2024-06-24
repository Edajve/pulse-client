import { router } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";

const Stats = () => {
    const InformationBlock = ({ title, text }) => {
        return (
            <>
                <Text
                    className='text-lg text-gray-100 font-semibold mt-1 font-pbold'
                >
                    {title}
                </Text>
                <Text
                    className='text-lg text-gray-100 font-semibold mb-6 pl-2 font-pregular'
                >
                    {text}
                </Text>
            </>
        )
    }

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
                <InformationBlock title='Successful to Revoked contract ration' text='1.25%' />
                <InformationBlock title='Most consent parthner' text='Nikki' />
                <InformationBlock title='Most revoked parthner' text='Lala' />
            </View>
        </SafeAreaView>
    )
}

export default Stats