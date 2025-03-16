import { router, Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";
import { ROUTES } from '../utilities/Routes';
import * as LocalAuthentication from 'expo-local-authentication';
import { useLocalSearchParams } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import { registerWithLocalHash } from '../lib/pulse-services';
import { getTranslation } from '../../constants/translations/translations';
import { updateUser } from '../lib/pulse-services';

const BiometricAuthentication = () => {
    const [popUpMessage, setPopUpMessage] = useState("");

    const { localHash } = useLocalSearchParams();
    const { setToken, setId, setIsLoggedIn, id } = useGlobalContext();

    useEffect(() => {
        handleBiometricAuth();
    }, []);

    const handleBiometricAuth = async () => {
        try {

            const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

            if (!isBiometricAvailable) {

                setPopUpMessage("Biometric authentication is not supported.");
                return;
            }

            const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
            if (!isBiometricEnrolled) {

                setPopUpMessage("No biometric records found. Please log in with your password.");
                return;
            }

            const biometricAuth = await LocalAuthentication.authenticateAsync({
                promptMessage: "Authenticate with Face ID / Fingerprint",
                fallbackLabel: "Use Passcode",
                disableDeviceFallback: false, // Allow fallback to passcode
            });


            if (biometricAuth.success) {

                const response = await registerWithLocalHash(localHash)

                const token = response.data.token

                if (token) {

                    await updateUser(
                        id, 
                        {
                            hasUserBeenAskedAuthMethod: true,
                            authMethod: "BIOMETRIC"
                        },
                        token
                    )

                    setToken(response.data.token)
                    setId(response.data.id)
                    setIsLoggedIn(true)
                    router.replace(ROUTES.HOME);

                } else {
                    setPopUpMessage("Biometric authentication failed. Please try again.");
                }

            } else {

                setPopUpMessage("Biometric authentication failed. Please try again.");
            }
        } catch (error) {

            setPopUpMessage("An error occurred during biometric authentication.");
        }
    };

    return (
        <SafeAreaView className="bg-primary h-full p-5">
            <View className='mt-4 mb-9'>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image
                        className='w-[25px] h-[25px]'
                        source={icons.leftArrow}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View>
                <Text className="text-white text-center text-xl">Biometric Authentication</Text>
                
            </View>

            <View className='justify-center pt-5 flex-row gap-2'>
                <Text
                    className='text-lg text-gray-100 font-pregular'
                >
                    {getTranslation('password.text.loginInWithBasic')}
                </Text>
                <Link
                    href='/sign-in'
                    className='text-lg font-semibold text-secondary'
                >
                    {getTranslation('buttons.login')}
                </Link>
            </View>
        </SafeAreaView>
    );
};

export default BiometricAuthentication;