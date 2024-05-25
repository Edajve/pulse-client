import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCameraPermissions, CameraView } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { TouchableOpacity, Image } from 'react-native';
import icons from "../../constants/icons";
import { useGlobalContext } from '../../context/GlobalProvider';

const QrCamera = ({closeCamera, isQrValid}) => {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [hasMediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
    const cameraRef = useRef(null);
    const [showPasswordField, setShowPasswordField] = useState(false)
    const [scanned, setScanned] = useState(true);

    const { token } = useGlobalContext();
    
    const handleBarCodeScanned = ({ data }) => {
        closeCamera();
    
        const isValid = isUuidValid(JSON.parse(data), token); 
        if (isValid._j) isQrValid()
    
    };    

    const isUuidValid = async (data, token) => {
        // try {
        //     const isValid = await isQrValid(data.id, data.data, token);
        //     return false
        // } catch (error) {
        //     console.error('Error occurred:', error);
        //     return false;
        // }

        return false
    };    
    
    // QrCamera permissions are still loading.
    if (!permission) return <View/>;

    if (!permission.granted) {
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
        return (
            <View className="flex-1 justify-center bg-primary">
                <Text className="text-center text-base text-gray-200 font-medium px-4">
                    We need your permission to access the media library
                </Text>
                <Button onPress={requestMediaLibraryPermission} title="Grant permission"/>
            </View>
        );
    }
    
    const scanBarcode = async () => setScanned(false);

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
