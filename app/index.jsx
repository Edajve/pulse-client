import {Redirect, router} from "expo-router";
import {useGlobalContext} from "../context/GlobalProvider";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, View, Text} from "react-native";
import CustomButton from "./components/CustomButton";
import Profile from "./(tabs)/profile";

export default function Index() {
    const { isLoading, isLoggedIn } = useGlobalContext();

    if (!isLoading && isLoggedIn) return <Redirect href='/home'/>;

    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className='flex-1 items-center justify-center'>
                    <Text className='text-4xl text-white font-semibold'>
                        Pulse
                    </Text>
                    <Text className='text-5xl text-white font-semibold mb-7 mt-7'>
                        Logo Here
                    </Text>
                    <CustomButton
                        title="Continue"
                        handlePress={() => router.push('/sign-in')}
                        containerStyle='w-[95vw] mt-7'
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
        // <Profile/>
    );
}
