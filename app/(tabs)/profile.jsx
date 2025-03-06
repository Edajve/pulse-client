import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import icons from "../../constants/icons";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";
import CustomButton from "../components/CustomButton";
import PersonalQr from "../components/PersonalQr";
import LoadingModal from '../components/LoadingModal';
import { getTranslation } from '../../constants/translations/translations';

const Profile = () => {
    const { setIsLoggedIn, setUser, user, setToken, setId } = useGlobalContext();
    const [showQr, setShowQr] = useState()
    const [loading, setLoading] = useState(null)

    const logout = () => {
        console.log('logging user out')
        setToken(null)
        setIsLoggedIn(false);
        setUser(null)
        setId(null)
        router.replace('/sign-in')
    };

    const showQrCode = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false); // Hide loading after 200ms
            setShowQr(true);
        }, 200);
    }

    return (
        <>
            {showQr && (
                <PersonalQr
                    closeQr={() => setShowQr(false)}
                />
            )}
            
            {loading && ( <LoadingModal/> )}

            {!showQr && (
                <SafeAreaView className='bg-primary h-full'>
                    <ScrollView className='px-4 my-6'>
                        <View className='flex-row justify-between'>
                            <View className='mb-24'>
                                <Text className='text-4xl text-gray-200 font-psemibold'>
                                    Hey {user?.firstName}
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
                        <Text className='text-gray-200 text-base font-pregular text-1xl text-center mb-[50]'>
                            {getTranslation('longText.ProfileQrVerbage')}
                        </Text>
                        <CustomButton
                            title= {getTranslation('text.showQrCode')}
                            handlePress={showQrCode}
                        />
                    </ScrollView>
                </SafeAreaView>
            )}
        </>
    );
};

export default Profile;
