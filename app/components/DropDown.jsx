import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";

const DropDown = ({ title, options, updateForm, testID }) => {
    const [selectedValue, setSelectedValue] = useState("");

    const handleValueChange = (value) => {
        setSelectedValue(value);
        updateForm(value);
    };

    return (
        <View>
            <Text className='text-base text-lg text-gray-200 font-pmedium mt-7'>{title}</Text>
            <Picker
                testID={testID}
                selectedValue={selectedValue}
                onValueChange={handleValueChange}
                style={{
                    color: 'white',
                    backgroundColor: '#232533',
                    marginTop: 7,
                    borderRadius: 15,
                    borderStyle: "solid",
                    borderColor: '#CDCDE0',
                }}
                itemStyle={{ color: 'white', fontSize: 16 }}
            >
                {options.map((option, index) => (
                    <Picker.Item testID='MALE' key={index} label={option} value={option.toLowerCase()} />
                ))}
            </Picker>
        </View>
    );
};

export default DropDown;
