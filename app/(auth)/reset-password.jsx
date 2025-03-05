import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";
import FormField from '../components/FormField';
import BlurModalOk from '../components/BlurModalOk';
import CustomButton from "../components/CustomButton";
import ResetPasswordInput from "../components/ResetPasswordInput";
import PasswordStrengthEvaluator from '../utilities/PasswordStrengthEvaluator';
import DropDown from "../components/DropDown";
import { resetPassword } from '../lib/pulse-services';
import useApi from '../hooks/useApi';
import LoadingModal from '../components/LoadingModal';
import { getTranslation } from '../../constants/translations/translations';

const ResetPassword = () => {
    const [popUp, setPopUp] = useState(false)
    const [popUpMessage, setPopUpMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const evaluator = new PasswordStrengthEvaluator()
    const [resetPasswordRequest, setResetPasswordRequest] = useState({
        email: ""
        , securityQuestion: ""
        , securityAnswer: ""
        , newPassword: ""
        , confirmPassword: ""
    });

    const closePopUp = () => {
            setPopUp(false);
            setPopUpMessage("");
    };

    const { loading, data, error, refetch } = useApi(resetPassword);

    const onResetPassword = async () => {
        setLoadingSpinner(loading)
        setIsSubmitting(true);
    
        try {
            var passwordStrength = evaluator.validatePassword(resetPasswordRequest.newPassword).title;
    
    
            const response = await refetch(resetPasswordRequest);
            console.log("Response from refetch:", response); 
    
            if (!response) {
                setLoadingSpinner(false)
                setPopUp(true);
                setPopUpMessage("An error occurred. Please try again.");
                return;
            }
    
            setLoadingSpinner(false)

            if (resetPasswordRequest.newPassword !== resetPasswordRequest.confirmPassword) {
                setPopUp(true);
                setPopUpMessage(getTranslation("password.reset.OldAndNewPasswordDoesNotMatch"));
            } else if (passwordStrength === getTranslation("password.status.weak")) {
                setPopUp(true);
                setPopUpMessage(getTranslation("password.status.meetStrength"));
            } else if (response === 'verified') {
                setPopUp(true);
                setPopUpMessage(getTranslation("password.successful.successfulReset"));
                setTimeout(() => router.push("/sign-in"), 2000);
            } else if (response === getTranslation("password.reset.invalidCredentials")) {
                setPopUp(true);
                setPopUpMessage(getTranslation("password.reset.invalidCredentials"));
            } else if (response === getTranslation("password.reset.incorrectQuestion")) {
                setPopUp(true);
                setPopUpMessage(getTranslation("password.reset.incorrectQuestion"));
            } else if (response === getTranslation("password.reset.incorrectAnswer")) {
                setPopUp(true);
                setPopUpMessage(getTranslation("password.reset.incorrectAnswer"));
            } else {
                setPopUp(true);
                setPopUpMessage("An unexpected error occurred. Please try again.");
            }
    
        } catch (error) {
            console.log("Error during reset:", error);
            setPopUp(true);
            setPopUpMessage(getTranslation("password.reset.couldNotBeReset"));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <SafeAreaView className="h-full bg-primary">
            <ScrollView>
            {loadingSpinner && <LoadingModal />}
                {popUp &&
                   <BlurModalOk
                   visible={popUp}
                   onRequestClose={() => closePopUp()}
                   title={popUpMessage}
                   affirmativeButtonTitle='OK'
                   onYes={() => closePopUp()}
               />
                }
                <TouchableOpacity className='pl-5 mt-7' onPress={() => router.back()}>
                    <Image
                        className='w-[25px] h-[25px]'
                        source={icons.leftArrow}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <Text className='text-white text-base font-psemibold text-3xl justify-center pl-5 mt-7'>Reset
                    Password</Text>
                {/*               
                    <Text className='text-secondary font-psemibold text-1xl mt-7 pl-5'>Password has been
                        reset</Text> */}
                <View className='w-full h-full'>
                    <View className='p-2 mt-10'>
                        <FormField
                            placeholder={"Email"}
                            title='Email'
                            value={resetPasswordRequest.email}
                            handleChangeText={(e) => setResetPasswordRequest({ ...resetPasswordRequest, email: e })}
                            keyboardType='text'
                        />
                        <DropDown
                            testID='securityQuestion'
                            title='Security Question'
                            updateForm={(itemValue) => setResetPasswordRequest({ ...resetPasswordRequest, securityQuestion: itemValue })}
                            options={[
                                "Select your Security Question"
                                , "What was the name of your first pet?"
                                , "What was your childhood nickname?"
                                , "What is your mother’s maiden name?"
                                , "What is your favorite book?",
                                "What is your favorite movie?"
                                , "What was your favorite teacher’s name?",
                                "What is your favorite food?"
                            ]}
                        />
                        <FormField
                            placeholder={"Security Answer"}
                            title='Security Answer'
                            value={resetPasswordRequest.securityAnswer}
                            handleChangeText={(e) => setResetPasswordRequest({ ...resetPasswordRequest, securityAnswer: e })}
                            otherStyles='mt-7'
                            keyboardType='text'
                        />
                    </View>
                    <View>
                        <ResetPasswordInput
                            title='New Password'
                            password={(newPass) => setResetPasswordRequest(
                                {
                                    ...resetPasswordRequest
                                    , newPassword: newPass
                                }
                            )}
                        />
                        <ResetPasswordInput
                            title='Confirm Password'
                            placeholder='Confirm Password'
                            password={(confirmPass) => setResetPasswordRequest(
                                {
                                    ...resetPasswordRequest
                                    , confirmPassword: confirmPass
                                }
                            )}
                        />
                    </View>
                    <CustomButton
                        title='Reset Password'
                        handlePress={onResetPassword}
                        containerStyle='mt-7 mx-4 mb-[60px]'
                        isLoading={isSubmitting}

                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default ResetPassword;