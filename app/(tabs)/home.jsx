import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, LogBox, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import ActiveContracts from '../components/ActiveContracts';
import EmptyState from '../components/EmptyState';
import SearchInput from '../components/SearchInput';
import { InProgressContracts, InactiveContracts, activeContracts } from '../lib/pulse-services';
import { getTranslation } from '../../constants/translations/translations';

// Ignore the warning about VirtualizedLists nested inside ScrollViews
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const Home = () => {
    const { id, token } = useGlobalContext();
    const [refreshing, setRefreshing] = useState(false)
    const [active, setActiveContracts] = useState([])
    const [inProgress, setInProgress] = useState([])
    const [notActive, setNotActiveContracts] = useState([])

    const onRefreshAllContracts = async () => {
        setRefreshing(true);

      
            const activeResponse = await activeContracts(id, token);
            const inActiveResponse = await InactiveContracts(id, token);
            const inProgressContracts = await InProgressContracts(id, token);
            setActiveContracts(activeResponse);
            setNotActiveContracts(inActiveResponse);
            inProgress(inProgressContracts);
       

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

        const getInProgressContracts = async () => {
            try {
                const response = await InProgressContracts(id, token)
                setInProgress(response)
            }
            catch (err) {
                console.error('Error fetching In Progress Contracts:', err);
            }
        }

        getInProgressContracts()

    }, [])

    return (
        <ScrollView className='bg-primary h-full'
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefreshAllContracts}
                />
            }
        >
            <SafeAreaView >
                <View className='px-2'>
                    <Text className='text-4xl text-gray-200 font-psemibold'>{getTranslation('text.home')}</Text>
                    <SearchInput />

                </View>
                <View className='px-2 my-6'>
                    <Text className='text-3xl text-gray-100 font-pregular mt-8 mb-4'>{getTranslation('consent.activeConsent')}</Text>
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
                                title={getTranslation('consent.noActiveContracts')}
                                subtitle={getTranslation('consent.nothingToShow')}
                            />
                        )}
                    />
                </View>
                <View className='px-2 my-6'>
                    <Text className='text-3xl text-gray-100 font-pregular mt-8 mb-4'>{getTranslation('consent.inProgressContracts')}</Text>
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
                            title={getTranslation('consent.noActiveContracts')}
                            subtitle={getTranslation('consent.nothingToShow')}
                            />
                        )}
                    />
                </View>
                <View className='px-2 my-6'>
                    <Text className='text-3xl text-gray-100 font-pregular mt-8 mb-4'>{getTranslation('consent.consentHistory')}</Text>
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
                        title={getTranslation('consent.noActiveContracts')}
                        subtitle={getTranslation('consent.nothingToShow')}
                        />
                    )}
                />
            </SafeAreaView>
        </ScrollView >
    );
};

export default Home;
