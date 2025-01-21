import axios from "axios";
import { userInfo } from '../types/RegisterData';
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:8080/api/adri";

const KEYS = {
  userToken: 'user-token'
}
const registerUser = async (data: userInfo): Promise< number | undefined > => {
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

const getUser = async (key: string, data: userInfo): Promise< void>  => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(`AsyncStorage Error: ${e}`);
  }
};


const OrdersService = {
  KEYS,
  registerUser,
  getUser
};

export default OrdersService;