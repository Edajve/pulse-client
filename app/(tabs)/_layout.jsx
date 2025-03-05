import {Image, Text, View} from "react-native";
import {Tabs} from 'expo-router';
import tailwindConfig from "../../tailwind.config";
import { getTranslation } from "../../constants/translations/translations";

import icons from "../../constants/icons"
// import settings from "../../constants/settings"

const TabIcon = ({icon, color, name, focused}) => {
    return (
        <View className='items-center justify-center gap-2 w-20'>
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className='w-6 h-6'
            />
            <Text
                className={`${focused ? 'font-psemibold' : 'font-pregular'}`}
                style={{color: color}}
            >
                {name}
            </Text>
        </View>
    );
};

// look below, you see how im hardcoding these hex values, but in the tailwind confix i have some of the defined?
// can you replace these hardocded with the values that are matching in the tailwind file

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: tailwindConfig.theme.extend.colors.secondary.DEFAULT,
                    tabBarInactiveTintColor: tailwindConfig.theme.extend.colors.gray[100],
                    tabBarStyle: {
                        backgroundColor: tailwindConfig.theme.extend.colors.primary,
                        borderTopWidth: 1,
                        borderTopColor: tailwindConfig.theme.extend.colors.primary,
                        height: 84,
                    }
                }}
            >
                <Tabs.Screen
                    name='home'
                    options={{
                        title: "Home"
                        , headerShown: false
                        , tabBarIcon: ({color, focused}) => (
                            <TabIcon
                                icon={icons.home}
                                color={color}
                                name='Home'
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name='create'
                    options={{
                        title: "Create"
                        , headerShown: false
                        , tabBarIcon: ({color, focused}) => (
                            <TabIcon
                                icon={icons.plus}
                                color={color}
                                name='Create'
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name='profile'
                    options={{
                        title: "Profile"
                        , headerShown: false
                        , tabBarIcon: ({color, focused}) => (
                            <TabIcon
                                icon={icons.profile}
                                color={color}
                                name='Profile'
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name='settings'
                    options={{
                        title: "Settings"
                        , headerShown: false
                        , tabBarIcon: ({color, focused}) => (
                            <TabIcon
                                icon={icons.settings}
                                color={color}
                                name='Settings'
                                focused={focused}
                            />
                        )
                    }}
                />
            </Tabs>
        </>
    );
};

export default TabsLayout;
