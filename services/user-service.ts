import axios from 'axios';
import { loginInfo, registerInfo } from '../types/RegisterData';
import asyncStorageService from './async-storage-service';

const API_URL = "http://172.20.10.3:5000/auth";

const registerUser = async (data: registerInfo): Promise< number | undefined > => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers:{
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        fullname: data.name,
        email: data.email,
        pswd: data.password,
      })
    })
    console.log( response.status)
    return response.status
  } catch (e) {
    console.log(`Fetch Error: ${e}`);
  }
};
const registerLogin = async (data: loginInfo) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email : data.email,
      pswd : data.password
    })
    if(response.status == 201) {
      await asyncStorageService.saveUser(asyncStorageService.KEYS.userToken, response.data.object.token)
      return response.status
    } else {
      return null
    }
  } catch (e) {
    console.log(`Fetch Error: ${e}`);
  }
};

const userService = {
  registerUser,
  registerLogin
};

export default userService;