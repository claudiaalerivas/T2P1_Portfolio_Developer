import asyncStorageService from "./async-storage-service";

const API_URL = "http://192.168.0.123:5000/auth";

async function getImages<T>(): Promise<T | undefined> {
  try {
    const response = await fetch(`${API_URL}/images/get-all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "user-token",
      }
    });
    const data = await response.json(); 
    return data;
  } catch (e) {
    console.log(`Fetch Error: ${e}`);
  }
}

const saveImageToApi = async (base64Image: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/images/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "user-token"
      }
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
  saveImageToApi
};

export default imageService;