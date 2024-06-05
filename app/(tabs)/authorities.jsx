import { router } from "expo-router";
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";

const Authorities = () => {

    const handleCallAuthorities = () => {
            // Here its complicated to call the police,
            // it requires you to set up a api call to the backend
            // then use a third party library like twillio to send a signal to the police
    }

    return (
      <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
          <Text className='text-4xl text-gray-200 font-psemibold'>
              Call Authorities
          </Text>

          <Text className='text-1xl text-gray-200 text-base font-pregular mt-10'>
              If you are in a situation where your consent is not being respected and you feel unsafe, please use the button below to contact the police immediately. Your safety and well-being are our top priorities, and we urge you to take action if you feel threatened or in danger. Remember, you have the right to revoke consent at any time, and your decision must be respected. Press the button below to call for help now.
          </Text>
          <View>
              <CustomButton
                  title="Call Authorities"
                  handlePress={handleCallAuthorities}
                  containerStyle="mt-10"
              />
          </View>
      </ScrollView>
  </SafeAreaView>
    );
};

export default Authorities;
