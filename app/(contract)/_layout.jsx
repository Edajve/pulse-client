import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const ContractLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="password-validate"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="post-contract-authentication"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="single-contract/[contractId]"
          options={{
            headerShown: false
          }}
        />
      </Stack>
      <StatusBar
        backgroundColor="#161622"
        style="light"
      />
    </>
  );
};

export default ContractLayout;
