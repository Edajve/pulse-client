import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";
import InformationBlock from '../components/SettingsInformationBlocks';
import { getContractStats } from '../lib/pulse-services';
import { useGlobalContext } from '../../context/GlobalProvider';

const Stats = () => {
    const { id, token } = useGlobalContext()
    const [contractStats, setcontractStats] = useState({
        "totalContracts": 0,
        "totalContractsRevoked": 0,
        "successfulToRevokedRatio": 0,
        "mostConsentedPartner": "",
        "mostRevokedPartner": ""
    })

    useEffect(() => {
        const fetchContractStats = async () => {
            try {
                const res = await getContractStats(id, token);
                console.log(res)
                setcontractStats(res);
            } catch (error) {
                console.error('Error fetching contract stats:', error);
            }
        };

        fetchContractStats();
    }, []);


    return (
        <SafeAreaView className="bg-primary h-full p-5">
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
                <InformationBlock title='Total Contracts' text={contractStats.totalContracts} />
                <InformationBlock title='Contracts Revoked' text={contractStats.totalContractsRevoked} />
                <InformationBlock title='Successful to Revoked contract ratio' text={`${contractStats.successfulToRevokedRatio}%`} />
                <InformationBlock title='Most consent parthner' text={contractStats.mostConsentedPartner} />
                <InformationBlock title='Most revoked parthner' text={contractStats.mostRevokedPartner} />
            </View>
        </SafeAreaView>
    )
}

export default Stats