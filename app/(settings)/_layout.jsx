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
            </Stack>
            <StatusBar
                backgroundColor="#161622"
                style='light'
            />
        </>
    );
};

export default SettingLayout;
