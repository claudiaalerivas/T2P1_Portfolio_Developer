import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginInfo, registerInfo } from '../types/RegisterData';

const KEYS = {
  userToken: 'user-token'
}

const saveUser = async (key: string, data: loginInfo): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(`AsyncStorage Error: ${e}`);
  }
};
const getUser = async  (key: string): Promise<any | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(`AsyncStorage Error: ${e}`);
  }

  return null;
}
const deleteTokenUser = async  (key: string): Promise<any | null> => {
  try {
    await AsyncStorage.removeItem('token', (err) => console.log('finished', err));
  } catch (e) {
    console.log(`AsyncStorage Error: ${e}`);
  }
}


const asyncStorageService = {
  KEYS,
  saveUser,
  getUser
};

export default asyncStorageService;