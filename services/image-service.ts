import axios from "axios";
import asyncStorageService from "./async-storage-service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://172.20.10.3:5000";


const getImages = async () => {
  const token = await asyncStorageService.getUser(asyncStorageService.KEYS.userToken);

  if (token == null) {
    console.error("No se encontró un token válido en AsyncStorage.");
    return;
  }
  const cleanedToken = token!.replace(/['"]+/g, '');
  try {
    const response = await axios.get(`${API_URL}/images/get-all`, {
      headers: {
        Authorization: `Bearer ${cleanedToken}`,
      },
    });
    return response.data.object;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error en la solicitud:", error.response?.data || error.message);
    } else {
      console.log('Error fetching images:', error);
    }
    return [];
  }
};

const deleteImageToApi = async (id: number, height: number, width: number, base64Image: string): Promise<void> => {
  try {
    const tokenObject = await asyncStorageService.getUser(asyncStorageService.KEYS.userToken);

    if (tokenObject == null) {
      console.error("No se encontró un token válido en AsyncStorage.");
      return;
    }
    const cleanedToken = tokenObject!.replace(/['"]+/g, '');

    const response = await fetch(`${API_URL}/images/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cleanedToken}`
      },
      body: JSON.stringify({
        id: id,
        height: height,
        width: width,
        encodedData: base64Image,
      })
    });
    const result = await response.json();
    console.log("Imagen subida con éxito:", result);
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw error;
  }
};


const saveImageToApi = async (height: number, width: number, base64Image: string): Promise<void> => {
  try {
    const tokenObject = await asyncStorageService.getUser(asyncStorageService.KEYS.userToken);

    if (tokenObject == null) {
      console.error("No se encontró un token válido en AsyncStorage.");
      return;
    }

    const cleanedToken = tokenObject!.replace(/['"]+/g, '');

    const response = await fetch(`${API_URL}/images/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cleanedToken}`
      },
      body: JSON.stringify({
        height: height,
        width: width,
        encodedData: base64Image,
      })
    });
    const result = await response.json();
    console.log("Imagen subida con éxito:", result);
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw error;
  }
};

const imageService = {
  getImages,
  saveImageToApi,
  deleteImageToApi
};

export default imageService;