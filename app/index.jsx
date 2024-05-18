import {ScrollView, Text, View} from "react-native";
import {Redirect} from "expo-router";
import {useGlobalContext} from "../context/GlobalProvider";
import {SafeAreaView} from "react-native-safe-area-context";
import React from "react";

export default function Index() {
    const {isLoading, isLoggedIn} = useGlobalContext()

    if (!isLoading && isLoggedIn) return <Redirect href='/home'/>

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[80vh] px-4 my-6">
                    <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
                        Sign Up
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
