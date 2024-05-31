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
                        <Text className='text-4xl text-gray-200 font-psemibold'>
                            Create Consent Document
                        </Text>
                        <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                            This mobile application facilitates the process of entering into consent contracts with other individuals. Users can initiate these contracts, ensuring mutual agreement and understanding between all parties involved. To commence the consent contract, both parties are required to input the same contract number along with their respective passwords, prioritizing everyone's safety and security.
                            </Text>
                        <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                            Once the consent contract is established, every action or update made to the active contract is meticulously documented within the application. This comprehensive documentation ensures transparency and accountability, allowing all parties to view and track the progress and history of the contract.
                        </Text>
                        <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                            By default, the consent contract has a duration of 60 minutes. However, users have the flexibility to adjust the duration based on mutual agreement. This feature empowers individuals to customize the contract to meet their specific needs and preferences, thereby enhancing the effectiveness and inclusivity of the consent contract process.
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
