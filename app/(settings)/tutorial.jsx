import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";

const Tutorial = () => {

    const videoId = 'gKj-lsXPT2M'; // Corrected video ID
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    const handleVideoPress = () => {
        Linking.openURL(youtubeUrl);
    };

    return (
        <SafeAreaView className="bg-primary h-full p-5">
            <View className='mt-4 mb-9'>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image
                        className='w-[25px] h-[25px]'
                        source={icons.leftArrow}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <Text className='text-4xl text-gray-200 font-psemibold mb-10'>
                Tutorial
            </Text>

            <View>
                <Text className="text-xl text-gray-200 font-pslim mb-6">Click to Watch</Text>
                <TouchableOpacity onPress={handleVideoPress}>
                    <Image
                        source={{ uri: thumbnailUrl }}
                        style={{
                            width: '100%',
                            height: 200,
                            borderRadius: 10,
                            borderColor: '#718096',
                            borderWidth: 2,
                        }}
                    />
                </TouchableOpacity>
            </View>

            <Text className='text-xl text-gray-200 font-psemibold mb-5 mt-6 text-center'>
                How to use Pulse
            </Text>
        </SafeAreaView>
    )
}

export default Tutorial