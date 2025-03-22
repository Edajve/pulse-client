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
import { saveLocalHash } from "../utilities/localHashStorage";
import { ROUTES } from "../utilities/Routes";
import useApi from "../hooks/useApi";
import LoadingModal from "../components/LoadingModal";

const TermsAndConditions = () => {
    const [terms, setTerms] = useState(null);
    const [popUpMessage, setPopUpMessage] = useState("");
    const [popUp, setPopUp] = useState(false);

    const { signUpFormData } = useGlobalContext();

    // 🧠 Wrap register so it fits useApi's one-param signature
    const wrappedRegister = async (payload) => {
        return await register(payload);
    };

    const { data, error, loading, refetch } = useApi(wrappedRegister);

    useEffect(() => {
        const handleTerms = async () => {
            const userAlreadyExistsVerbage = getTranslation("text.userAlreadyExists");

            if (terms === true) {
                try {
                    const response = await refetch(signUpFormData);

                    if (response?.data === userAlreadyExistsVerbage) {
                        setPopUp(true);
                        setTerms(null);
                        setPopUpMessage(userAlreadyExistsVerbage);
                    } else {
                        await saveLocalHash(response?.data?.localHash);
                        router.replace('/sign-in');
                    }
                } catch (err) {
                    console.error("Error registering user:", err);
                    setPopUp(true);
                    setPopUpMessage("An unexpected error occurred.");
                }
            } else if (terms === false) {
                setTerms(null);
                setPopUp(true);
                setPopUpMessage(getTranslation("text.termsAndConditionPopUp"));
            }
        };

        handleTerms();
    }, [terms]); // only run when user makes a choice

    const closePopUp = () => {
        setPopUp(false);
        setPopUpMessage("");
    };

    return (
        <>
    
            {loading && (
                <LoadingModal />
            )}
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
                <TouchableOpacity className='pl-5 mt-7' onPress={() => router.navigate(ROUTES.SIGN_UP)}>
                    <Image className='w-[25px] h-[25px]' source={icons.leftArrow} resizeMode="contain" />
                </TouchableOpacity>
                <ScrollView>
                    <View className='w-full h-full items-center justify-center mt-[20px]'>
                        <Text className='text-white text-base font-psemibold text-2xl'>
                            {getTranslation('text.TermsandCondition')}
                        </Text>

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

                        <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                            Accept Terms: <Text className='font-psemibold'>{terms ? "Yes" : "No"}</Text>
                        </Text>

                        <View className='w-full flex-row justify-between mb-[70px]'>
                            <CustomButton
                                title='Accept'
                                containerStyle={`w-[40vw] mt-10 ${terms ? "bg-green" : ""}`}
                                handlePress={() => setTerms(true)}
                                isLoading={loading}
                            />
                            <CustomButton
                                title='Reject'
                                containerStyle={`w-[40vw] mt-10 ${terms === false ? "bg-red" : ""}`}
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