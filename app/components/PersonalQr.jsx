import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "../../constants/icons";
import QRCode from 'react-native-qrcode-svg';

const PersonalQr = ({closeQr}) => {
    const [byteArray, setByteArray] = useState("")

    // useEffect(() => {
    //     const fetchData = async () => {

    //     getUserQrCode("53", "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJBZCIsImlhdCI6MTcxNjE4OTA0NSwiZXhwIjoxNzE2MTkwNDg1fQ.lIIt_WebPuv1A5cbhTAIbN6SsmULwqd7uHN3rnTaxarcmadbP1npTLmjLDIlQyES")
    //         .then(response => {
    //             // console.log(response)
    //             setByteArray(response);
    //         })
    //         .catch(err => {
    //             if (err) throw err
    //         });
    //     }

    //     fetchData()
    // }, []);

    // console.log(byteArray);

    return (
        <SafeAreaView className="bg-white h-full w-full">
            <View className='pl-5'>
                <TouchableOpacity
                onPress={closeQr}
                >
                    <Image
                        className='w-[30px] h-[30px]'
                        source={icons.leftArrow}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View className='justify-center h-full items-center'>
                <QRCode 
                value='http://awsome.link.qr'
                size={250}
                />
            </View>
        </SafeAreaView>
    );
};

export default PersonalQr;