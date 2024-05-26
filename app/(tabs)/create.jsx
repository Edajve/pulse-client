import { router } from "expo-router";
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import QrCamera from "../components/QrCamera";

const Create = () => {
    const [showCamera, setShowCamera] = useState(false);
    const [showAuthenticationIntoConsent, setShowAuthenticationIntoConsent] = useState(false);
    const [scannieInfo, setScannieInfo] = useState(null);

    const closeCamera = () => setShowCamera(false);
    const openCamera = () => setShowCamera(true);

    useEffect(() => {
        if (showAuthenticationIntoConsent) {

            router.replace('/password-validate')            
        }
    }, [showAuthenticationIntoConsent, scannieInfo]);

    const showMainCreatePage = !showCamera;

    return (
        <>
            {showCamera && (
                <QrCamera
                    isQrValid={() => setShowAuthenticationIntoConsent(true)}
                    closeCamera={closeCamera}
                />
            )}

            {showMainCreatePage && (
                <SafeAreaView className="bg-primary h-full">
                    <ScrollView className="px-4 my-6">
                        <Text className="text-2xl text-white font-semibold">
                            Create Consent Document
                        </Text>
                        <View>
                            <CustomButton
                                title="Scan QR Code"
                                handlePress={openCamera}
                                containerStyle="mt-10"
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            )}
        </>
    );
};

export default Create;
