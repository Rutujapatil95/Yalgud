import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  //   console.log("key and value",key, value);
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Store error', e);
  }
};

export const getData = async (key, value) => {
  console.log('Key = ', AsyncStorage.getItem('@user_pin'));
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.error('Get error', e);
  }
};

export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Remove error', e);
  }
};
