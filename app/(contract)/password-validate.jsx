import React, { useState } from 'react';
import { ScrollView, View, Image, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import icons from '../../constants/icons';
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from 'expo-router';

const PasswordValidate = () => {
  const { setToken, setId } = useGlobalContext();

  const [form, setForm] = useState({
    password: ''
    , consentNumber: null
  });

  console.log(form)

  return (
    <GestureHandlerRootView className='w-full h-full'>
      <SafeAreaView className="bg-primary h-full w-full">
        <View className='w-full flex-col'>
        
            <TouchableOpacity
              className="flex-1 pt-5 pl-5"
              onPress={() => router.replace('/create')}
            >
              <Image
                className="w-[30px] h-[30px]"
                source={icons.leftArrow}
                resizeMode="contain"
              />
            </TouchableOpacity>
          
        </View>
        
        <View className="w-full justify-center min-h-[80vh] px-4 my-6">
        <Text className="text-base text-gray-200 font-medium mb-[50px] text-3xl font-pmedium">
              Authorize into Consent
            </Text>
          <FormField
            title='Consent Number - Make sure you and the other participant put in the same consent number to authorize into contract'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles='mt-7'
          />
          <FormField
            title='Your Password - To authorize you are you and you are cognizant'
            value={form.consentNumber}
            handleChangeText={(e) => setForm({ ...form, consentNumber: e })}
            otherStyles='mt-7'
          />
          <CustomButton
            title='ENROLL IN CONSENT'
            // handlePress={}
            containerStyle='mt-7'
          // isLoading={isSubmitting}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default PasswordValidate;
