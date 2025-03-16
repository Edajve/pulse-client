import { Stack } from "expo-router";

const SearchLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="search" />
            <Stack.Screen name="[query]" />
        </Stack>
    );
};

export default SearchLayout;