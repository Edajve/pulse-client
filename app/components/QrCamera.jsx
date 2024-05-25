import {CameraView, useCameraPermissions} from "expo-camera";
import React, {useEffect, useRef, useState} from 'react';
import {Button, Image, Text, TouchableOpacity, View} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "../../constants/icons";
import { useGlobalContext } from "../../context/GlobalProvider";

const QrCamera = ({closeCamera}) => {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [hasMediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
    const cameraRef = useRef(null);
    const [scanned, setScanned] = useState(false);
    const [scannedData, setScannedData] = useState({
        barcodeType: ""
        , barcodeData: ""
    })

    const {token} = useGlobalContext()

    useEffect(() => {
    return () => {
        if (scannedData) {
            // scanUser()
            console.log(scannedData)
        }
    }
    }, [scannedData])


    // QrCamera permissions are still loading.
    if (!permission) return <View/>;

    const handleBarCodeScanned = ({type, data}) => {
        
        setScanned(true);

        closeCamera();

        setScannedData({
            barcodeType: type
            , barcodeData: data
        })

        alert(`Barcode with type ${type} and data ${data} has been scanned!`);
    };

    if (!permission.granted) {
        // QrCamera permissions are not granted yet.
        return (
            <View className="flex-1 justify-center bg-primary">
                <Text className="text-center text-base text-gray-200 font-medium px-4">
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="Grant permission"/>
            </View>
        );
    }

    // Media library permissions are still loading.
    if (!hasMediaLibraryPermission) return <View/>;

    if (!hasMediaLibraryPermission.granted) {
        // Media library permissions are not granted yet.
        return (
            <View className="flex-1 justify-center bg-primary">
                <Text className="text-center text-base text-gray-200 font-medium px-4">
                    We need your permission to access the media library
                </Text>
                <Button onPress={requestMediaLibraryPermission} title="Grant permission"/>
            </View>
        );
    }

    const scanBarcode = async () => setScanned(false)

    const toggleCameraFacing = () => setFacing(current => (current === 'back' ? 'front' : 'back'));

    return (
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
                                <Text className="text-2xl font-bold text-secondary">Flip</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="absolute bottom-0 left-0 flex-row p-4 w-full justify-center">
                        <TouchableOpacity className="items-center bg-primary p-4 rounded-full" onPress={scanBarcode}>
                            {scanned && (
                                <Text className="text-2xl font-bold text-secondary">Scan QR Code</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </CameraView>
            </View>
        </SafeAreaView>
    );
}

export default QrCamera;
