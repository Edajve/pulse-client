import { router } from 'expo-router';
import React, { useState } from 'react';
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

const ResetPassword = () => {
    const [popUp, setPopUp] = useState(false)
    const [popUpMessage, setPopUpMesage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);
    const evaluator = new PasswordStrengthEvaluator()
    const [resetPasswordRequest, setResetPasswordRequest] = useState({
        email: ""
        , securityQuestion: ""
        , securityAnswer: ""
        , newPassword: ""
        , confirmPassword: ""
    });

    const closePopUp = () => {
        setPopUpMesage("")
        setPopUp(false)
    }

    const { loading, data, error, refetch } = useApi(resetPassword);

    const onResetPassword = async () => {

        setIsSubmitting(true);

        try {
            
            // BEFORE attempting to reset password, check password strength
            var passwordStrength = evaluator.validatePassword(resetPasswordRequest.newPassword).title;


            // AFTER attempting to reset password, show additional errors
            await refetch(resetPasswordRequest);
            
            if (resetPasswordRequest.newPassword !== resetPasswordRequest.confirmPassword) {
                setPopUp(true);
                setPopUpMesage("Both new password and confirming new password does not match");
            } else if (passwordStrength === "Weak Password") {
                setPopUp(true);
                setPopUpMesage("Password needs to meet strength requirement");
            } else if (data === 'Successfully reset password') {
                setPopUp(true);
                setPopUpMesage("Password reset successfully");
                router.push('/sign-in');
            } else if (data === 'Invalid credentials') {
                setPopUp(true);
                setPopUpMesage("Invalid credentials");
            } else if (data === 'Security Question is incorrect') {
                setPopUp(true);
                setPopUpMesage("Security Question is incorrect");
            } else if (data === 'Security Answer is incorrect') {
                setPopUp(true);
                setPopUpMesage("Security Answer is incorrect");
            }
        
        } catch (error) {
            console.log('Error occurred:', error);
        } finally {
            setIsSubmitting(false);
            setPopUp(false);
        }
    };

    return (
        <SafeAreaView className="h-full bg-primary">
            <ScrollView>
                {loading && (
                    <LoadingModal />
                )}
                {popUp &&
                    < BlurModalOk
                        visible={popUp}
                        onRequestClose={() => closePopUp(false)}
                        title={popUpMessage}
                        affirmativeButtonTitle='OK'
                        onYes={() => closePopUp(false)}
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
                            value={setResetPasswordRequest.email}
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
                        handlePress={() => onResetPassword()}
                        containerStyle='mt-7 mx-4 mb-[60px]'
                        isLoading={isSubmitting}

                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default ResetPassword;