import React, {useState} from 'react';
import {Alert, Image, ScrollView, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import ResetPasswordInput from "../components/ResetPasswordInput";
import image from "../../constants/images"
import CustomButton from "../components/CustomButton";

const ResetPassword = () => {

    const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newPasswords, setNewPasswords] = useState({
        newPassword: ""
        , confirmPassword: ""
    });

    const onResetPassword = () => {
        setIsSubmitting(true);
        try {
            if (newPasswords.newPassword === "" || newPasswords.confirmPassword === "") Alert.alert("Empty Password", "You have to fill in both passwords")
            else if (newPasswords.newPassword === newPasswords.confirmPassword) setDoPasswordsMatch(true)
            else Alert.alert("Passwords are not matching", "The new password and confirm new password must match")
        } catch (e) {
            Alert.alert("Passwords are not matching", "The new password and confirm new password must match")
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <SafeAreaView className="h-full bg-primary">
            <ScrollView>
                <Text className='text-white text-base font-psemibold text-3xl justify-center pl-5 mt-7'>Reset
                    Password</Text>
                {doPasswordsMatch ? (
                    <Text className='text-secondary font-psemibold text-1xl mt-7 pl-5'>Password has been
                        reset</Text>) : (<View className='w-full h-full'>
                    <View className='p-2 mt-10'>
                    </View>
                    {(newPasswords.newPassword === "") && (
                        <View className='w-full h-[170px] items-center justify-center mt-2'>
                            <Image
                                className='w-[120px] h-[120px]'
                                source={image.resetpass}
                                resizeMode="contain"
                            />
                        </View>
                    )}
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
                </View>)}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ResetPassword;