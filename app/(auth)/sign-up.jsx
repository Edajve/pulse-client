import React, {useState} from 'react';
import {Alert, Image, ScrollView, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import images from "../../constants/images";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import {Link, router} from "expo-router";
import {useGlobalContext} from "../../context/GlobalProvider";

const SignUp = () => {
    const {setUser, setIsLoggedIn} = useGlobalContext();

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'USER',
        accountCreatedDate: 'set a date using localtime',
        sex: '',
        dateOfBirth: '',
        countryRegion: ''
    });

    const submit = async () => {
        if (!form.username || !form.email || !form.password)
            Alert.alert('Error', 'Please fill in all the fields')

       // setIsSubmitting(true)

        try {
            // const result = await createUser(
            //     form.email
            //     , form.password
            //     , form.username
            //     , form.email
            // );

            // setUser(result)
            // setIsLoggedIn(true)

            // router.replace('/home')
        } catch (error) {
            Alert.alert('Error', error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    /**
     *  private Integer id;
     *     private String firstName;
     *     private String lastName;
     *     private String email;
     *     private String password;
     *     @Enumerated(EnumType.STRING)
     *     private Role role;
     *     private LocalDateTime accountCreatedDate;
     *     @Enumerated(EnumType.STRING)
     *     private Sex sex;
     *     private LocalDate dateOfBirth;
     *     private Country countryRegion;
     */

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[80vh] px-4 my-6">
                    <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
                        Sign Up to Pulse
                    </Text>
                    <FormField
                        title='First Name'
                        value={form.firstName}
                        handleChangeText={(e) => setForm({ ...form, firstName: e })}
                        otherStyles='mt-7'
                        keyboardType='text'
                    />
                    <FormField
                        title='Last Name'
                        value={form.lastName}
                        handleChangeText={(e) => setForm({ ...form, lastName: e })}
                        otherStyles='mt-7'
                        keyboardType='text'
                    />
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
                        keyboardType='default'
                        secureTextEntry={true}
                    />
                    <Text className='text-white text-lg mt-7'>Sex</Text>
                    <FormField
                        title='Date of Birth'
                        value={form.dateOfBirth}
                        handleChangeText={(e) => setForm({ ...form, dateOfBirth: e })}
                        otherStyles='mt-7'
                        keyboardType='default'
                    />
                    <Text className='text-white text-lg mt-7'>Country/Region</Text>
                    <CustomButton
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