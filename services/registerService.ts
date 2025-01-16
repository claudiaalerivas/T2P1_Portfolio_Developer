import axios from "axios";
import { userInfo } from '../types/RegisterData';

const API_URL = "http://localhost:8080/api/adri";

const users = async () => {
  const response = await axios.get(`${API_URL}/user`);
  return response.data;
};


const addUser = async (newActor: userInfo) => {
  const response = await axios.post(`${API_URL}/user`, newActor);
  return response.data;
};
const OrdersService = {
  users,
  addUser,
};

export default OrdersService;