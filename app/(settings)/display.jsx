import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, TouchableOpacity, View, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";
import InformationBlock from '../components/SettingsInformationBlocks';
import CustomButton from '../components/CustomButton';

const Display = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const saveSettingChanges = () => {
        // save setting changes
    }

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
            <View>
                <InformationBlock title='Light Dark Mode' />
                <Switch
                    trackColor={{ false: "#FF0000", true: "#00FF00" }}
                    thumbColor={isEnabled ? "#CDCDE0" : "#CDCDE0"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <CustomButton
                title='Save changes'
                handlePress={() => saveSettingChanges()}
                containerStyle='mt-10'
            />
        </SafeAreaView>
    )
}

export default Display