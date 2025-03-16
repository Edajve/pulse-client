import { useLocalSearchParams, router } from "expo-router";
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../components/EmptyState";
import SearchInput from "../components/SearchInput";
import ActiveContracts from "../components/ActiveContracts";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getContractsByNameAndUserId } from "../lib/pulse-services";

const Search = () => {
    const {query} = useLocalSearchParams()
    const [contracts, setContracts] = useState([])

    const { id, token } = useGlobalContext();

    useEffect(() => {

        const fetchContracts = async () => {
            try {

                const contract = await getContractsByNameAndUserId(query, id, token);
                
                setContracts(contract);

            } catch (error) {

                console.error("Error fetching contracts:", error);

            }
        };
    
        fetchContracts();
        
    }, [query]);

    return (
        <SafeAreaView className={'bg-primary h-full'}>
            <FlatList
                data={contracts}
                keyExtractor={(contract) => contract.id}
                    renderItem={({ item: contract }) => (
                        <TouchableOpacity onPress={() => router.push(`/single-contract/${contract.id}`)} >
                            <ActiveContracts
                                participantOne={contract.participantOne?.firstName}
                                participantTwo={contract.participantTwo?.firstName}
                                contract={contract} />
                        </TouchableOpacity>
                 )}
                ListHeaderComponent={() => (
                    <View className='flex my-6 px-4'>
                        <Text className='font-pmedium text-sm text-gray-100'>Search Results</Text>
                        <Text className={'text-2xl font-psemibold text-white'}>{query}</Text>
                        <View className={'mt-6 mb-8'}>
                            <SearchInput 
                            initialQuery={query}
                            />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title='No Contracts found'
                        subtitle="No contracts found for this search query"
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default Search;