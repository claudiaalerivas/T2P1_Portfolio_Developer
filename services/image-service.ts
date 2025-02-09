import asyncStorageService from "./async-storage-service";

const API_URL = "http://192.168.0.156:5000/auth";

async function getImages() {

  await fetch(`${API_URL}/images/get-all`, {
    headers: {
      "Aplication": "",
      "Authorization": "user-token",
    }
  })
    .then(r => r.json())
}

const imageService = {
  getImages
};

export default imageService;