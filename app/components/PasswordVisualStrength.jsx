import React from 'react';
import {Image, View} from "react-native";
import icons from "../../constants/icons";

const PasswordVisualStrength = ({passwordStatus}) => {
    const distributeColors = (index) => {
        const pwStatus = passwordStatus
        switch (index) {
            case 0:
                if (pwStatus === "weak") return icons.sectionweak
                if (pwStatus === "average") return icons.sectionaverage
                if (pwStatus === "good") return icons.sectiongood
                if (pwStatus === "strong") return icons.sectionstrong
                break;
            case 1:
                if (pwStatus === "weak") return icons.sectiondefault
                if (pwStatus === "average") return icons.sectionaverage
                if (pwStatus === "good") return icons.sectiongood
                if (pwStatus === "strong") return icons.sectionstrong
                break;
            case 2:
                if (pwStatus === "weak") return icons.sectiondefault
                if (pwStatus === "average") return icons.sectiondefault
                if (pwStatus === "good") return icons.sectiongood
                if (pwStatus === "strong") return icons.sectionstrong
                break;
            case 3:
                if (pwStatus === "weak") return icons.sectiondefault
                if (pwStatus === "average") return icons.sectiondefault
                if (pwStatus === "good") return icons.sectiondefault
                if (pwStatus === "strong") return icons.sectionstrong
                break;
            default:
                return icons.sectiondefault
        }
    }

    return (
        <View className="flex-row">
            <View className='w-[44px] h-[40px]'>
                <Image
                    source={distributeColors(0)}
                    resizeMode="contain"
                />
            </View>
            <View className='w-[44px] h-[40px]'>
                <Image
                    source={distributeColors(1)}
                    resizeMode="contain"
                />
            </View>
            <View className='w-[44px] h-[40px]'>
                <Image
                    source={distributeColors(2)}
                    resizeMode="contain"
                />
            </View>
            <View className='w-[44px] h-[40px]'>
                <Image
                    source={distributeColors(3)}
                    resizeMode="contain"
                />
            </View>
        </View>
    );
};

export default PasswordVisualStrength;