import { loginInfo, registerInfo } from '../types/RegisterData';


const API_URL = "http://172.16.101.71:5000/auth";

const KEYS = {
  userToken: 'user-token'
}
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

    console.log('ERROOOORRRRR', (await response.json()))
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
    return response.status
  } catch (e) {
    console.log(`Fetch Error: ${e}`);
  }
};




const userService = {
  KEYS,
  registerUser,
  registerLogin
};

export default userService;