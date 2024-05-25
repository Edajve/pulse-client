import React, { useState } from 'react';
import { ScrollView, View, Image, TouchableOpacity } from "react-native";
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
  });

  return (
    <GestureHandlerRootView className='w-full h-full'>
      <SafeAreaView className="bg-primary h-full w-full">
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
          <View className="w-full justify-center min-h-[80vh] px-4 my-6">
            <FormField
              title='Password'
              value={form.password}
              handleChangeText={(e) => setForm({...form, password: e})}
              otherStyles='mt-7'
            />
            <CustomButton
              title='Submit to Consent'
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
