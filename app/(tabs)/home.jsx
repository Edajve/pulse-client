import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import ActiveContracts from '../components/ActiveContracts';
import EmptyState from '../components/EmptyState';
import SearchInput from '../components/SearchInput';
import { activeContracts } from '../lib/pulse-services';
import { router, push } from 'expo-router';

const Home = () => {
    const { id, token } = useGlobalContext();
    const [refreshing, setRefreshing] = useState(false)
    const [active, setActiveContracts] = useState([])

    const onRefreshActiveContracts = async () => {
        setRefreshing(true);

        try {
            const response = await activeContracts(id, token);
            setActiveContracts(response);
        } catch (error) {
            console.error('Error fetching Active Contracts:', error);
        }

        setRefreshing(false);
    };

    useEffect(() => {

        const getActiveContracts = async () => {
            try {
                const response = await activeContracts(id, token)
                setActiveContracts(response)
            }
            catch (err) {
                console.error('Error fetching Active Contracts:', err);
            }
        }

        getActiveContracts()

    }, [])

    return (
        <SafeAreaView className='bg-primary h-full'>
            <View className='px-2 my-6'>
                <Text className='text-4xl text-white font-psemibold'>Home</Text>
                <SearchInput />
                <Text className='text-3xl text-gray-100 font-pregular mt-8 mb-4'>Active Consent</Text>
            </View>
            <FlatList
                data={active}
                keyExtractor={(contract) => contract.id}
                renderItem={({ item: contract }) => (
                    <TouchableOpacity onPress={() => router.push(`/single-contract/${contract.id}`)} >
                        <ActiveContracts
                            participantOne={contract.participantOne.firstName}
                            participantTwo={contract.participantTwo.firstName}
                            contract={contract} />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title='No Active Contracts'
                        subtitle="Nothing to Show"
                    />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshActiveContracts} />}
            />
            <View className='px-2 my-6'>
                <Text className='text-3xl text-gray-100 font-pregular mt-8 mb-4'>Consent History</Text>
            </View>
            <FlatList
                data={[
                    {
                        "id": 19,
                        "contract_cancel_reason": null,
                        "contract_number": 10,
                        "did_participant_one_revoke": true,
                        "did_participant_two_revoke": false,
                        "duration_minutes": 60,
                        "end_time": "2024-05-25 22:54:24.199341",
                        "participant_one_revoke_reason": "oidf lalfid ofpadi berjer adf9aud ",
                        "participant_two_revoke_reason": null,
                        "start_time": "2024-05-25 22:54:24.199341",
                        "status": "CANCELLED",
                        "participant_one_id": 252,
                        "participant_two_id": null
                    },
                    {
                        "id": 5,
                        "contract_cancel_reason": null,
                        "contract_number": 18,
                        "did_participant_one_revoke": false,
                        "did_participant_two_revoke": false,
                        "duration_minutes": 30,
                        "end_time": null,
                        "participant_one_revoke_reason": null,
                        "participant_two_revoke_reason": null,
                        "start_time": "2024-05-25 22:54:24.199341",
                        "status": "FINISHED",
                        "participant_one_id": 252,
                        "participant_two_id": null
                    }
                    , {
                        "id": 18,
                        "contract_cancel_reason": null,
                        "contract_number": 18,
                        "did_participant_one_revoke": false,
                        "did_participant_two_revoke": false,
                        "duration_minutes": 30,
                        "end_time": null,
                        "participant_one_revoke_reason": null,
                        "participant_two_revoke_reason": null,
                        "start_time": "2024-05-25 22:54:24.199341",
                        "status": "PROGRESS",
                        "participant_one_id": 252,
                        "participant_two_id": null
                    }
                ]}
                keyExtractor={(contract) => contract.id.toString()}
                renderItem={({ item: contract }) => (
                    <TouchableOpacity>
                        <ActiveContracts contract={contract} />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title='No Active Contracts'
                        subtitle="Nothing to Show"
                    />
                )}
                refreshControl={<RefreshControl /*refreshing={refreshing} onRefresh={onRefreshActiveContracts} */ />}
            />
        </SafeAreaView>
    );
};

export default Home;
