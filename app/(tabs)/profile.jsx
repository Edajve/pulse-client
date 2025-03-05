import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import icons from "../../constants/icons";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";
import CustomButton from "../components/CustomButton";
import PersonalQr from "../components/PersonalQr";
import LoadingModal from '../components/LoadingModal';

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
        setLoading(true); // ✅ Set loading state to true

        setTimeout(() => {
            setLoading(false); // ✅ Hide loading after 200ms
            setShowQr(true); // ✅ Show QR code after delay
        }, 200);
    }

    return (
        <>
            {showQr && (
                <PersonalQr
                    closeQr={() => setShowQr(false)}
                />
            )}

            
            {loading && (
                <LoadingModal/>
            )
            }

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
                            This mobile application offers users a personalized QR code for identity verification. Users are cautioned against scanning codes of individuals they aren't consenting to engage with in a contractual agreement. When scanning, users must authenticate their identity with a password, ensuring informed and deliberate consent in the contract process.
                        </Text>
                        <CustomButton
                            title='Show Personal QR-Code'
                            handlePress={showQrCode}
                        />
                    </ScrollView>
                </SafeAreaView>
            )}
        </>
    );
};

export default Profile;
