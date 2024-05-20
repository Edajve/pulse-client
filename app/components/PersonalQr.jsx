import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "../../constants/icons";
import images from "../../constants/images";
import {getUserQrCode} from "../lib/pulse-services";

const PersonalQr = ({closeQr}) => {
    const [byteArray, setByteArray] = useState("")

    useEffect(() => {
        const fetchData = async () => {

        getUserQrCode("53", "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJBZCIsImlhdCI6MTcxNjE4OTA0NSwiZXhwIjoxNzE2MTkwNDg1fQ.lIIt_WebPuv1A5cbhTAIbN6SsmULwqd7uHN3rnTaxarcmadbP1npTLmjLDIlQyES")
            .then(response => {
                // console.log(response)
                setByteArray(response);
            })
            .catch(err => {
                if (err) throw err
            });
        }

        fetchData()
    }, []);

    console.log(byteArray);

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