import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useState, useRef } from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons"
import { router } from "expo-router";

const QrCamera = ({ closeCamera }) => {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [hasMediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
    const cameraRef = useRef(null);

    if (!permission) {
        // QrCamera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // QrCamera permissions are not granted yet.
        return (
            <View className="flex-1 justify-center bg-primary">
                <Text className="text-center text-base text-gray-200 font-pmedium px-4">
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="Grant permission" />
            </View>
        );
    }

    if (!hasMediaLibraryPermission) {
        // Media library permissions are still loading.
        return <View />;
    }

    if (!hasMediaLibraryPermission.granted) {
        // Media library permissions are not granted yet.
        return (
            <View className="flex-1 justify-center bg-primary">
                <Text className="text-center text-base text-gray-200 font-pmedium px-4">
                    We need your permission to access the media library
                </Text>
                <Button onPress={requestMediaLibraryPermission} title="Grant permission" />
            </View>
        );
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            await MediaLibrary.saveToLibraryAsync(photo.uri);
            closeCamera();
        }
    };

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <SafeAreaView className="h-full w-full bg-primary">
            <View className="flex-1 justify-center">
                <CameraView className="flex-1" facing={facing} ref={cameraRef}>
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
                        <TouchableOpacity className="items-center bg-primary p-4 rounded-full" onPress={takePicture}>
                            <Text className="text-2xl font-bold text-secondary">Take Picture</Text>
                        </TouchableOpacity>
                    </View>
                </CameraView>
            </View>
        </SafeAreaView>
    );
}

export default QrCamera;
