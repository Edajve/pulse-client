import { Redirect, router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../context/GlobalProvider";
import CustomButton from "./components/CustomButton";
import { getTranslation } from "../constants/translations/translations";
import { printLocalHash } from "./utilities/localHashStorage";

export default function Index() {
    const { isLoading, isLoggedIn } = useGlobalContext();

    if (!isLoading && isLoggedIn) return <Redirect href='/home'/>;

    // const navigateTo

    printLocalHash()

    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className='flex-1 items-center justify-center'>
                    <Text className='text-4xl text-gray-100 font-semibold'>
                        {getTranslation('name.name')}
                    </Text>
                    <Text className='text-5xl text-gray-100 font-semibold mb-7 mt-7'>
                        Logo Here
                    </Text>
                    <CustomButton
                        title={getTranslation('buttons.continue')}
                        handlePress={() => router.push('/sign-in')}
                        containerStyle='w-[95vw] mt-7'
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
