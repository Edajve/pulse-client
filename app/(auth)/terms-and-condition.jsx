import { ScrollView, View, Text, Alert, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { useState, useEffect } from "react";
import icons from "../../constants/icons";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { register } from "../lib/pulse-services";
import { getTranslation } from "../../constants/translations/translations";
import BlurModalOk from "../components/BlurModalOk";

const TermsAndConditions = () => {
    const [terms, setTerms] = useState(null);
     const [popUpMessage, setPopUpMessage] = useState("")
    const { signUpFormData } = useGlobalContext();
    const [popUp, setPopUp] = useState(false)

    useEffect(() => {
        const handleTerms = async () => {
            
            if (signUpFormData) {
                console.log("Form Data:", signUpFormData);
            }

            if (terms) {
                await register(signUpFormData);
                router.replace('/home');
            } else if (terms == false) {
                setTerms(null)
                setPopUp(true);
                setPopUpMessage(getTranslation("text.termsAndConditionPopUp"));
            }
        };

        handleTerms();
    }, [signUpFormData, terms]);

    const closePopUp = () => {
            setPopUp(false);
            setPopUpMessage("");
    };

    return ( 
        <> {popUp && (
            <BlurModalOk
            visible={popUp}
            onRequestClose={() => closePopUp()}
            title={popUpMessage}
            affirmativeButtonTitle='OK'
            onYes={() => closePopUp()} 
            />
        )}
        <SafeAreaView className='w-full h-full bg-primary px-5 '>
            <TouchableOpacity className='pl-5 mt-7' onPress={() => router.back()}>
                <Image className='w-[25px] h-[25px]' source={icons.leftArrow} resizeMode="contain" />
            </TouchableOpacity>
            <ScrollView>
                <View className='w-full h-full items-center justify-center mt-[20px]'>
                    <Text className='text-white text-base font-psemibold text-2xl'>
                        {getTranslation('text.TermsandCondition')}
                    </Text>
                    
                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        {getTranslation("longText.termsAndConditions.consentToMessages")}
                    </Text>

                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        {getTranslation("longText.termsAndConditions.appPermissions")}
                    </Text>

                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        {getTranslation("longText.termsAndConditions.commercialUseProhibited")}
                    </Text>

                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        {getTranslation("longText.termsAndConditions.orderProcess")}
                    </Text>

                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        {getTranslation("longText.termsAndConditions.orderCancellations")}
                    </Text>

                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        {getTranslation("longText.termsAndConditions.paymentsAndBilling")}
                    </Text>

                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        {getTranslation("longText.termsAndConditions.disclaimersAndLiability")}
                    </Text>

                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        {getTranslation("longText.termsAndConditions.liabilityLimitations")}
                    </Text>

                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        {getTranslation("longText.termsAndConditions.userGeneratedContent")}
                    </Text>

                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        {getTranslation("longText.termsAndConditions.ugcGuidelines")}
                    </Text>

                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        {getTranslation("longText.termsAndConditions.ugcLicense")}
                    </Text>

                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        {getTranslation("longText.termsAndConditions.ugcResponsibilities")}
                    </Text>

                    <Text className='text-gray-200 text-base font-psemibold text-1xl mt-[32px]'>
                        {getTranslation("longText.termsAndConditions.additionalProvisions")}
                    </Text>

                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[16px]'>
                        {getTranslation("longText.termsAndConditions.choiceOfForum")}
                    </Text>

                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[16px]'>
                        {getTranslation("longText.termsAndConditions.choiceOfLaw")}
                    </Text>

                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[16px]'>
                        {getTranslation("longText.termsAndConditions.severability")}
                    </Text>

                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[16px]'>
                        {getTranslation("longText.termsAndConditions.survival")}
                    </Text>

                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[16px]'>
                        {getTranslation("longText.termsAndConditions.waiver")}
                    </Text>

                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        Accept Terms: {terms ? "Yes" : "No"}
                    </Text>

                    <View className='w-full flex-row justify-between mb-[70px]'>
                        <View>
                            <CustomButton
                                title='Accept'
                                containerStyle={`w-[40vw] mt-10 ${terms ? "bg-green" : ""}`}
                                handlePress={() => setTerms(true)}
                            />
                        </View>
                        <View>
                            <CustomButton
                                title='Reject'
                                containerStyle={`w-[40vw] mt-10 ${!terms ? "bg-red" : ""}`}
                                handlePress={() => setTerms(false)}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        </>
    );
};

export default TermsAndConditions;