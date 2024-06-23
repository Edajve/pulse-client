import { Link, router } from "expo-router";
import React, { useState } from 'react';
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import BlurModalOk from '../components/BlurModalOk';
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import { authenticate } from "../lib/pulse-services";

const SignIn = () => {
    const { setToken, setId, setIsLoggedIn } = useGlobalContext();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [modalForIncorrectCredentials, setModalForIncorrectCredentials] = useState(false);
    const [modalForEmptyFields, setModalForEmptyFields] = useState(false);
    const [form, setForm] = useState({
        email: ''
        , password: ''
    });

    const acceptButtonOnToggle = () => {
        // no two modals should be up at the same time
        if (modalForIncorrectCredentials) setModalForIncorrectCredentials(false)
        if (modalForEmptyFields) setModalForEmptyFields(false)
    };

    const submit = async () => {
        if (!form.email || !form.password) {
            setModalForEmptyFields(true)
            return
        }

        setIsSubmitting(true)

        try {
            const response = await authenticate(form);
            setToken(response.data.token.token);
            setId(response.data.id)
            setIsLoggedIn(true)

            router.replace('/home')
        } catch (error) {
            setModalForIncorrectCredentials(true)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            {
                modalForIncorrectCredentials && (
                    <BlurModalOk
                        visible={modalForIncorrectCredentials}
                        onRequestClose={() => setModalForIncorrectCredentials(false)}
                        title='Incorrect email or password. Please try again.'
                        affirmativeButtonTitle='OK'
                        onYes={acceptButtonOnToggle}
                    />
                )
            }
            {
                modalForEmptyFields && (
                    <BlurModalOk
                        visible={modalForEmptyFields}
                        onRequestClose={() => setModalForEmptyFields(false)}
                        title='You have some missing fields'
                        affirmativeButtonTitle='OK'
                        onYes={acceptButtonOnToggle}
                    />
                )
            }
            <ScrollView>
                <View className="w-full justify-center min-h-[80vh] px-4 my-6">
                    <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
                        Log in to Pulse
                    </Text>
                    <FormField
                        placeholder={"email"}
                        title='Email'
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles='mt-7'
                        keyboardType='email-address'
                    />
                    <FormField
                        placeholder={"password"}
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