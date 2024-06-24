import { router } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";

const Account = () => {

  const InformationBlock = ({ title, text }) => {
    return (
      <>
        <Text
          className='text-lg text-gray-100 font-semibold mt-1 font-pbold'
        >
          {title}
        </Text>
        <Text
          className='text-lg text-gray-100 font-semibold mb-6 pl-2 font-pregular'
        >
          {text}
        </Text>
      </>
    )
  }

  return (
    <SafeAreaView className="bg-primary h-full p-5">
      <View className='mt-4 mb-9'>
                <TouchableOpacity onPress={() => router.back('/settings')}>
                    <Image
                        className='w-[25px] h-[25px]'
                        source={icons.leftArrow}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
      <View>
        <InformationBlock title='User' text='Leslie Echols' />
        <InformationBlock title='Account Status' text='Active' />
        <InformationBlock title='User Since' text='January 1st 2024' />
        <InformationBlock title='Region' text='USA' />
        <InformationBlock title='Email' text='text@email.com' />
        <InformationBlock title='Sex' text='Female' />
      </View>
    </SafeAreaView>
  )
}

export default Account