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
    const [popUpMessage, setPopUpMessage] = useState("");
    const { signUpFormData } = useGlobalContext();
    const [popUp, setPopUp] = useState(false);

    useEffect(() => {
        const handleTerms = async () => {
            const userAlreadyExistsVerbage = getTranslation("text.userAlreadyExists");

            if (terms) {
                const response = await register(signUpFormData);
                if (response.data === userAlreadyExistsVerbage) {
                    setPopUp(true);
                    setTerms(null);
                    setPopUpMessage(userAlreadyExistsVerbage);
                } else {
                    router.replace('/sign-in');
                }
            } else if (terms === false) {
                setTerms(null);
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
        <>
            {popUp && (
                <BlurModalOk
                    visible={popUp}
                    onRequestClose={closePopUp}
                    title={popUpMessage}
                    affirmativeButtonTitle='OK'
                    onYes={closePopUp} 
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

                        {/* Terms & Conditions Text Blocks */}
                        {[
                            "consentToMessages",
                            "appPermissions",
                            "commercialUseProhibited",
                            "orderProcess",
                            "orderCancellations",
                            "paymentsAndBilling",
                            "disclaimersAndLiability",
                            "liabilityLimitations",
                            "userGeneratedContent",
                            "ugcGuidelines",
                            "ugcLicense",
                            "ugcResponsibilities"
                        ].map((key, index) => (
                            <Text key={index} className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                                {getTranslation(`longText.termsAndConditions.${key}`)}
                            </Text>
                        ))}

                        {/* Additional Provisions */}
                        <Text className='text-gray-200 text-base font-psemibold text-1xl mt-[32px]'>
                            {getTranslation("longText.termsAndConditions.additionalProvisions")}
                        </Text>

                        {[
                            "choiceOfForum",
                            "choiceOfLaw",
                            "severability",
                            "survival",
                            "waiver"
                        ].map((key, index) => (
                            <Text key={index} className='text-gray-200 text-base font-pregular text-1xl mt-[16px]'>
                                {getTranslation(`longText.termsAndConditions.${key}`)}
                            </Text>
                        ))}

                        {/* Accept Terms */}
                        <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                            Accept Terms: <Text className='font-psemibold'>{terms ? "Yes" : "No"}</Text>
                        </Text>

                        {/* Buttons */}
                        <View className='w-full flex-row justify-between mb-[70px]'>
                            <CustomButton
                                title='Accept'
                                containerStyle={`w-[40vw] mt-10 ${terms ? "bg-green" : ""}`}
                                handlePress={() => setTerms(true)}
                            />
                            <CustomButton
                                title='Reject'
                                containerStyle={`w-[40vw] mt-10 ${!terms ? "bg-red" : ""}`}
                                handlePress={() => setTerms(false)}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default TermsAndConditions;