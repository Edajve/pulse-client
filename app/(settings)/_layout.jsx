import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const SettingLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen
                    name="account"
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="stats"
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="security"
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="display"
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="payments"
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="copyright"
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="privacyPolicy"
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="rateUs"
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="about"
                    options={{
                        headerShown: false
                    }}
                />
            </Stack>
            <StatusBar
                backgroundColor="#161622"
                style='light'
            />
        </>
    );
};

export default SettingLayout;
