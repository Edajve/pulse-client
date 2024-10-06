import { BlurView } from 'expo-blur';
import React, { useState, useEffect } from 'react';
import { Modal, Text, View, TouchableOpacity, Image } from 'react-native';
import icons from '../../constants/icons';

const PinCircles = ({ currentPinLength, totalCircles }) => {
    const circles = Array.from({ length: totalCircles });

    return (
        <View className="flex flex-row justify-center items-center mb-6 bg-primary p-4">
            {circles.map((_, index) => (
                <View
                    key={index}
                    className={`w-5 h-5 rounded-full mx-2 ${index < currentPinLength ? 'bg-secondary' : 'bg-primary' // Change color based on filled status
                        }`}
                />
            ))}
        </View>
    );
};

const PinModal = ({
    visible,
    onRequestClose,
    title,
    styles,
    sendDataToParent,
}) => {
    const [pressedButton, setPressedButton] = useState(null);
    const [pin, setPin] = useState("");

    useEffect(() => {

        if (pin.length === 4) {
            sendDataToParent(pin)
        }

    }, [pin])

    const handlePress = (num) => {
        setPressedButton(num);
        setPin((prevPin) => prevPin + num.toString());
    };

    const handleDelete = () => {
        setPressedButton('delete');
        setPin((prevPin) => prevPin.slice(0, -1));
    };

    return (
        <Modal
            visible={visible}
            onRequestClose={onRequestClose}
            animationType="fade"
            transparent={true}
        >
            <BlurView intensity={10} className="flex-1 justify-center items-center">
                <View className={`bg-primary p-4 rounded-2xl items-center w-[90vw] h-[71vh] ${styles}`}>


                    <Text className="text-lg text-gray-100 font-bold mt-5 mb-10">
                        {title}
                    </Text>

                    <PinCircles currentPinLength={pin.length} totalCircles={4} />

                    {/* Grid for PIN input */}
                    <View>
                        {/* Row for 1, 2, 3 */}
                        <View className="flex flex-row justify-between mb-6">
                            {[1, 2, 3].map((num) => (
                                <TouchableOpacity
                                    key={num}
                                    onPress={() => handlePress(num)}
                                    style={{
                                        width: 80,
                                        height: 80,
                                        backgroundColor: pressedButton === num ? 'bg-primary' : 'bg-primary',
                                        borderRadius: 40,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginHorizontal: 16,
                                        transform: [{ scale: pressedButton === num ? 0.9 : 1 }],
                                        transition: 'all 0.1s ease-in-out',
                                    }}
                                >
                                    <Text className="text-xl font-bold text-blue-300">{num}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Row for 4, 5, 6 */}
                        <View className="flex flex-row justify-between mb-6">
                            {[4, 5, 6].map((num) => (
                                <TouchableOpacity
                                    key={num}
                                    onPress={() => handlePress(num)}
                                    style={{
                                        width: 80,
                                        height: 80,
                                        backgroundColor: pressedButton === num ? 'bg-primary' : 'bg-primary',
                                        borderRadius: 40,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginHorizontal: 16,
                                        transform: [{ scale: pressedButton === num ? 0.9 : 1 }],
                                        transition: 'all 0.1s ease-in-out',
                                    }}
                                >
                                    <Text className="text-xl font-bold text-blue-300">{num}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Row for 7, 8, 9 */}
                        <View className="flex flex-row justify-between mb-6">
                            {[7, 8, 9].map((num) => (
                                <TouchableOpacity
                                    key={num}
                                    onPress={() => handlePress(num)}
                                    style={{
                                        width: 80,
                                        height: 80,
                                        backgroundColor: pressedButton === num ? 'bg-primary' : 'bg-primary',
                                        borderRadius: 40,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginHorizontal: 16,
                                        transform: [{ scale: pressedButton === num ? 0.9 : 1 }],
                                        transition: 'all 0.1s ease-in-out',
                                    }}
                                >
                                    <Text className="text-xl font-bold text-blue-300">{num}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Row for 0 and delete button wrapped together */}
                        <View className="flex flex-row justify-center mb-4 ml-[28vw]">
                            <View style={{ flexDirection: 'row', alignItems: 'right', justifyContent: 'space-between', width: 195 }}>
                                <TouchableOpacity
                                    onPress={() => handlePress(0)}
                                    style={{
                                        width: 80,
                                        height: 80,
                                        backgroundColor: pressedButton === 0 ? 'bg-primary' : 'bg-primary',
                                        borderRadius: 40,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        transform: [{ scale: pressedButton === 0 ? 0.9 : 1 }],
                                        transition: 'all 0.1s ease-in-out',
                                    }}
                                >
                                    <Text className="text-xl font-bold text-blue-300">0</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={handleDelete}
                                    style={{
                                        width: 80,
                                        height: 80,
                                        backgroundColor: pressedButton === 'delete' ? 'bg-primary' : 'bg-primary',
                                        borderRadius: 40,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginLeft: 16, // Space between buttons
                                        transform: [{ scale: pressedButton === 'delete' ? 0.9 : 1 }],
                                        transition: 'all 0.1s ease-in-out',
                                    }}
                                >
                                    <Image
                                        className='w-[25px] h-[25px]'
                                        source={icons.leftArrow}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </BlurView>
        </Modal>
    );
};

export default PinModal;