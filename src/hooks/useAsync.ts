import AsyncStorage from '@react-native-async-storage/async-storage';

type storedKeys = 'myListItems';

export const AsyncStore = async (key: storedKeys, value: any) => {
  const item = { value };
  await AsyncStorage.setItem(key, JSON.stringify(item));
};

export const AsyncGet = async (key: storedKeys) => {
  const value = await AsyncStorage.getItem(key);
  if (value) {
    const item = JSON.parse(value);
    if (!item) return null;
    return item.value;
  }
  return undefined;
};

export const AsyncRemove = async (key: storedKeys) => {
  await AsyncStorage.removeItem(key);
};
