import { router, Link, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTranslation } from '../../constants/translations/translations';
import { registerWithPin } from '../lib/pulse-services';
import BlurModalOk from '../components/BlurModalOk';
import { useGlobalContext } from '../../context/GlobalProvider';
import { ROUTES } from '../utilities/Routes';
import useApi from '../hooks/useApi';
import LoadingModal from '../components/LoadingModal';

const codeLimit = 4;
const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'set', 0, 'del'];

const SignInPin = () => {
    const [pin, setPin] = useState([]);
    const [popUp, setPopUp] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState("");
    const { localHash } = useLocalSearchParams();
    const { setToken, setId, setIsLoggedIn } = useGlobalContext();

    const title = "Log In Qssene";

    // 🔁 Wrap the registerWithPin for useApi
    const wrappedRegisterWithPin = async (payload) => {
        return await registerWithPin(payload);
    };
    const { data, error, refetch, loading } = useApi(wrappedRegisterWithPin);

    const handlePress = (item) => {
        if (item === 'del') {
            setPin(pin.slice(0, -1));
        } else if (pin.length < codeLimit && item !== 'set') {
            setPin([...pin, item]);
        } else if (item === 'set' && pin.length === codeLimit) {
            const payload = {
                localHash: localHash,
                pin: pin.join('')
            };

            setTimeout(async () => {
                try {
                    const response = await refetch(payload);

                    if (response?.data?.token) {
                        setToken(response.data.token);
                        setId(response.data.id);
                        setIsLoggedIn(true);
                        router.replace(ROUTES.HOME);
                    } else {
                        setPopUp(true);
                        setPopUpMessage("Incorrect PIN, please try again.");
                    }
                } catch (err) {
                    setPopUp(true);
                    setPopUpMessage("Something went wrong. Please try again.");
                }
            }, 500);
        }
    };

    const DialPad = () => (
        <FlatList
            data={dialPad}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3}
            scrollEnabled={false}
            style={{ flexGrow: 0 }}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => handlePress(item)}
                    disabled={item === ''}
                    className="w-20 h-20 flex items-center justify-center bg-gray-800 m-2 rounded-xl"
                >
                    <Text className="text-white text-2xl">{item}</Text>
                </TouchableOpacity>
            )}
        />
    );

    const closePopUp = () => {
        setPopUp(false);
        setPopUpMessage("");
        setPin([]);
    };

    return (
        <>
        {loading && (
            <LoadingModal />
        )}
            {popUp && (
                <BlurModalOk
                    visible={popUp}
                    onRequestClose={closePopUp}
                    title={popUpMessage}
                    affirmativeButtonTitle="OK"
                    onYes={closePopUp}
                />
            )}
            <SafeAreaView className="bg-primary h-full p-5">
                <View className="mt-4 mb-9">
                    {/* Optional back button */}
                </View>

                <Text className="text-2xl text-gray-200 font-psemibold mb-[12%]">
                    {title}
                </Text>

                <View className="flex flex-row justify-center mb-12">
                    {Array(codeLimit).fill(0).map((_, index) => (
                        <View
                            key={index}
                            className={`w-6 h-6 mx-2 rounded-full ${pin[index] !== undefined ? 'bg-white' : 'bg-gray-600'}`}
                        />
                    ))}
                </View>

                <View className="flex flex-row justify-center mb-6">
                    <DialPad />
                </View>

                <View className="justify-center pt-5 flex-row gap-2">
                    <Text className="text-lg text-gray-100 font-pregular">
                        {getTranslation('password.text.loginInWithBasic')}
                    </Text>
                    <Link
                        href="/sign-in"
                        className="text-lg font-semibold text-secondary"
                    >
                        {getTranslation('buttons.login')}
                    </Link>
                </View>
            </SafeAreaView>
        </>
    );
};

export default SignInPin;