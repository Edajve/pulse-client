import { ScrollView, Text, View } from "react-native";
import { Redirect } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import CustomButton from "./components/CustomButton";
import { router } from "expo-router";

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
                    <Text className='text-5xl text-white font-semibold mt-7'>
                        Logo Here
                    </Text>
                    <CustomButton
                        title="Continue"
                        handlePress={() => router.push('/sign-in')}
                        containerStyle='w-full mt-7'
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
