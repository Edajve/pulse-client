import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import ActiveContracts from '../components/ActiveContracts';
import { InactiveContracts } from '../lib/pulse-services';
import EmptyState from '../components/EmptyState';
import SearchInput from '../components/SearchInput';
import { activeContracts } from '../lib/pulse-services';
import { router, push } from 'expo-router';

const Home = () => {
    const { id, token } = useGlobalContext();
    const [refreshing, setRefreshing] = useState(false)
    const [active, setActiveContracts] = useState([])
    const [inProgress, setInProgress] = useState([])
    const [notActive, setNotActiveContracts] = useState([])

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

    const onRefreshInactiveContracts = async () => {
        setRefreshing(true);

        try {
            const response = await InactiveContracts(id, token);
            setNotActiveContracts(response);
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


        const getInactiveContracts = async () => {
            try {
                const response = await InactiveContracts(id, token)
                setNotActiveContracts(response)
            }
            catch (err) {
                console.error('Error fetching Active Contracts:', err);
            }
        }

        getInactiveContracts()

    }, [])

    return (
        <ScrollView className='bg-primary h-full'>
            <SafeAreaView >
                <View className='px-2 my-6'>
                    <Text className='text-4xl text-gray-200 font-psemibold'>Home</Text>
                    <SearchInput />
                    <Text className='text-3xl text-gray-100 font-pregular mt-8 mb-4'>Progress Consent</Text>
                </View>
                <View>
                <FlatList
                        data={inProgress}
                        keyExtractor={(contract) => contract.id}
                        renderItem={({ item: contract }) => (
                            <TouchableOpacity onPress={() => router.push(`/single-contract/${contract.id}`)} >
                                <ActiveContracts
                                    participantOne={contract.participantOne?.firstName}
                                    participantTwo={contract.participantTwo?.firstName}
                                    contract={contract} />
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={() => (
                            <EmptyState
                                title='No In Progress Contracts'
                                subtitle="Nothing to Show"
                            />
                        )}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshActiveContracts} />}
                    />
                    <FlatList
                        data={active}
                        keyExtractor={(contract) => contract.id}
                        renderItem={({ item: contract }) => (
                            <TouchableOpacity onPress={() => router.push(`/single-contract/${contract.id}`)} >
                                <ActiveContracts
                                    participantOne={contract.participantOne?.firstName}
                                    participantTwo={contract.participantTwo?.firstName}
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
                </View>

                <View className='px-2 my-6'>
                    <Text className='text-3xl text-gray-100 font-pregular mt-8 mb-4'>Consent History</Text>
                </View>
                <FlatList
                    data={notActive}
                    keyExtractor={(contract) => contract.id.toString()}
                    renderItem={({ item: contract }) => (
                        <TouchableOpacity onPress={() => router.push(`/single-contract/${contract.id}`)} >
                            <ActiveContracts
                                participantOne={contract.participantOne?.firstName}
                                participantTwo={contract.participantTwo?.firstName}
                                contract={contract} />
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={() => (
                        <EmptyState
                            title='No Active Contracts'
                            subtitle="Nothing to Show"
                        />
                    )}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshInactiveContracts} />}
                />
            </SafeAreaView>
        </ScrollView>
    );
};

export default Home;
