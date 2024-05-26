import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../components/EmptyState";
import SearchInput from "../components/SearchInput";

const Search = () => {
    const {query} = useLocalSearchParams()
    // const {data: posts, refetch} = useAppwrite(() => searchPosts(query))
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        // refetch()
    }, [query]);

    return (
        <SafeAreaView className={'bg-primary h-full'}>
            <FlatList
                // data={posts}
                keyExtractor={(item) => item.id}
                // renderItem={({item}) => (
                //     <VideoCard
                //         video={item}
                //     />
                // )}
                ListHeaderComponent={() => (
                    <View className='flex my-6 px-4'>
                        <Text className='font-pmedium text-sm text-gray-100'>Search Results</Text>
                        <Text className={'text-2xl font-psemibold text-white'}>{query}</Text>
                        <View className={'mt-6 mb-8'}>
                            <SearchInput 
                            // initialQuery={query}
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