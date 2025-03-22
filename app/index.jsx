import { Redirect, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalProvider";
import { getLocalHash } from "./utilities/localHashStorage";
import { getAuthMethodByLocalHash } from "./lib/pulse-services";
import AuthenticationMethod from "./(settings)/authentication-method";
import { SafeAreaView,ScrollView, View } from "react-native-web";
import CustomButton from "./components/CustomButton";
import { Text } from "react-native";
import { getTranslation } from "../constants/translations/translations";

export default function Index() {
    const [authMethod, setAuthMethod] = useState(null);
    const { isLoading, isLoggedIn } = useGlobalContext();

    if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

    useEffect(() => {
        const fetchAuthMethod = async () => {
            try {
                const localHash = await getLocalHash();
    
                // If there's no localHash, just send to /sign-in
                if (!localHash) {
                    router.replace("/sign-in");
                    return;
                }
    
                const method = await getAuthMethodByLocalHash(localHash);
    
                // If method is not found or invalid, default to /sign-in
                if (!method || !["BASIC", "PIN", "BIOMETRIC"].includes(method)) {
                    router.replace("/sign-in");
                    return;
                }
    
                setAuthMethod(method);
                routeToAuthMethodScreen(method);
    
            } catch (error) {
                console.error("Error fetching auth method:", error);
                router.replace("/sign-in"); // fallback on any error
            }
        };
    
        fetchAuthMethod();
    }, []);

    const routeToAuthMethodScreen = async (auth) => {

        const localHash = await getLocalHash();

        // We pass localhash only during sign-in-in and biometric-login because on sign-in we grab the local hash upon login
        switch (auth) {
            case "BASIC":
                router.replace("/sign-in");
                break;
            case "PIN":
                router.replace({ pathname: "/sign-in-pin", params: { localHash } });
                break;
            case "BIOMETRIC":
                router.replace({ pathname: "/biometric-login", params: { localHash } });
                break;
            default:
                router.replace("/sign-in");
        }
    };

    return (
        <>
            {/* Uncomment this when you want to display UI */}
            {/* <SafeAreaView className="bg-primary h-full">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="flex-1 items-center justify-center">
                        <Text className="text-4xl text-gray-100 font-semibold">
                            {getTranslation("name.name")}
                        </Text>
                        <Text className="text-5xl text-gray-100 font-semibold mb-7 mt-7">
                            Logo Here
                        </Text>
                        <CustomButton
                            title={getTranslation("buttons.continue")}
                            handlePress={() => routeToAuthMethod(authMethod)}
                            containerStyle="w-[95vw] mt-7"
                        />
                    </View>
                </ScrollView>
            </SafeAreaView> */}
        </>
    );
}