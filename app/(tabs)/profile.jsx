import React from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {useGlobalContext} from "../../context/GlobalProvider";
import {ScrollView, Text} from "react-native";

const Profile = () => {
    const {
        isLoggedIn
        , setIsLoggedIn
        , user
        , setUser
        , isLoading
    } = useGlobalContext()

    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView className={'px-4 my-6'}>
                <Text className={'text-2xl text-white font-semibold'}>
                    Profile
                </Text>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;