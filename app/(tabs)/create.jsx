import React, { useState } from 'react';
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QrCamera from "../components/QrCamera";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";

const Create = () => {
    const [showCamera, setShowCamera] = useState(false);
    const [passwordField, setPasswordField] = useState(false);

    const closeCamera = () => setShowCamera(false);
    const openCamera = () => setShowCamera(true);

    if (passwordField) {
         // Check if passwordField is true before navigating
         if (passwordField === true) router.push('/password-validate');
    }

    const showMainCreatePage = !showCamera;

    return (
        <>
            {showCamera && (
                <QrCamera
                    isQrValid={() => setPasswordField(true)}
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
