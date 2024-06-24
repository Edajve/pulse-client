import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";

const Copyright = () => {

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
                <Text> Payments</Text>
            </View>
        </SafeAreaView>
    )
}

export default Copyright