import { router } from "expo-router";
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import QrCamera from "../components/QrCamera";
import { getTranslation } from "../../constants/translations/translations";

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
                        <Text className='text-4xl text-gray-200 font-psemibold'>
                            {getTranslation('text.createConsentDocument')}
                        </Text>
                        <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                            {getTranslation('longText.createConsentVerbage.paragraphOne')}
                        </Text>
                        <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                            {getTranslation('longText.createConsentVerbage.paragraphTwo')}
                        </Text>
                        <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                            {getTranslation('longText.createConsentVerbage.paragraphThree')}
                        </Text>
                        <View>
                            <CustomButton
                                title={getTranslation('buttons.scanQrCode')}
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
