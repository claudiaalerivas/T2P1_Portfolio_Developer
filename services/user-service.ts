import { loginInfo, registerInfo } from '../types/RegisterData';


const API_URL = "http://localhost:5000/auth";

const KEYS = {
  userToken: 'user-token'
}
const registerUser = async (data: registerInfo): Promise<number | undefined> => {
  try {
    const response = await fetch(`${API_URL}/register`, {
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
    const response = await fetch(`${API_URL}/login`, {
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




const userService = {
  KEYS,
  registerUser,
  registerLogin
};

export default userService;