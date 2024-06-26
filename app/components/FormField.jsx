import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import icons from "../../constants/icons";

const FormField = ({
                       title
                       , value
                       , handleChangeText
                       , placeholder
                       , otherStyles
                       , keyboardType
                       , ...props
                   }) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
            <View
                className='border-2
                border-gray-100
                w-full h-16 px-4
                bg-gray-100
                rounded-2xl
                focus:border-secondary
                items-center
                flex-row'
            >
                <TextInput
                    className='flex-1 text-white font-psemibold text-base'
                    value={value}
                    placeholder={placeholder}
                    placeholderText="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                    {...props}
                />
                {title === 'Password' &&
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            className='w-6 w-6'
                            resizeMode='contain'
                            source={!showPassword ? icons.eye : icons.eyeHide}
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};

export default FormField;