import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link, router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { authenticate } from "../lib/pulse-services";
import BlurModalOk from '../components/BlurModalOk';

const SignIn = () => {
    const { setToken, setId, setIsLoggedIn } = useGlobalContext();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [togglePopup, setTogglePopUp] = useState(false);
    const [form, setForm] = useState({
        email: ''
        , password: ''
    });

    const rejectInitialRevoke = () => { setTogglePopUp(false); };

    const acceptInitialRevoke = () => { setTogglePopUp(false); };

    const submit = async () => {
        if (!form.email || !form.password)
            Alert.alert('Error', 'Please fill in all the fields')

        setIsSubmitting(true)

        try {
            const response = await authenticate(form);
            setToken(response.data.token.token);
            setId(response.data.id)
            setIsLoggedIn(true)

            router.replace('/home')
        } catch (error) {
            setTogglePopUp(true)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            {
                togglePopup && (
                    <BlurModalOk
                        visible={togglePopup}
                        onRequestClose={() => setTogglePopUp(false)}
                        title='Incorrect email or password. Please try again.'
                        affirmativeButtonTitle='OK'
                        onYes={acceptInitialRevoke}
                        onNo={rejectInitialRevoke}
                    />
                )
            }
            <ScrollView>
                <View className="w-full justify-center min-h-[80vh] px-4 my-6">
                    <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
                        Log in to Pulse
                    </Text>
                    <FormField
                        title='Email'
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles='mt-7'
                        keyboardType='email-address'
                    />
                    <FormField
                        title='Password'
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles='mt-7'
                    />
                    <CustomButton
                        title='Log In'
                        handlePress={submit}
                        containerStyle='mt-7'
                        isLoading={isSubmitting}
                    />
                    <View className='justify-center pt-5 flex-row gap-2 mt-2'>
                        <Text
                            className='text-lg text-gray-100 font-pregular'
                        >
                            Forgot Password?
                        </Text>
                        <Link
                            href='/reset-password'
                            className='text-lg font-semibold text-secondary'
                        >
                            Reset Password
                        </Link>
                    </View>
                    <View className='justify-center pt-5 flex-row gap-2'>
                        <Text
                            className='text-lg text-gray-100 font-pregular'
                        >
                            Don't have an account?
                        </Text>
                        <Link
                            href='/sign-up'
                            className='text-lg font-semibold text-secondary'
                        >
                            Sign Up
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;