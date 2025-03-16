import { Redirect, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalProvider";
import { getLocalHash } from "./utilities/localHashStorage";
import { getAuthMethodByLocalHash } from "./lib/pulse-services";

export default function Index() {
    const [authMethod, setAuthMethod] = useState(null);
    const { isLoading, isLoggedIn } = useGlobalContext();

    if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

    useEffect(() => {
        const fetchAuthMethod = async () => {
            try {

                const localHash = await getLocalHash();

                if (!localHash) return; // Prevents errors if hash is missing

                const method = await getAuthMethodByLocalHash(localHash);

                setAuthMethod(method);

                // Ensure routing happens only after fetching auth method
                routeToAuthMethod(method);

            } catch (error) {
                console.error("Error fetching auth method:", error);
            }
        };

        fetchAuthMethod();
    }, []);

    const routeToAuthMethod = async (auth) => {
        const localHash = await getLocalHash();

        if (auth === "BASIC") {
            router.replace("/sign-in");
        } else if (auth === "PIN") {
            router.replace({ pathname: "/sign-in-pin", params: { localHash } });
        } else if (auth === "BIOMETRIC") {
            router.replace({ pathname: "/biometric-login", params: { localHash } });
        } else {
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