import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginInfo, registerInfo } from '../types/RegisterData';

const saveUser = async (key: string, data: loginInfo): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log(`AsyncStorage Error: ${e}`);
    }
  };
  async function getUser<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(`AsyncStorage Error: ${e}`);
    }
  
    return null;
  }

  const asyncStorageService = {
    saveUser,
    getUser
  };
  
  export default asyncStorageService;