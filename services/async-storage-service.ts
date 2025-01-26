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
    const v = await AsyncStorage.removeItem(key);
    console.log(v)
  } catch (e) {
    console.log(`AsyncStorage Error: ${e}`);
  }
  return null
}


const asyncStorageService = {
  KEYS,
  saveUser,
  getUser,
  deleteTokenUser
};

export default asyncStorageService;