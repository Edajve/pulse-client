import { Redirect, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../context/GlobalProvider";
import CustomButton from "./components/CustomButton";
import { getTranslation } from "../constants/translations/translations";
import { getLocalHash } from "./utilities/localHashStorage";
import { getAuthMethodByLocalHash } from "./lib/pulse-services";

export default function Index() {
const [authMethod, setAuthMethod] = useState()

    const { isLoading, isLoggedIn } = useGlobalContext();

    if (!isLoading && isLoggedIn) return <Redirect href='/home'/>;

    useEffect(() => {
    
        const getAuthMethod = async = async () => {
        
        const localHash = await getLocalHash()  

        console.log(localHash)

        const method = await getAuthMethodByLocalHash(localHash)

        setAuthMethod(method)

        }
    
        getAuthMethod()
    }, [])


    const routeToAuthMethod = async (auth) => {
        if (auth === "BASIC") {
            router.push('/sign-in');
    
        } else if (auth === "PIN") {
            const localHash = await getLocalHash();
    
            router.push({
                pathname: '/sign-in-pin',
                params: { localHash },
            });
    
        } else if (auth === "BIOMETRIC") {
            // Handle biometric login
        } else {
            router.push('/sign-in');
        }
    };
       
    return (
        <>
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className='flex-1 items-center justify-center'>
                    <Text className='text-4xl text-gray-100 font-semibold'>
                        {getTranslation('name.name')}
                    </Text>
                    <Text className='text-5xl text-gray-100 font-semibold mb-7 mt-7'>
                        Logo Here
                    </Text>
                    <CustomButton
                        title={getTranslation('buttons.continue')}
                        handlePress={() =>  routeToAuthMethod(authMethod)}
                        containerStyle='w-[95vw] mt-7'
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
        </>
    );
}
