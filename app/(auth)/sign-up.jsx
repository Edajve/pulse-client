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
import BlurModalOk from '../components/BlurModalOk';
import { getTranslation } from '../../constants/translations/translations';
import SignUpValidator from '../utilities/SignUpValidator';
import { ROUTES } from '../utilities/Routes';

const SignUp = () => {
    const evaluator = new PasswordStrengthEvaluator()
    const { setSignUpFormData } = useGlobalContext();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [popUpMessage, setPopUpMessage] = useState("")
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
            // replace with better error mechanism
            // Alert.alert('Error', error.message || 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    function checkSignInFields() {

        const errorMessage = SignUpValidator.validate(form);
    
        if (errorMessage === "weak-password") {
            Alert.alert('Password',
                'Please increase password strength:\n' +
                '- At least one uppercase letter required\n' +
                '- At least one lowercase letter required\n' +
                '- At least one symbol required\n' +
                '- At least one number required'
            );
            return false;
        }
    
        if (errorMessage) {
            setPopUp(true);
            setPopUpMessage(errorMessage);
            return false;
        }
    
        return true;
    }


    const closePopUp = () => {
        setPopUp(false);
        setPopUpMessage("");
    };

    return (
    <>
        {popUp &&
                   <BlurModalOk
                   visible={popUp}
                   onRequestClose={() => closePopUp()}
                   title={popUpMessage}
                   affirmativeButtonTitle='OK'
                   onYes={() => closePopUp()}
               />}
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                
                <View className='mt-4 mb-9'>
                    <TouchableOpacity onPress={() => router.back(ROUTES.SIGN_IN)}>
                        <Image
                            className='w-[25px] h-[25px]'
                            source={icons.leftArrow}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
                <View className="w-full justify-center min-h-[80vh] px-4 my-6">
                    <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
                       {getTranslation('text.signIntoQsense')}
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
                        updateForm={(itemValue) => setForm({ ...form, sex: itemValue.toUpperCase() })}
                        options={["Select your Sex", "MALE", "FEMALE", "NON_BINARY", "GENDER_QUEER", "OTHER"]}
                    />
                    <DropDown
                        testID='securityQuestion'
                        title='Security Question'
                        updateForm={(itemValue) => setForm({ ...form, securityQuestion: itemValue })}
                        options={[
                            "Select your Security Question",
                            "What city did you meet your partner in?",
                            "What was your dream job as a child?",
                            "What is the name of your favorite cousin?",
                            "What was the make of your first car?",
                            "What is the name of your first boss?",
                            "What is your go-to comfort food?",
                            "What was your first concert or show?"
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
                           {getTranslation('password.text.alreadyHaveAnAccount')}
                        </Text>
                        <Link
                            href='/sign-in'
                            className='text-lg font-semibold text-secondary'
                        >
                            {getTranslation('buttons.login')}
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        </>
    );
};

export default SignUp;