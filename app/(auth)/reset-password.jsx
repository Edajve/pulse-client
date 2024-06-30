import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";
import BlurModalOk from '../components/BlurModalOk';
import CustomButton from "../components/CustomButton";
import ResetPasswordInput from "../components/ResetPasswordInput";
import PasswordStrengthEvaluator from '../utilities/PasswordStrengthEvaluator';

const ResetPassword = () => {
    const [popUp, setPopUp] = useState(false)
    const [popUpMessage, setPopUpMesage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);
    const evaluator = new PasswordStrengthEvaluator()
    const [newPasswords, setNewPasswords] = useState({
        newPassword: ""
        , confirmPassword: ""
    });

    const closePopUp = () => {
        setPopUpMesage("")
        setPopUp(false)
    }

    const onResetPassword = () => {
        setIsSubmitting(true);
        try {


            // Check if both passwords are filled in
            if (newPasswords.newPassword === "" || newPasswords.confirmPassword === "") {
                setPopUp(true);
                setPopUpMesage("Both new and confirming passwords need to be filled in");
            }
            // Check if both passwords match
            else if (newPasswords.newPassword !== newPasswords.confirmPassword) {
                setPopUp(true);
                setPopUpMesage("Both new and confirming passwords should match");
            }
            // Check if password meets criteria
            else if (!evaluator.doesPasswordMeetRequirements(newPasswords.newPassword)) {
                setPopUp(true);
                setPopUpMesage("New Password doesn't meet the criteria");
            }
            // Password passed all checks
            else {
                // Reset password logic
                // Example: call API or perform reset action
                console.log("Password meets criteria. Proceed with reset logic.");
            }
        } catch (error) {
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <SafeAreaView className="h-full bg-primary">
            <ScrollView>
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
                    </View>
                    <View>
                        <ResetPasswordInput
                            title='New Password'
                            password={(newPass) => setNewPasswords(
                                {
                                    ...newPasswords
                                    , newPassword: newPass
                                }
                            )}
                        />
                        <ResetPasswordInput
                            title='Confirm Password'
                            placeholder='Confirm Password'
                            password={(confirmPass) => setNewPasswords(
                                {
                                    ...newPasswords
                                    , confirmPassword: confirmPass
                                }
                            )}
                        />
                    </View>
                    <CustomButton
                        title='Reset Password'
                        handlePress={onResetPassword}
                        containerStyle='mt-7 mx-4'
                        isLoading={isSubmitting}

                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default ResetPassword;