import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link, router } from "expo-router";
import DropDown from "../components/DropDown";
import { register } from "../lib/pulse-services";

const SignUp = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'USER',
        accountCreatedDate: new Date().toISOString(),
        sex: '',
        dateOfBirth: '',
        countryRegion: ''
    });

    const submit = async () => {

        if (!checkSignInFields()) return;

        setIsSubmitting(true);

        try {
            await register(form);

            router.replace('/terms-and-condition');

        } catch (error) {
            console.error('Register error:', error);
            Alert.alert('Error', error.message || 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    function checkSignInFields() {
        // Are all fields not null
        if (
            !form.firstName ||
            !form.lastName ||
            !form.email ||
            !form.password ||
            !form.dateOfBirth
        ) {
            Alert.alert('Error', 'Please fill in all the fields');
            return false;
        }

        // is DoB in correct formatting? MM-DD-YYYY
        const datePattern = /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/;
        if (!datePattern.test(form.dateOfBirth)) {
            Alert.alert('Date Of Birth Incorrect format', 'The correct format is MM-DD-YYYY');
            return false;
        }

        // Calculate age
        const dateParts = form.dateOfBirth.split("-");
        const dobDate = new Date(parseInt(dateParts[2]), parseInt(dateParts[0]) - 1, parseInt(dateParts[1]));
        const currentDate = new Date();
        const ageDifference = currentDate - dobDate;
        const ageInYears = ageDifference / (1000 * 60 * 60 * 24 * 365);

        // Check if user is over 18
        if (ageInYears < 18) {
            Alert.alert('Age Error', 'You have to be 18+');
            return false;
        }

        return true;
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[80vh] px-4 my-6">
                    <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
                        Sign Up to Pulse
                    </Text>
                    <FormField
                        placeholder={"First Name"}
                        title='First Name'
                        value={form.firstName}
                        handleChangeText={(e) => setForm({ ...form, firstName: e })}
                        otherStyles='mt-7'
                        keyboardType='text'
                    />
                    <FormField
                        placeholder={"Last Name"}
                        title='Last Name'
                        value={form.lastName}
                        handleChangeText={(e) => setForm({ ...form, lastName: e })}
                        otherStyles='mt-7'
                        keyboardType='text'
                    />
                    <FormField
                        placeholder={"Email"}
                        title='Email'
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles='mt-7'
                        keyboardType='email-address'
                    />
                    <FormField
                        placeholder={"Password"}
                        title='Password'
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles='mt-7'
                        keyboardType='default'
                        secureTextEntry={true}
                    />
                    <DropDown
                        testID='sexDropDown'
                        title='Sex'
                        updateForm={(itemValue) => setForm({ ...form, sex: itemValue })}
                        options={["Select your Sex", "MALE", "FEMALE", "NON_BINARY", "GENDER_QUEER", "OTHER"]}
                    />
                    <FormField
                        placeholder={"Date of Birth (18+) MM-DD-YYYY"}
                        title='Date of Birth (18+) MM-DD-YYYY'
                        value={form.dateOfBirth}
                        handleChangeText={(e) => setForm({ ...form, dateOfBirth: e })}
                        otherStyles='mt-7'
                        keyboardType='default'
                    />
                    <DropDown
                        title='Country/Region'
                        updateForm={(itemValue) => setForm({ ...form, countryRegion: itemValue })}
                        options={["Select your Country/Region", "UNITED_STATES"]}
                    />
                    <CustomButton
                        placeholder={"First Name"}
                        title='Sign Up'
                        handlePress={submit}
                        containerStyle='mt-7'
                        isLoading={isSubmitting}
                    />
                    <View className='justify-center pt-5 flex-row gap-2'>
                        <Text
                            className='text-lg text-gray-100 font-pregular'
                        >
                            Have an account already?
                        </Text>
                        <Link
                            href='/sign-in'
                            className='text-lg font-semibold text-secondary'
                        >
                            Sign In
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;