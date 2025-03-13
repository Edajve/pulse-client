import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveLocalHash = async (localHash) => {
    try {
        await AsyncStorage.setItem('localHash', localHash);
        console.log('Local hash saved successfully.');
    } catch (error) {
        console.error('Error saving local hash:', error);
    }
};

export const getLocalHash = async () => {
    try {
        const localHash = await AsyncStorage.getItem('localHash');
        return localHash ? localHash : null;
    } catch (error) {
        console.error('Error retrieving local hash:', error);
        return null;
    }
};

export const removeLocalHash = async () => {
    try {
        await AsyncStorage.removeItem('localHash');
        console.log('Local hash removed.');
    } catch (error) {
        console.error('Error removing local hash:', error);
    }
};

export const printLocalHash = async () => {
    try {
        const localHash = await AsyncStorage.getItem('localHash');

        if (localHash) {
            console.log(`📌 Stored Local Hash: ${localHash}`);
        } else {
            console.log('⚠️ No local hash found in storage.');
        }
    } catch (error) {
        console.error('Error retrieving local hash:', error);
    }
};