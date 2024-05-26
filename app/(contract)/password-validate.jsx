import { router } from "expo-router";
import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";
import icons from '../../constants/icons';
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import { useGlobalContext } from "../../context/GlobalProvider";

const PasswordValidate = () => {
  
  const [form, setForm] = useState({
    password: '',
    consentNumber: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const {scannieId, user} = useGlobalContext();

  const handleEnrollInConsent = async () => {
    if (!checkSignInFields()) return;

    setIsSubmitting(true);

    try {

      
      // Uncomment and implement authentication logic here
      // const response = await authenticate(form);
      // setToken(response.data.token.token);
      // setId(response.data.id);
      // setIsLoggedIn(true);
      // console.log('the scannies id', scannieId.scannieId)
      // router.replace('/home');

      const payload = {
        "contractNumber": form.consentNumber
        , "usersPassword" : form.password
        , "scannerUserId" : user.id
        , "scannieUserId" : scannieId.scannieId
    }

    } catch (error) {
      Alert.alert('Issue occured while trying to connect to consent number: ' + form.consentNumber, "Double-check your password, or have re-initiate process");
    } finally {
      setIsSubmitting(false);
    }
  };

  const checkSignInFields = () => {
    // Are all fields not null
    if (!form.password || !form.consentNumber) {
      Alert.alert('Error', 'Please fill in all the fields');
      return false;
    }

    if (!isOnlyNumbers(form.consentNumber)) {
      Alert.alert('Incorrect Consent Number', 'Consent Number Should Only Contain Numbers');
      return false;
    }

    return true;
  };

  const isOnlyNumbers = (text) => {
    return /^\d+$/.test(text);
  };

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
            value={form.consentNumber}
            handleChangeText={(e) => setForm({ ...form, consentNumber: e })}
            otherStyles='mt-7'
          />
          <FormField
            title='Your Password - To authorize you are you and you are cognizant'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles='mt-7'
          />
          <CustomButton
            title='ENROLL IN CONSENT'
            handlePress={handleEnrollInConsent}
            containerStyle='mt-7'
            disabled={isSubmitting} // Disable button while submitting
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default PasswordValidate;
