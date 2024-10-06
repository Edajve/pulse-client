import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";
import FormField from '../components/FormField';
import { useState } from 'react';
import StarRating from 'react-native-star-rating-widget';
import CustomButton from '../components/CustomButton';

const RateUs = () => {
    const [starRating, setStarRating] = useState(0);
    const [rating, setRating] = useState({
        "comment": ""
    })

    const handleEmailPress = () => {
        Linking.openURL('pulse@support.com');
    };

    const onSubmitFeedBack = async () => {
        const feedbackData = {
            comment: rating.comment,
            starRating: starRating
        };

        try {

            const data = await sendFeedBack(feedbackData);
            console.log('Feedback sent:', feedbackData);

        } catch (error) {
            console.error('Error sending feedback:', error);
        }
    };

    return (
        <SafeAreaView className="bg-primary h-full p-5">
            <View className='mt-4 mb-9'>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image
                        className='w-[25px] h-[25px]'
                        source={icons.leftArrow}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View>
                <Text className='text-4xl text-gray-200 font-psemibold'>
                    Contact us
                </Text>

                <Text className='text-lg text-gray-200 font-plight pt-5'>
                    Email:
                </Text>

                <TouchableOpacity onPress={handleEmailPress}>
                    <Text className="text-blue-500 underline text-lg font-plight">
                        support@pulse.com
                    </Text>
                </TouchableOpacity>


                <Text className='text-lg text-gray-200 font-plight pt-5'>
                    Your feedback would be really helpful
                </Text>

                <FormField
                    placeholder={""}
                    title='Tell Us How We Are Doing'
                    value={rating.comment}
                    handleChangeText={(comment) => setRating({ ...rating, comment: comment })}
                    otherStyles='mt-7'
                    keyboardType='default'
                />

                <Text className='text-lg text-gray-200 font-plight pt-8 pb-1'>
                    Rate us
                </Text>

                <StarRating
                    rating={starRating}
                    onChange={setStarRating}
                    maxStars={5}
                    starSize={32}
                    color="#fdd835"
                    emptyColor="gray"
                    enableHalfStar={true}
                />

            </View>

            <CustomButton
                title='Submit'
                handlePress={() => onSubmitFeedBack()}
                containerStyle='mt-7 mb-[60px]'
            />
        </SafeAreaView>
    )
}

export default RateUs