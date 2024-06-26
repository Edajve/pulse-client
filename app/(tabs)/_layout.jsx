import {Image, Text, View} from "react-native";
import {Tabs} from 'expo-router';

import icons from "../../constants/icons"
// import settings from "../../constants/settings"

const TabIcon = ({icon, color, name, focused}) => {
    return (
        <View className='items-center justify-center gap-2'>
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

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false
                    , tabBarActiveTintColor: '#FFA001'
                    , tabBarInactiveTintColor: '#CDCDE0'
                    , tabBarStyle: {
                        backgroundColor: '#000033'
                        , borderTopWidth: 1
                        , borderTopColor: "#000033"
                        , height: 84
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
