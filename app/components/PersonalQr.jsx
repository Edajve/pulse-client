import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";
import QRCode from 'react-native-qrcode-svg';
import { getUserQrCode } from '../lib/pulse-services';
import { useGlobalContext } from '../../context/GlobalProvider';

const PersonalQr = ({closeQr}) => {
    const [error, setError] = useState(null);
    const [qr, setQr] = useState({
        id: ""
        , data: ""
    });

    const {token, id} = useGlobalContext()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserQrCode(id, token);
                if (response) {
                    const userCredentials = {
                        id: response.id
                        , data: response.generatedQrID
                    }

                    setQr(userCredentials)
                } else {
                    setError('Invalid data received from the server');
                }
            } catch (err) {
                console.error('Error fetching QR code:', err);
                setError('Failed to fetch QR code');
            }
        };

        fetchData();
    }, []);

    return (
        <SafeAreaView className="bg-white h-full w-full">
            <View className='pl-5'>
                <TouchableOpacity onPress={closeQr}>
                    <Image
                        className='w-[30px] h-[30px]'
                        source={icons.leftArrow}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View className='justify-center h-full items-center'>
                {error ? (
                    <Text>Error: {error}</Text>
                ) : qr ? (
                    <QRCode 
                        value={JSON.stringify(qr)} 
                        size={250}
                    />
                ) : (
                    <Text>Loading...</Text>
                )}
            </View>
        </SafeAreaView>
    );
};

export default PersonalQr;
