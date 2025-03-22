import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RadioButton } from 'react-native-paper';
import icons from "../../constants/icons";
import { getTranslation } from "../../constants/translations/translations"
import CustomButton from "../components/CustomButton"
import { useGlobalContext } from '../../context/GlobalProvider';
import { getUser } from '../lib/pulse-services';
import { router } from 'expo-router';

import useApi from '../hooks/useApi';
import LoadingModal from '../components/LoadingModal';

const AuthenticationMethod = () => {
    const { id, token } = useGlobalContext();
    const [value, setValue] = useState('');
    const [authMethod, setAuthMethod] = useState()

    const BASIC = getTranslation('auth.basic')
    const PIN = getTranslation('auth.pin')
    const BIOMETRIC = getTranslation('auth.biometric')

    const basicText = getTranslation('auth.basicText')
    const pinText = getTranslation('auth.pinText')
    const biometricText = getTranslation('auth.biometricText')

    // Wrap getUser to pass one object for useApi
    const wrappedGetUser = async ({ id, token }) => {
        return await getUser(id, token);
    };

    const { loading, data, refetch } = useApi(wrappedGetUser);

    useEffect(() => {
        let mounted = true;
    
        const fetchData = async () => {
            try {
                const response = await refetch({ id, token });
    
                if (mounted && response?.authMethod) {

                    setAuthMethod(response.authMethod);
                    setValue(response.authMethod);
                }
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };
    
        if (id && token) {
            fetchData();
        }
    
        return () => {
            mounted = false;
        };
    }, []);

    const onSubmit = async () => {
        /*
        This is where you stopped, you now
       just have to update the database upon submit
        but before adding this logic,
        consult with chat gpt how to use the useAPI in multiple api calls 
        because currently its defined for the getUser api logic
       */
        console.log(value)
    };


    return (
        <>
            {loading && <LoadingModal />}
            <SafeAreaView className="bg-primary h-full p-5">
                <View className='mt-4 mb-9'>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image
                            className='w-[25px] h-[25px]'
                            source={icons.leftArrow}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text className='pb-5 text-4xl text-gray-200 font-psemibold'>
                        {getTranslation('auth.authMethodText')}
                    </Text>
                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        {getTranslation('auth.authMethodSettingsSubText')}
                    </Text>

                    <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                        {[ 
                            { label: basicText, value: BASIC },
                            { label: pinText, value: PIN },
                            { label: biometricText, value: BIOMETRIC }
                        ].map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setValue(option.value)}
                                className="flex-row items-center mt-[32px]"
                            >
                                <Text className="text-gray-200 text-base font-pregular">
                                    - {option.label}
                                </Text>
                                <RadioButton
                                    value={option.value}
                                    uncheckedColor="#CDCDE0"
                                    color="#F6E05E"
                                />
                            </TouchableOpacity>
                        ))}
                    </RadioButton.Group>

                    <View className='pt-10'>
                        <CustomButton
                            title={getTranslation('text.update')}
                            testID="loginBtn"
                            handlePress={onSubmit}
                            containerStyle='mt-7'
                        />
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

export default AuthenticationMethod;