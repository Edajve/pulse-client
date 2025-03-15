import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";
import BlurryModalYesOrNo from '../components/BlurModalYesOrNo';
import { getTranslation } from '../../constants/translations/translations';
import { updateUser } from '../lib/pulse-services';
import { useGlobalContext } from '../../context/GlobalProvider';

const codeLimit = 4;
const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'set', 0, 'del'];

const Pin = () => {
    const [pin, setPin] = useState([]);
    const [popUp, setPopUp] = useState()
    const [popUpMessage, setPopUpMessage] = useState("")

    const { id, token } = useGlobalContext();

    const title = "Set PIN"

    const handlePress = (item) => {

        if (item === 'del') {

            setPin(pin.slice(0, -1)); // Remove last digit

        }else if (pin.length < codeLimit && item !== 'set') {

            setPin([...pin, item]); // Add digit to PIN

        } else if ( item === 'set' &&
             pin.length === codeLimit) {
           
            setTimeout(() => {

                setPopUp(true)

            }, 500)
        }
    };

    const DialPad = () => (
        <FlatList
            data={dialPad}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3}
            scrollEnabled={false}
            style={{flexGrow: 0}}
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
        setPin([])
    };

    const onSetPin = async () => {
        setPopUp(false);
        setPopUpMessage("");
        
        // Update user setting for hasUserBeenAskedAuthMethod and pin
                    await updateUser(
                        id, 
                        {
                            hasUserBeenAskedAuthMethod: true,
                            pinCode: pin.join(''),
                            authMethod: "PIN"
                        },
                        token
                    )
        router.navigate('/home')
    };

    return (
        <>
        {popUp &&
           
            <BlurryModalYesOrNo
                visible={popUp}
                onRequestClose={() => closePopUp()}
                title={`Are you sure you want to set your PIN as ${pin.join(' ')} ?`}
                affirmativeButtonTitle={getTranslation('text.yes')}
                negativeButtonTitle={getTranslation('text.no')}
                onYes={() => onSetPin()}
                onNo={() => closePopUp()}
            />
               
        }
        <SafeAreaView className="bg-primary h-full p-5">
            {/* Back Button */}
            <View className='mt-4 mb-9'>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image
                        className='w-[25px] h-[25px]'
                        source={icons.leftArrow}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            <Text className='text-2xl text-gray-200 font-psemibold mb-[12%]'>
                    {title}
                </Text>

            {/* PIN Display */}
            <View className="flex flex-row justify-center mb-12">
                {Array(codeLimit).fill(0).map((_, index) => (
                    <View 
                        key={index} 
                        className={`w-6 h-6 mx-2 rounded-full ${pin[index] !== undefined ? 'bg-white' : 'bg-gray-600'}`}
                    />
                ))}
            </View>
            <View className="flex flex-row justify-center mb-6">
                {/* Dial Pad */}
            <DialPad />
            </View>
            
        </SafeAreaView>
    </>
    );
};

export default Pin;