import React from 'react';
import {ScrollView, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const SignIn = () => {

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[80vh] px-4 my-6">
                    <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
                       Login
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;