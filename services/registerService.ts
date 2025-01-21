import axios from "axios";
import { loginInfo, registerInfo } from '../types/RegisterData';
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:8080/api/adri";

const KEYS = {
  userToken: 'user-token'
}
const registerUser = async (data: registerInfo): Promise<number | undefined> => {
  try {
    const response = await fetch(`${API_URL}/saved`, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    })
    return response.status
  } catch (e) {
    console.log(`AsyncStorage Error: ${e}`);
  }
};
const registerLogin = async (data: loginInfo): Promise<string | null | undefined> => {
  try {
    const response = await fetch(`${API_URL}/saved`, {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
    if (response.status == 201) {
      return response.json.toString()
    } else {
      return null
    }
  } catch (e) {
    console.log(`AsyncStorage Error: ${e}`);
  }
};

const saveUser = async (key: string, data: loginInfo): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(`AsyncStorage Error: ${e}`);
  }
};
async function get<T>(key: string): Promise<T | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(`AsyncStorage Error: ${e}`);
  }

  return null;
}


const OrdersService = {
  KEYS,
  registerUser,
  saveUser,
  get,
  registerLogin
};

export default OrdersService;