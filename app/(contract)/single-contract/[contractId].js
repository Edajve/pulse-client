import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '../../../constants/icons';
import { useGlobalContext } from '../../../context/GlobalProvider';
import BlurryModalYesOrNo from '../../components/BlurModalYesOrNo';
import CustomButton from "../../components/CustomButton";
import { getContract, revokeContract } from '../../lib/pulse-services';
import BlurryModalInput from '../../components/BlurryModalInput';
import { getTranslation } from '../../../constants/translations/translations';

const SingleContract = () => {
  const [contract, setContract] = useState(null);
  const [isContractActive, setContractActive] = useState();
  const [askForReasonModal, setAskForReasonModal] = useState(false)
  const [revoke, setRevoke] = useState({
    initialRevoke: false,
    confirmRevoke: false,
  });
  const [togglePopup, setTogglePopUp] = useState(false);

  const { token, id } = useGlobalContext();
  const { contractId } = useLocalSearchParams();

  // endtime format is YYYY-MM-DDTHH:MM:SS.sss
  const parseTime = (endTime) => {
    if (endTime) {
      return endTime.substring(0, 10)
    } else return ""
  }

  useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        const res = await getContract(contractId, token);
        const response = {
          ...res
          , startTime: parseTime(res.startTime)
          , endTime: parseTime(res.endTime)
        }
        setContract(response);
        if (response.status === 'ACTIVE') setContractActive(true);
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
      case "COMPLETED":
        return 'text-blue-600';
      case "CANCELLED":
        return 'text-red-600';
      default:
        return 'text-grey-100';
    }
  };

  const initialRevoke = () => {
    setRevoke({ ...revoke, initialRevoke: true });
    setTogglePopUp(true);
  };

  const rejectInitialRevoke = () => {
    setRevoke({ ...revoke, initialRevoke: false, confirmRevoke: false });
    setTogglePopUp(false);
  };

  const acceptInitialRevoke = () => {
    setRevoke({ ...revoke, confirmRevoke: true });
    setTogglePopUp(false);

    // ask for reason of revoke
    setAskForReasonModal(true)
  };

  const onSubmitReasonAndChangeContractStatus = async (revokeReason) => {
    // sent api call to send revoke reason and update contract record status to CANCELLED
    try {
      await revokeContract(contractId, id, token, revokeReason)
    } catch (error) {
      console.error('Error revoking contract', error);
    }
    finally {
      setAskForReasonModal(false)
    }
  }

  const onSkipRevokeReasonAndChangeContractStatus = async () => {
    // sent api call to update contract record status to CANCELLED
    try {
      const noReasonDefault = getTranslation('text.revokedWithNoReason')
      await revokeContract(contractId, id, token, noReasonDefault)
    } catch (error) {
      console.error('Error revoking contract', error);
    }
    finally {
      setAskForReasonModal(false)
    }
  }

  // Reusable Styles 
  const sectionStyle = 'border-t border-gray-600 mt-4 pb-2';
  const headerStyle = 'text-lg text-gray-100 font-semibold mt-1 mb-1.5 font-pbold';
  const textSpacing = "text-md text-gray-100 font-pregular mt-0.7 ml-3";
  const renderParticipantNames = 'text-md text-gray-100 font-pbold mt-2 mb-1';
  const renderUsersNames = 'text-md text-gray-100 font-pregular ml-3';

  // Editable styles
  const renderEndTime = () => contract.endTime === null || contract.endTime === "" ? getTranslation('text.contractStillInProgress') : contract?.endTime;
  const renderRevokeStatusText = (userStatus) => userStatus ? "Yes" : "No";
  const renderRevokeText = () => 'text-md text-gray-100 font-pregular w-[70%] mt-1 mb-2 ml-6';
  const wasContractCancelledText = () => contract?.contractCancelReason === null ? "No" : "Yes";

  const isThereCancelReason = contract?.contractCancelReason !== null;

  return (
    <SafeAreaView className='w-full h-full bg-primary'>
      <ScrollView className='w-full h-full px-3'>
        {contract ? (
          <>
            <View className='w-full mt-4 pl-2 flex-row mb-10'>
              <View>
                <TouchableOpacity
                  className="flex-1"
                  onPress={() => router.back()}
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
                <Text className={headerStyle}>{getTranslation('contract.participants')}</Text>
                <Text className={textSpacing}>{contract?.participantOne?.firstName} {contract?.participantOne?.lastName}</Text>
                <Text className={textSpacing}> & </Text>
                <Text className={textSpacing}>{contract?.participantTwo?.firstName} {contract?.participantTwo?.lastName}</Text>
              </View>
              <View className={sectionStyle}>
                <Text className={headerStyle}>{getTranslation('contract.details')}</Text>
                <Text className={textSpacing}>{getTranslation('contract.contractNumber')} {contract?.contractNumber}</Text>
                <Text className={textSpacing}>{getTranslation('contract.duration')} {contract?.durationMinutes} minutes</Text>
              </View>
              <View className={sectionStyle}>
                <Text className={headerStyle}>{getTranslation('contract.status')}</Text>
                <Text className={textSpacing}>
                  Contract Status:<Text className={`textSpacing ${dynamicStatusColor(contract.status)}`}> {contract.status} </Text>
                </Text>
                <Text className={textSpacing}>{getTranslation('contract.startTime')} {contract.startTime}</Text>
                <Text className={textSpacing}>{getTranslation('contract.endTime')} {renderEndTime()}</Text>
              </View>
              <View className={sectionStyle}>
                <Text className={headerStyle}>{getTranslation('contract.contractSummary')}</Text>
                <Text className={'text-md text-gray-100 font-psemibold mt-2'}>{getTranslation('contract.wasContractCancelled')} {wasContractCancelledText()}</Text>
                {isThereCancelReason && (
                  <Text className={'text-md text-gray-100 font-pregular w-[70%]'}>
                    {contract?.contractCancelReason}
                  </Text>
                )}
                <Text className={renderParticipantNames}>{contract?.participantOne?.firstName}</Text>
                <Text className={renderUsersNames}>Did {contract?.participantOne?.firstName} {getTranslation('contract.revoke')} {renderRevokeStatusText(contract.didParticipantOneRevoke)}</Text>
                {contract.didParticipantOneRevoke && (
                  <Text className={renderRevokeText()}>
                    {contract?.participantOneRevokeContractReason}
                  </Text>
                )}
                <Text className={renderParticipantNames}>{contract?.participantTwo?.firstName}</Text>
                <Text className={renderUsersNames}>Did {contract?.participantTwo?.firstName} {getTranslation('contract.revoke')} {renderRevokeStatusText(contract.didParticipantTwoRevoke)}</Text>
                {contract.didParticipantTwoRevoke && (
                  <Text className={renderRevokeText()}>
                    {contract?.participantTwoRevokeContractReason}
                  </Text>
                )}
              </View>
            </View>
          </>
        ) : (
          <Text className='text-2xl text-gray-100 font-semibold'>{getTranslation('contract.loading')}</Text>
        )}
        {isContractActive && (
          <CustomButton
            title='Revoke Contract'
            containerStyle='mt-5 w-[95vw]'
            handlePress={() => initialRevoke()}
          />
        )}
        {togglePopup && (
          <BlurryModalYesOrNo
            visible={togglePopup}
            onRequestClose={() => setTogglePopUp(false)}
            title={getTranslation('contract.sureYouWantToRevokeContract')}
            affirmativeButtonTitle={getTranslation('text.yes')}
            negativeButtonTitle={getTranslation('text.no')}
            onYes={acceptInitialRevoke}
            onNo={rejectInitialRevoke}
          />
        )}
        {askForReasonModal && (
          <BlurryModalInput
            visible={askForReasonModal}
            onRequestClose={() => setAskForReasonModal(false)}
            title={getTranslation('contract.whatIsTheReasonForRevoke')}
            affirmativeButtonTitle={getTranslation('contract.submitReason')}
            negativeButtonTitle={getTranslation('contract.skipReason')}
            onSubmit={(revokeReason) => onSubmitReasonAndChangeContractStatus(revokeReason)}
            onSkip={onSkipRevokeReasonAndChangeContractStatus}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleContract;
