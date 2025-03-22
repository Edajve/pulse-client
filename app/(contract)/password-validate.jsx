import { router } from "expo-router";
import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";
import icons from '../../constants/icons';
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import { useGlobalContext } from "../../context/GlobalProvider";
import { createOrUpdateContract } from "../lib/pulse-services";
import { getTranslation } from "../../constants/translations/translations";
import BlurModalOk from "../components/BlurModalOk";
import useApi from "../hooks/useApi";
import LoadingModal from "../components/LoadingModal";

const PasswordValidate = () => {
  const [form, setForm] = useState({
    password: '',
    consentNumber: ''
  });

  const { scannieId, user, token } = useGlobalContext();
  const [popUpMessage, setPopUpMessage] = useState("");
  const [popUp, setPopUp] = useState(false);

  // Wrap createOrUpdateContract to match useApi shape
  const wrappedCreateOrUpdateContract = async ({ payload, token }) => {
    return await createOrUpdateContract(payload, token);
  };

  const { loading, refetch } = useApi(wrappedCreateOrUpdateContract);

  const handleEnrollInConsent = async () => {
    if (!checkContractFields()) return;

    const payload = {
      contractNumber: parseInt(form.consentNumber),
      usersPassword: String(form.password),
      scannerUserId: parseInt(user.id),
      scannieUserId: parseInt(scannieId.scannieId),
    };

    try {
      const response = await refetch({ payload, token });

      if (!response || !response.status) {
        throw new Error("Unexpected response format");
      }

      if (response.status >= 400) {
        const errorMessage = response.data || "An unknown error occurred.";
        setPopUpMessage(errorMessage);
        setPopUp(true);
      } else {
        router.replace('/post-contract-authentication');
      }
    } catch (err) {
      console.error("Consent Error:", err);
      setPopUpMessage(getTranslation('text.issueWhileConsenting'));
      setPopUp(true);
    }
  };

  const checkContractFields = () => {
    if (!form.password || !form.consentNumber) {
      setPopUpMessage(getTranslation('signUp.fillAllFields'));
      setPopUp(true);
      return false;
    }

    if (!isOnlyNumbers(form.consentNumber)) {
      setPopUpMessage(getTranslation('text.onlyConsentNumbers'));
      setPopUp(true);
      return false;
    }

    return true;
  };

  const isOnlyNumbers = (text) => /^\d+$/.test(text);

  const closePopUp = () => {
    setPopUp(false);
    setPopUpMessage("");
  };

  return (
    <>
    {loading && (
       <LoadingModal />
    )}
      {popUp && (
        <BlurModalOk
          visible={popUp}
          onRequestClose={closePopUp}
          title={popUpMessage}
          affirmativeButtonTitle='OK'
          onYes={closePopUp}
        />
      )}
      <ScrollView className="bg-primary h-full w-full">
        <GestureHandlerRootView>
          <SafeAreaView>
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

            <View className="w-full justify-center min-h-[60vh] px-4 my-6">
              <Text className="text-base text-gray-200 font-medium mb-[50px] text-3xl font-pmedium">
                {getTranslation('text.authorizeIntoConsent')}
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
                title='Enroll in Consent Contract'
                handlePress={handleEnrollInConsent}
                containerStyle='mt-7'
                disabled={loading}
              />
            </View>
          </SafeAreaView>
        </GestureHandlerRootView>
      </ScrollView>
    </>
  );
};

export default PasswordValidate;