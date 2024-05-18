import React from 'react';
import {ScrollView, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const ResetPassword = () => {

    return (
        <SafeAreaView className="h-full bg-primary">
            <ScrollView>
                <Text className='text-white text-base font-psemibold text-3xl justify-center pl-5 mt-7'>Reset
                    Password</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ResetPassword;