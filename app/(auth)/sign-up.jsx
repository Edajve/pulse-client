import React, { useState } from 'react';
import { Alert, ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link, useRouter } from "expo-router";
import DropDown from "../components/DropDown";
import { useGlobalContext } from "../../context/GlobalProvider";
import icons from '../../constants/icons';
import PasswordStrengthEvaluator from '../utilities/PasswordStrengthEvaluator';

const SignUp = () => {
    const evaluator = new PasswordStrengthEvaluator()
    const { setSignUpFormData } = useGlobalContext();
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
        countryRegion: '',
        securityQuestion: '',
        securityAnswer: ''
    });

    const router = useRouter();

    const submit = async () => {

        if (!checkSignInFields()) return;

        setIsSubmitting(true);

        try {
            // Add this to global state 
            setSignUpFormData(form)
            router.replace('/terms-and-condition');

        } catch (error) {
            Alert.alert('Error', error.message || 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    function checkSignInFields() {
        // Check if all required fields are populated
        if (!form.firstName || !form.lastName || !form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all the fields');
            return false;
        }

        // Check if email is in the correct format
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(form.email)) {
            Alert.alert('Email Error', 'Please enter a valid email address');
            return false;
        }

        // Check if password is up to sequrity
        const passwordStrength = evaluator.validatePassword(form.password).title

        if (passwordStrength !== "Strong Password") {
            Alert.alert('Password', 
                'Please increase password strength:\n' +
                '- At least one uppercase letter required\n' +
                '- At least one lowercase letter required\n' +
                '- At least one symbol required\n' +
                '- At least one number required'
              );
            return false;
        
        }

        // Check if age and date of birth are valid
        if (!form.dateOfBirth) {
            Alert.alert("Please Fill in Date of Birth", "Date of Birth Field is not populated");
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

        if (ageInYears < 18) {
            Alert.alert('Age Error', 'You have to be 18+');
            return false;
        }

        // Check if dropdowns are populated correctly
        const isSexDropdownEmpty = !form.sex || form.sex === "Select your Sex";
        const isSecurityQuestionDropdownEmpty = !form.securityQuestion || form.securityQuestion === "Select your Security Question";
        const isCountryEmpty = !form.countryRegion || form.countryRegion === "Select your Country/Region"
        const isSecurityAnswerEmpty = !form.securityAnswer

        if (isSexDropdownEmpty && isSecurityQuestionDropdownEmpty && isCountryEmpty) {
            Alert.alert('Dropdown Errors', 'All DropDowns need to be Populated');
            return false;
        }

        if (isSexDropdownEmpty) {
            Alert.alert('Dropdown Error', 'Please populate the Sex Dropdown');
            return false;
        }

        if (isSecurityQuestionDropdownEmpty) {
            Alert.alert('Dropdown Error', 'Please populate the Security Question Dropdown');
            return false;
        }

        if (isCountryEmpty) {
            Alert.alert('Dropdown Error', 'Please populate the Country/Region Dropdown');
            return false;
        }

        if (isSecurityAnswerEmpty) {
            Alert.alert('Security Answer Error', 'Please answer the Security Answer');
            return false;
        }

        return true;
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className='mt-4 mb-9'>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image
                            className='w-[25px] h-[25px]'
                            source={icons.leftArrow}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
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
                    <DropDown
                        testID='securityQuestion'
                        title='Security Question'
                        updateForm={(itemValue) => setForm({ ...form, securityQuestion: itemValue })}
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
                        title='SecurityAnswer'
                        value={form.securityAnswer}
                        handleChangeText={(e) => setForm({ ...form, securityAnswer: e })}
                        otherStyles='mt-7'
                        keyboardType='email-address'
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