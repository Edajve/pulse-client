import { router } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";
import InformationBlock from '../components/SettingsInformationBlocks';
import { useGlobalContext } from "../../context/GlobalProvider.js";
import { formatCountryName } from '../utilities/RegionUtils.js';
import {formatDateString} from '../utilities/DateUtils.js';

const Account = () => {
  const { setIsLoggedIn, setUser, user, setToken, setId } = useGlobalContext();

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
        <InformationBlock title='User' text={`${user.firstName} ${user.lastName}`} />
        <InformationBlock title='Account Status' text='ACTIVE' />
        <InformationBlock title='User Since' text={formatDateString(user.accountCreatedDate)} />
        <InformationBlock title='Region' text={formatCountryName(user.countryRegion)} />
        <InformationBlock title='Email' text={user.email} />
        <InformationBlock title='Sex' text={user.sex} />
      </View>
    </SafeAreaView>
  )
}

export default Account