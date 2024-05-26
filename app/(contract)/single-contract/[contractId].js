import { router, useLocalSearchParams } from 'expo-router'; // Correct hook import
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import icons from '../../../constants/icons';

const SingleContract = () => {
  const { contractId } = useLocalSearchParams();
  const [contract, setContract] = useState(null);

  // useEffect(() => {
  //   // Fetch contract details using contractId
  //   const fetchContractDetails = async () => {
  //     try {
  //       // Replace with your actual fetch logic
  //       const response = await fetch(`/api/contracts/${contractId}`);
  //       const data = await response.json();
  //       setContract(data);
  //     } catch (error) {
  //       console.error('Error fetching contract details:', error);
  //     }
  //   };

  //   fetchContractDetails();
  // }, [contractId]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <TouchableOpacity className="flex-1 items-center"/* onPress={router.push('/home')}*/>
            <Image
              className="w-[30px] h-[30px]"
              source={icons.leftArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <Text>{contractId}</Text>
      </ScrollView>

      {/* {contract ? (
        <>
          <Text>Contract ID: {contract.id}</Text>
          <Text>Participant One: {contract.participantOne.firstName}</Text>
          <Text>Participant Two: {contract.participantTwo.firstName}</Text>
          {/* Render other contract details here */}
      {/* </>  */}
      {/* // ) : (
      //   <Text>Loading...</Text>
      // )} */}
    </SafeAreaView>
  );
};

export default SingleContract;
