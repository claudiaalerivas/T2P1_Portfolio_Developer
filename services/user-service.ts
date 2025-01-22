import { loginInfo, registerInfo } from '../types/RegisterData';

const API_URL = "http://192.168.0.123:5000/auth";

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
const registerLogin = async (data: loginInfo): Promise< number| undefined > => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers:{
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        pswd: data.password,
      }),
    })
    console.log( response.status)
    return response.status
  } catch (e) {
    console.log(`Fetch Error: ${e}`);
  }
};

const userService = {
  registerUser,
  registerLogin
};

export default userService;