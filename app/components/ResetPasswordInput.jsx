import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import icons from "../../constants/icons";
import PasswordVisualStrength from "../components/PasswordVisualStrength";
import PasswordStrengthEvaluator from "./../utilities/PasswordStrengthEvaluator";

const ResetPasswordInput = ({ title, password }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showAuthenticator, setShowAuthenticator] = useState(false);
    const [form, setForm] = useState("");

    const renderPlaceholderText = form === "";

    const onChangeText = (value) => {
        setForm(value);
        password(form)
    }

    useEffect(() => {
        setShowAuthenticator(form !== "");
    }, [form]);

    return (
        <>
            <View className="px-4">
                <View
                    className="border-2 border-black-200 w-full h-16 px-4 bg-black-200 mt-7 rounded-2xl focus:border-secondary items-center flex-row"
                >
                    {renderPlaceholderText && <Text className="text-base text-gray-200">{title}</Text>}
                    <TextInput
                        className="flex-1 font-psemibold text-base text-gray-700"
                        placeholderTextColor="#CDCDE0"
                        secureTextEntry={!showPassword}
                        onChangeText={onChangeText}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            className="w-6"
                            resizeMode="contain"
                            source={!showPassword ? icons.eye : icons.eyeHide}
                        />
                    </TouchableOpacity>
                </View>

                {showAuthenticator &&
                    <PasswordAuthentication
                        form={form}
                    />
                }
            </View>
        </>
    );
};

const PasswordAuthentication = ({ form }) => {
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [passwordStatus, setPasswordStatus] = useState(null)
    const evaluator = new PasswordStrengthEvaluator();

    useEffect(() => {
        const passwordStrenghtStatus = evaluator.validatePassword(form)
        setPasswordStatus(passwordStrenghtStatus)
    }, [form]);

    return (
        <View
            className="w-full
            h-[170px]
            border-2
            border-black-200
            mt-4
            rounded-2xl"
        >
            {passwordStatus !== null ? (
                <Text className="text-white font-psemibold text-sm ml-4 mt-4">
                    {passwordStatus.title}
                </Text>
            ) : (
                <Text className="text-white font-psemibold text-sm ml-4 mt-4">
                    have at least 6 characters.
                </Text>
            )}

            <View className='w-full h-[50px] ml-2'>
                <PasswordVisualStrength
                    passwordStatus={passwordStatus?.statusbar}
                />
            </View>
            <View className='w-full h-[50px]'>
                <View className='flex-row w-full ml-1'>
                    <View className='w-[30px] h-[20px] justify-center items-center'>
                        {isPasswordValid ?
                            (<Image className='w-[15px] h-[25px]' source={icons.done} resizeMode="contain" />) :
                            (<Image className='w-[8px] h-[8px]' source={icons.circle} resizeMode="contain" />)
                        }
                    </View>
                    <Text className='text-white text-1xl'>
                        Upper & lower case letters
                    </Text>
                </View>
                <View className='flex-row w-full ml-1'>
                    <View className='w-[30px] h-[20px] justify-center items-center'>
                        {isPasswordValid ?
                            (<Image className='w-[15px] h-[25px]' source={icons.done} resizeMode="contain" />) :
                            (<Image className='w-[8px] h-[8px]' source={icons.circle} resizeMode="contain" />)
                        }
                    </View>
                    <Text className='text-white text-1xl'>
                        A Symbol (#$&)
                    </Text>
                </View>
                <View className='flex-row w-full ml-1'>
                    <View className='w-[30px] h-[20px] justify-center items-center'>
                        {isPasswordValid ?
                            (<Image className='w-[15px] h-[25px]' source={icons.done} resizeMode="contain" />) :
                            (<Image className='w-[8px] h-[8px]' source={icons.circle} resizeMode="contain" />)
                        }
                    </View>
                    <Text className='text-white text-1xl'>
                        At least one number
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default ResetPasswordInput;
