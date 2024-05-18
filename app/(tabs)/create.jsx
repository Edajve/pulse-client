import React from 'react';
import {ScrollView, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const Create = () => {

    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView className={'px-4 my-6'}>
                <Text className={'text-2xl text-white font-semibold'}>
                   Create
                </Text>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Create;