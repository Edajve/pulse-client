import { router, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import icons from '../../../constants/icons';
import { getContract } from '../../lib/pulse-services';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { dynamicStatusColor } from '../../utilities/Utility'

const SingleContract = () => {
  const { contractId } = useLocalSearchParams();
  const [contract, setContract] = useState(null);
  const { token } = useGlobalContext()

  useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        const response = await getContract(contractId, token)
        setContract(response);
      } catch (error) {
        console.error('Error fetching contract details:', error);
      }
    };

    fetchContractDetails();
  }, [contractId]);

  const dynamicStatusColor = (status) => {
    switch (status) {
      case "PROGRESS":
        return 'text-yellow-600';
      case "ACTIVE":
        return 'text-green-600';
      case "FINISHED":
        return 'text-blue-600';
      case "CANCELLED":
        return 'text-red-600';
      default:
        return 'text-grey-100';
    }
  }

  // Reusable Styles 
  const sectionStyle = 'border-t border-gray-600 mt-4 pb-2'
  const headerStyle = 'text-lg text-gray-100 font-semibold mt-1 mb-1.5  font-pbold'
  const textSpacing = "text-md text-gray-100 font-pregular mt-0.7 ml-3"
  const renderParticipantNames = 'text-md text-gray-100 font-pbold mt-2 mb-1'
  const renderUsersNames = 'text-md text-gray-100 font-pregular ml-3'

  const renderEndTime = () => { return contract.endTime === null || contract.endTime === "" ? "Contract Still Progress" : contract?.endTime }
  const renderRevokeStatusText = (userStatus) => { return userStatus ? "Yes" : "No" }
  const renderRevokeText = () => { return 'text-md text-gray-100 font-pregular w-[70%] mt-1 mb-2 ml-6' }
  const wasContractCancelledText = () => { return contract?.contractCancelReason === null ? "No" : "Yes" }
  
  const isThereCancelReason = contract?.contractCancelReason !== null

  return (
    <SafeAreaView className='w-full h-full bg-primary'>
      <ScrollView className='w-full h-full px-3'>
        {
          contract ?
            (
              <>
                <View className='w-full mt-4 pl-2 flex-row mb-10'>
                  <View >
                    <TouchableOpacity
                      className="flex-1"
                    onPress={() => router.replace('/home')}
                    >
                      <Image
                        className="w-[30px] h-[30px]"
                        source={icons.leftArrow}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                  <View className='pl-[25vw]'>
                    <Text className='text-2xl text-gray-100 font-semibold'>
                      Contract
                    </Text>
                  </View>
                </View>
                <View className='w-full flex-col'>
                  <View className='mt-4'>
                    <Text className={headerStyle}>Participants</Text>
                    <Text className={textSpacing}>{contract.participantOne.firstName} & {contract.participantTwo.firstName}</Text>
                  </View>
                  <View className={sectionStyle}>
                    <Text className={headerStyle}>Contract Details</Text>
                    <Text className={textSpacing}>Contract # {contract.contractNumber}</Text>
                    <Text className={textSpacing}>Duration: {contract.durationMinutes} minutes</Text>
                  </View>
                  <View className={sectionStyle}>
                    <Text className={headerStyle}>Status</Text>

                    <Text className={textSpacing}>
                      Contract Status:<Text className={`textSpacing ${dynamicStatusColor(contract.status)}`}> {contract.status} </Text>
                    </Text>

                    <Text className={textSpacing}>Start Time: {contract.startTime}</Text>
                    <Text className={textSpacing}>End Time: {renderEndTime()}</Text>
                  </View>
                  <View className={sectionStyle}>
                    <Text className={headerStyle}>Contract Summary</Text>
                    <Text className={'text-md text-gray-100 font-psemibold mt-2'}>Was contract Cancelled: {wasContractCancelledText()}</Text>
                    {isThereCancelReason && (
                      <Text
                        className={'text-md text-gray-100 font-pregular w-[70%]'}
                      >
                        {contract?.contractCancelReason}
                      </Text>
                    )}


                    <Text className={renderParticipantNames}>{contract.participantOne.firstName}</Text>
                    <Text className={renderUsersNames}>Did {contract.participantOne.firstName} revoke: {renderRevokeStatusText(contract.didParticipantOneRevoke)}</Text>
                    {contract.didParticipantOneRevoke && (
                      <Text
                        className={renderRevokeText()}
                      >
                        {contract?.participantOneRevokeContractReason}
                        afdjapofja ajfaofj aoipjf aopjf oijfoj oifj asoi fj aoif asjfasofj asijfoafj aofjasfjsofjofajsofa joajsofsj oasjosfj oas jfaofasfjasofjasoifjoiajdsa
                      </Text>
                    )}


                    <Text className={renderParticipantNames}>{contract.participantTwo.firstName}</Text>
                    <Text className={renderUsersNames}>Did {contract.participantTwo.firstName} revoke: {renderRevokeStatusText(contract.didParticipantTwoRevoke)}</Text>
                    {contract.didParticipantTwoRevoke && (
                      <Text
                        className={renderRevokeText()}
                      >
                        {contract?.participantTwoRevokeContractReason}
                      </Text>
                    )}
                  </View>
                </View>
              </>
            )
            :
            (
              <Text className='text-2xl text-gray-100 font-semibold'>Loading...</Text>
            )
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleContract;
