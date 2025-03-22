import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";
import QRCode from 'react-native-qrcode-svg';
import { getUserQrCode } from '../lib/pulse-services';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getTranslation } from '../../constants/translations/translations';
import useApi from '../hooks/useApi';
import LoadingModal from './LoadingModal';

const PersonalQr = ({ closeQr }) => {
    const { token, id } = useGlobalContext();

    // Wrap getUserQrCode to accept a single object
    const wrappedGetQr = async ({ accountId, token }) => {
        return await getUserQrCode(accountId, token);
    };

    const { error, loading, refetch } = useApi(wrappedGetQr);
    const [qr, setQr] = useState({ id: "", data: "" });

    useEffect(() => {
        if (id && token) {
            refetch({ accountId: id, token })
                .then((response) => {
                    if (response?.generatedQrID) {
                        setQr({
                            id: response.id,
                            data: response.generatedQrID
                        });
                    }
                })
                .catch((err) => {
                    console.error("Error fetching QR code:", err);
                    // error is already handled by useApi, so no need to re-set local error
                });
        }
    }, [id, token]);

    return (
        <>
        {loading && (
    <LoadingModal intensity={75} />
)}
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
                {loading ? (
                    <Text>{getTranslation('contract.loading')}</Text>
                ) : error ? (
                    <Text>Error: {getTranslation('text.qrCodeFetchFailed')}</Text>
                ) : qr?.data ? (
                    <QRCode 
                        value={JSON.stringify(qr)} 
                        size={250}
                    />
                ) : (
                    <Text>{getTranslation('text.qrCodeNotAvailable')}</Text>
                )}
            </View>
        </SafeAreaView>
        </>
    );
};

export default PersonalQr;