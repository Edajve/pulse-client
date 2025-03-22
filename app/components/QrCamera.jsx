import { CameraView, useCameraPermissions } from 'expo-camera';
import { getTranslation } from '../../constants/translations/translations';
import React, { useRef, useState, useEffect } from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from "../../constants/icons";
import { useGlobalContext } from '../../context/GlobalProvider';
import { isUsersQrValid } from '../lib/pulse-services';
import useApi from '../hooks/useApi';
import LoadingModal from './LoadingModal';

const QrCamera = ({ closeCamera, isQrValid }) => {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const [scanned, setScanned] = useState(true);
    const { token, setScannieId } = useGlobalContext();

    // Wrap isUsersQrValid for useApi
    const wrappedQrValidation = async ({ userID, uuid, token }) => {
        return await isUsersQrValid(userID, uuid, token);
    };

    const { data, error, loading, refetch } = useApi(wrappedQrValidation);

    const handleBarCodeScanned = async ({ data }) => {
        try {
            const parsedData = JSON.parse(data);

            const response = await refetch({
                userID: parsedData.id,
                uuid: parsedData.data,
                token,
            });

            if (response?.tokenValid) {
                setScannieId({ scannieId: parsedData.id });
                isQrValid();
            }

            closeCamera();
        } catch (error) {
            console.error('Error in handleBarCodeScanned:', error);
            closeCamera();
        }
    };

    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <View className="flex-1 justify-center bg-primary">
                <Text className="text-center text-base text-gray-200 font-medium px-4">
                    {getTranslation('text.cameraPermission')}
                </Text>
                <Button onPress={requestPermission} title="Grant permission" />
            </View>
        );
    }

    const scanBarcode = async () => setScanned(false);
    const toggleCameraFacing = () => setFacing(current => (current === 'back' ? 'front' : 'back'));

    return (
        <>
        {loading && (
            <LoadingModal/>
        )}
        <SafeAreaView className="h-full w-full bg-primary">
            <View className="flex-1 justify-center">
                <CameraView
                    className="flex-1"
                    facing={facing}
                    ref={cameraRef}
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr", "pdf417"],
                    }}
                >
                    <View className="absolute top-0 left-0 flex-row p-4 justify-between w-full">
                        <View>
                            <TouchableOpacity className="flex-1 items-center" onPress={closeCamera}>
                                <Image
                                    className="w-[30px] h-[30px]"
                                    source={icons.leftArrow}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity className="flex-1 items-center" onPress={toggleCameraFacing}>
                                <Text className="text-2xl font-bold text-secondary">
                                    {getTranslation('buttons.flip')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="absolute bottom-0 left-0 flex-row p-4 w-full justify-center">
                        <TouchableOpacity className="items-center bg-primary p-4 rounded-full" onPress={scanBarcode}>
                            {scanned && (
                                <Text className="text-2xl font-bold text-secondary">
                                    {getTranslation('buttons.scanQrCode')}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </CameraView>
            </View>
        </SafeAreaView>
        </>
    );
};

export default QrCamera;