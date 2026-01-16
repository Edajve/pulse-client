import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, LogBox, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import ActiveContracts from '../components/ActiveContracts';
import EmptyState from '../components/EmptyState';
import SearchInput from '../components/SearchInput';
import { InProgressContracts, InactiveContracts, activeContracts, getUser, updateUser } from '../lib/pulse-services';
import { getTranslation } from '../../constants/translations/translations';
import BlurModalPromptAuthMethod from '../components/BlurModalPromptAuthMethod';
import { getLocalHash, updateLocalHashIfNeeded } from '../utilities/localHashStorage';
import useApi from '../hooks/useApi';
import LoadingModal from '../components/LoadingModal';

const Home = () => {
  const { id, token } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const [active, setActiveContracts] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [notActive, setNotActiveContracts] = useState([]);
  const [promptForAutMethod, setPromptForAuthMethod] = useState(false);

  const PIN = "PIN";
  const BASIC = "BASIC";
  const BIOMETRIC = "BIOMETRIC";
  const PIN_PAGE_ROUTE = "/Pin";
  const BIOMETRIC_PAGE_ROUTE = "/biometric-login";

  const wrappedGetUser = async ({ id, token }) => {
    return await getUser(id, token);
  };

  const { loading, refetch } = useApi(wrappedGetUser);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    const fetchData = async () => {
      try {
        const user = await refetch({ id, token });

        if (!user?.hasUserBeenAskedAuthMethod) {
          setTimeout(() => {
            setPromptForAuthMethod(true);
          }, 600);
        }

        await updateLocalHashIfNeeded(user?.localHash);

        const [activeResponse, inactiveResponse, inProgressResponse] =
          await Promise.all([
            activeContracts(id, token),
            InactiveContracts(id, token),
            InProgressContracts(id, token),
          ]);

        setActiveContracts(activeResponse || []);
        setNotActiveContracts(inactiveResponse || []);
        setInProgress(inProgressResponse || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id && token) {
      fetchData();
    }
  }, [id, token]);

  const onRefreshAllContracts = async () => {
    setRefreshing(true);

    try {
      const [activeResponse, inActiveResponse, inProgressResponse] =
        await Promise.all([
          activeContracts(id, token),
          InactiveContracts(id, token),
          InProgressContracts(id, token),
        ]);

      setActiveContracts(activeResponse || []);
      setNotActiveContracts(inActiveResponse || []);
      setInProgress(inProgressResponse || []);
    } catch (error) {
      console.error("Error refreshing contracts:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleAuthMethodSelection = async (method) => {
    setPromptForAuthMethod(false);

    try {
      if (method === PIN) {
        router.push(PIN_PAGE_ROUTE);
      } else if (method === BIOMETRIC) {
        const localHash = await getLocalHash();
        router.push({
          pathname: BIOMETRIC_PAGE_ROUTE,
          params: { localHash },
        });
      } else if (method === BASIC) {
        await updateUser(
          id,
          { hasUserBeenAskedAuthMethod: true },
          token
        );
      }
    } catch (error) {
      console.error("Error updating auth method:", error);
    }
  };

  return (
    <>
      {loading && <LoadingModal />}

      {promptForAutMethod && (
        <BlurModalPromptAuthMethod
          visible={promptForAutMethod}
          onRequestClose={() => handleAuthMethodSelection(BASIC)}
          title={getTranslation('auth.chooseAuthMethod')}
          firstSelection={() => handleAuthMethodSelection(BASIC)}
          secondSelection={() => handleAuthMethodSelection(PIN)}
          thirdSelection={() => handleAuthMethodSelection(BIOMETRIC)}
        />
      )}

      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={notActive}
          keyExtractor={(contract) => contract.id.toString()}
          refreshing={refreshing}
          onRefresh={onRefreshAllContracts}
          progressViewOffset={60}
          tintColor="#ffffff"
          colors={["#ffffff"]}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListHeaderComponent={
            <View>
              {/* Header */}
              <View className="px-2">
                <Text className="text-4xl text-gray-200 font-psemibold">
                  {getTranslation("text.home")}
                </Text>

                <SearchInput />

                {!refreshing && (
                  <Text className="text-sm text-gray-400 mt-2 mb-1 text-center">
                    ↓ Swipe down to refresh
                  </Text>
                )}
              </View>

              {/* Active */}
              <View className="px-2 my-6">
                <Text className="text-3xl text-gray-100 font-pregular mt-8 mb-4">
                  {getTranslation("consent.activeConsent")}
                </Text>

                {active.length ? (
                  active.map((contract) => (
                    <TouchableOpacity
                      key={contract.id}
                      onPress={() => router.push(`/single-contract/${contract.id}`)}
                    >
                      <ActiveContracts
                        participantOne={contract.participantOne?.firstName}
                        participantTwo={contract.participantTwo?.firstName}
                        contract={contract}
                      />
                    </TouchableOpacity>
                  ))
                ) : (
                  <EmptyState
                    title={getTranslation("consent.noActiveContracts")}
                    subtitle={getTranslation("consent.nothingToShow")}
                  />
                )}
              </View>

              {/* In Progress */}
              <View className="px-2 my-6">
                <Text className="text-3xl text-gray-100 font-pregular mt-8 mb-4">
                  {getTranslation("consent.inProgressContracts")}
                </Text>

                {inProgress.length ? (
                  inProgress.map((contract) => (
                    <TouchableOpacity
                      key={contract.id}
                      onPress={() => router.push(`/single-contract/${contract.id}`)}
                    >
                      <ActiveContracts
                        participantOne={`${contract.participantOne?.firstName} ${contract.participantOne?.lastName}`}
                        participantTwo={`${contract.participantTwo?.firstName} ${contract.participantTwo?.lastName}`}
                        contract={contract}
                      />
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text className="text-md text-gray-100 font-pregular mt-2 mb-4">
                    No contracts available
                  </Text>
                )}
              </View>

              {/* History Title */}
              <View className="px-2 my-2">
                <Text className="text-3xl text-gray-100 font-pregular mt-8 mb-4">
                  {getTranslation("consent.consentHistory")}
                </Text>
              </View>
            </View>
          }
          renderItem={({ item: contract }) => (
            <TouchableOpacity
              onPress={() => router.push(`/single-contract/${contract.id}`)}
            >
              <ActiveContracts
                participantOne={contract.participantOne?.firstName}
                participantTwo={contract.participantTwo?.firstName}
                contract={contract}
              />
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <Text className="text-md text-gray-100 font-pregular mt-2 mb-4 px-2">
              No contracts available
            </Text>
          )}
        />
      </SafeAreaView>
    </>
  );
};

export default Home;
