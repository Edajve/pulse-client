import React from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import icons from "../../constants/icons";
import {useGlobalContext} from "../../context/GlobalProvider";
import {router} from "expo-router";

const Profile = () => {
    const {setIsLoggedIn, setUser, user, setToken, token, setId} = useGlobalContext();

    const logout = () => {
        console.log('logging user out')
        setToken(null)
        setIsLoggedIn(false);
        setUser(null)
        setId(null)
        router.replace('/sign-in')
    };

    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView className='px-4 my-6'>
                <View className='flex-row justify-between'>
                    <View className='mb-24'>
                        <Text className='text-2xl text-white font-semibold'>
                            Profile
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            className='w-full items-end mb-24'
                            onPress={logout}
                        >
                            <Image
                                source={icons.logout}
                                resizeMode='contain'
                                className='h-6 w-6'
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
