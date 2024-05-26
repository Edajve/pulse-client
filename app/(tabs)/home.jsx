import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Text, View, FlatList, RefreshControl } from "react-native";
import EmptyState from '../components/EmptyState';
import ActiveContracts from '../components/ActiveContracts';

const Home = () => {
    const {
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
    } = useGlobalContext();

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    return (
        <SafeAreaView className='bg-primary h-full'>
            <View className='px-2 my-6'>
                <Text className='text-4xl text-white font-semibold'>Home</Text>
                <Text className='text-3xl text-gray-100 font-pregular mt-8 mb-4'>Active Consent</Text>
            </View>
            <FlatList
                data={[
                    {
                        "id": 12,
                        "contract_cancel_reason": null,
                        "contract_number": 10,
                        "did_participant_one_revoke": false,
                        "did_participant_two_revoke": false,
                        "duration_minutes": 0,
                        "end_time": null,
                        "participant_one_revoke_reason": null,
                        "participant_two_revoke_reason": null,
                        "start_time": "2024-05-25 22:54:24.199341",
                        "status": "ACTIVE",
                        "participant_one_id": 252,
                        "participant_two_id": null
                    },
                    {
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
                        "status": "ACTIVE",
                        "participant_one_id": 252,
                        "participant_two_id": null
                    }
                ]}
                keyExtractor={(contract) => contract.id.toString()}
                renderItem={({ item: contract }) => (
                    <ActiveContracts contract={contract} />
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title='No Active Contracts'
                        subtitle="Nothing to Show"
                    />
                )}
                refreshControl={<RefreshControl /*refreshing={refreshing}*/ onRefresh={onRefresh} />}
            />
            <View className='px-2 my-6'>
                <Text className='text-3xl text-gray-100 font-pregular mt-8 mb-4'>Consent History</Text>
            </View>
            <FlatList
                data={[
                    {
                        "id": 12,
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
                    <ActiveContracts contract={contract} />
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title='No Active Contracts'
                        subtitle="Nothing to Show"
                    />
                )}
                refreshControl={<RefreshControl /*refreshing={refreshing}*/ onRefresh={onRefresh} />}
            />
        </SafeAreaView>
    );
};

export default Home;
