import React from 'react';
import { Text } from "react-native";


const InformationBlock = ({ title, text }) => {
    return (
        <>
            <Text
                className='text-lg text-gray-100 font-semibold mt-1 font-pbold'
            >
                {title}
            </Text>
            <Text
                className='text-lg text-gray-100 font-semibold mb-6 pl-2 font-pregular'
            >
                {text}
            </Text>
        </>
    )
}

export default InformationBlock