import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View, TouchableOpacity } from "react-native";
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
    );
};

export default Home;
