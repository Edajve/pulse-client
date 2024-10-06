import { Link, router } from "expo-router";
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import BlurModalOk from '../components/BlurModalOk';
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import { authenticate, updatePinSeting } from "../lib/pulse-services";
import BlurModalYesOrNo from "../components/BlurModalYesOrNo"
import PinModal from "../components/PinModal";

const SignIn = () => {
    const { setToken, setId, setIsLoggedIn, id, user, token } = useGlobalContext();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [modalForIncorrectCredentials, setModalForIncorrectCredentials] = useState(false);
    const [modalForEmptyFields, setModalForEmptyFields] = useState(false);
    const [popUpForPinPrompt, setPopUpForPinPrompt] = useState(null)
    const [pinPopUp, setPinPopup] = useState(null)
    const [pinStep, setPinStep] = useState()
    const [form, setForm] = useState({
        email: ''
        , password: ''
    });
    const [pin, setPin] = useState({
        pin: "",
        confirmPin: ""
    })

    useEffect(() => {
        promptForPIN();
    }, [pinStep]);

    const promptForPIN = () => {
        if (user?.isBiometricLogin === undefined) {
            setPopUpForPinPrompt(true)
        }
    }

    const acceptInitialRevoke = async () => {
        // go through PIN flow
        setPopUpForPinPrompt(false)
        setPinPopup(true)

        // await updatePinSeting(token, id, true)
    }

    const rejectInitialRevoke = async () => {
        setPopUpForPinPrompt(false)
    }

    const acceptButtonOnToggle = () => {
        // no two modals should be up at the same time
        if (modalForIncorrectCredentials) setModalForIncorrectCredentials(false)
        if (modalForEmptyFields) setModalForEmptyFields(false)
    };

    const recievePinFromChild = (pin) => {
        setPinPopup(false)
        setPin(prevPin => ({
            ...prevPin,
            pin: pin
        }));
    }

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
                pinPopUp && (
                    <PinModal
                        visible={pinPopUp}
                        onRequestClose={() => setPinPopup(false)}
                        title='Insert Pin'
                        affirmativeButtonTitle='OK'
                        onYes={acceptButtonOnToggle}
                        sendDataToParent={(pin) => recievePinFromChild(pin)}
                    />
                )
            }

            {
                popUpForPinPrompt && (
                    <BlurModalYesOrNo
                        visible={popUpForPinPrompt}
                        onRequestClose={() => setPopUpForPinPrompt(false)}
                        title='Set a PIN for Easy Login?'
                        affirmativeButtonTitle='Set PIN'
                        negativeButtonTitle='Maybe Later'
                        onYes={acceptInitialRevoke}
                        onNo={rejectInitialRevoke}
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