import { router } from "expo-router";
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";

const Authorities = () => {


    return (
      <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
          <Text className='text-4xl text-gray-200 font-psemibold'>
              Call Authorities
          </Text>
          <View>
              <CustomButton
                  title="Call Authorities"
                  // handlePress={}
                  containerStyle="mt-10"
              />
          </View>
      </ScrollView>
  </SafeAreaView>
    );
};

export default Authorities;
