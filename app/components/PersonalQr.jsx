import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "../../constants/icons";
import images from "../../constants/images";
import {getUserQrCode} from "../lib/pulse-services";

const PersonalQr = ({closeQr}) => {
    const [byteArray, setByteArray] = useState("")

    useEffect(() => {
        getUserQrCode("53", "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJBZCIsImlhdCI6MTcxNjE4NTkyMywiZXhwIjoxNzE2MTg3MzYzfQ.VXC00d7arhWeQ3lNalNP9f7Vr8-BzfjgK-9WW_Ec6syidECX06WEAPJ7RjJ1bTuH")
            .then(response => {
                setByteArray(response);
            })
            .catch(err => {
                if (err) throw err
            });
    }, []);

    console.log(byteArray.imageBytes);

    const convertByteArrayToPng = (byteArray) => {
        if (byteArray === undefined) return;

        //convert to a base 64 string, react native svg
    }

    return (
        <SafeAreaView className="bg-white h-full w-full">

            <View className="pl-7 mt-4">
                <TouchableOpacity onPress={closeQr}>
                    <Image
                        source={icons.leftArrow}
                        resizeMode='contain'
                        className='h-6 w-6'

                    />
                </TouchableOpacity>
            </View>
            <View className='justify-center h-full'>
                <View className="items-center pt-5 pb-5">
                    <Image
                        source={images.qrTest}
                        resizeMode='contain'
                        className='h-[250px] w-[250px]'
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default PersonalQr;