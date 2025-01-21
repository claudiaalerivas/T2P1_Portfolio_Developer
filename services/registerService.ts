import axios from "axios";
import { userInfo } from '../types/RegisterData';
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:8080/api/adri";

const KEY = {
  userToken: 'user-token'
}
const saveUser = async (key: string, data: userInfo): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/saved`, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    })
    await AsyncStorage.setItem(key, JSON.stringify(response.json)); 
  } catch (e) {
    console.log(`AsyncStorage Error: ${e}`);
  }
};

const getUser = async (key: string): Promise< string | null | undefined >  => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.stringify(jsonValue) : null;
  } catch (e) {
    console.log(`AsyncStorage Error: ${e}`);
  }
};


const OrdersService = {
  KEY,
  saveUser,
  getUser
};

export default OrdersService;