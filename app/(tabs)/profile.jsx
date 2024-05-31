import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import icons from "../../constants/icons";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";
import CustomButton from "../components/CustomButton";
import PersonalQr from "../components/PersonalQr";
import BlurryModalYesOrNo from "../components/BlurModalYesOrNo"

const Profile = () => {
    const { setIsLoggedIn, setUser, user, setToken, setId } = useGlobalContext();
    const [showQr, setShowQr] = useState()
    const [logoutModal, setLogoutModal] = useState(false)

    const logout = () => {
        try {
            setToken(null);
            setIsLoggedIn(false);
            setUser(null);
            setId(null);
            router.replace('/sign-in');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    
    return (
        <>
            {showQr && (
                <PersonalQr
                    closeQr={() => setShowQr(false)}
                />
            )}

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
                                    onPress={() => setLogoutModal(true)}
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
                            handlePress={() => setShowQr(true)}
                        />
                    </ScrollView>
                </SafeAreaView>
            )}
            {logoutModal && (
                <BlurryModalYesOrNo
                    visible={logoutModal}
                    // onRequestClose={() => setLogoutModal(false)}
                    title='Logout?'
                    affirmativeButtonTitle='Yes'
                    negativeButtonTitle='No'
                    onYes={() => logout()}
                    onNo={() => setLogoutModal(false)}
                    styles='h-[200px] justify-center'
                />
            )}
        </>
    );
};

export default Profile;
