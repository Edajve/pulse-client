import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";
import InformationBlock from '../components/SettingsInformationBlocks';
import { getContractStats } from '../lib/pulse-services';
import { useGlobalContext } from '../../context/GlobalProvider';
import useApi from '../hooks/useApi';
import LoadingModal from '../components/LoadingModal';

const Stats = () => {
    const { id, token } = useGlobalContext();

    const wrappedGetContractStats = async ({ userId, token }) => {
        return await getContractStats(userId, token);
    };

    const { data: contractStats, error, loading, refetch } = useApi(wrappedGetContractStats);

    useEffect(() => {
        if (id && token) {
            refetch({ userId: id, token });
        }
    }, [id, token]);

    return (
        <SafeAreaView className="bg-primary h-full p-5">
            {loading && <LoadingModal intensity={60} text="Loading Stats..." />}

            <View className='mt-4 mb-9'>
                <TouchableOpacity onPress={() => router.back('/settings')}>
                    <Image
                        className='w-[25px] h-[25px]'
                        source={icons.leftArrow}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            <View>
                <InformationBlock title='Total Contracts' text={contractStats?.totalContracts || 0} />
                <InformationBlock title='Contracts Revoked' text={contractStats?.totalContractsRevoked || 0} />
                <InformationBlock title='Successful to Revoked contract ratio' text={`${contractStats?.successfulToRevokedRatio || 0}%`} />
                <InformationBlock title='Most consent partner' text={contractStats?.mostConsentedPartner || "N/A"} />
                <InformationBlock title='Most revoked partner' text={contractStats?.mostRevokedPartner || "N/A"} />
            </View>
        </SafeAreaView>
    );
};

export default Stats;