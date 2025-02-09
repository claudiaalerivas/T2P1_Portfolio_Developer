import asyncStorageService from "./async-storage-service";

const API_URL = "http://192.168.0.156:5000/auth";

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


const imageService = {
  getImages
};

export default imageService;