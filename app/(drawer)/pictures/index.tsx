import {
  View,
  Image,
  FlatList,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from 'react'
import imageService from '../../../services/image-service';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from "@expo/vector-icons/Ionicons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { imageResponse } from "../../../types/RegisterData";



const PicturesPage = () => {
  const imageEmpty = {
    id: 0,
    height: 0,
    width: 0,
    encodedData: ""
  }
  const [images, setImages] = useState<imageResponse[]>([]);
  const [selectedImage, setSelectedImage] = useState<imageResponse>(imageEmpty);
  const [modalVisible, setModalVisible] = useState(false);
  const [activateCamera, setActivateCamera] = useState(false)
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState(false);
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const toggleFacing = () => setFacing(facing === 'back' ? 'front' : 'back');
  const toggleFlash = () => setFlash(!flash);
  const [loadingImages, setLoadingImages] = useState(false);
  const [savingImage, setSavingImage] = useState(false);


  const takePicture = async () => {
    setSavingImage(true);
    const picture = await cameraRef.current?.takePictureAsync({ base64: true });
    setImages([...images, {
      id: images.length + 1,
      height: picture!.height,
      width: picture!.width,
      encodedData: picture!.base64!
    }])
    if (picture && picture.base64) {
      try {
        await imageService.saveImageToApi(picture.height, picture.width, picture.base64);
      } catch (error) {
        alert("Error al guardar la foto.");
      } finally {
        setSavingImage(false);
        setActivateCamera(false);
      }
    } else {
      alert("Error al tomar la foto.");
      setSavingImage(false);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoadingImages(true);
        const data = await imageService.getImages();
        if (data) {
          setImages(data);
          setLoadingImages(false);
        } else {
          setImages([]);
        }
      } catch (error) {
        console.error("Error al cargar imágenes", error);
      }
    };
    fetchImages();
  }, []);

  const openImage = (imageObject: imageResponse) => {
    setSelectedImage(imageObject);
    setModalVisible(true);
  };

  const closeImage = () => {
    setModalVisible(false);
    setSelectedImage(imageEmpty);
  };
  const deletePicture = async (id: number, height: number, width: number, encodedData: string) => {
    await imageService.deleteImageToApi(id, height, width, encodedData)
    let newList = images.filter((image) => image.id != id)
    setImages(newList)
    setModalVisible(false)
  };

  if (!permission) {
    return <View />;
  } else if (!permission.granted) {
    return <Button title="Dar permisos de cámara" onPress={requestPermission} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galería de Fotos</Text>
      {loadingImages ? (
        <View style={styles.containerSpinner}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        images.length > 0 ? (
            <View style={{height:'70%'}}>
              <FlatList
                data={images}
                numColumns={3}
                renderItem={({ item }) => (
                  <Pressable onPress={() => openImage(item)}>
                    <Image
                      source={{ uri: `data:image/jpg;base64,${item.encodedData}` }}
                      style={styles.thumbnail}
                    />
                  </Pressable>
                )}
              />
            </View>
          ) : (
            <Text style={styles.imagesEmpty}> No tienes imágenes guardadas</Text>
          )
      )}

      <Pressable onPress={() => setActivateCamera(true)}>
        <Entypo name="camera" size={30} color="black" />
      </Pressable>

      <Modal visible={activateCamera} transparent={true} animationType="fade">
        <View style={{ flex: 1, width: "100%", height: "100%" }}>
          <CameraView
            style={{ flex: 1 }}
            enableTorch={flash}
            facing={facing}
            mode="picture"
            ref={cameraRef}
          >
            {savingImage && (
              <ActivityIndicator
                size="large"
                color="#00ff00"
                style={styles.loader}
              />
            )}

            <Pressable style={styles.exitCamera} onPress={() => setActivateCamera(false)}>
              <Ionicons name="close-circle" size={40} color="white" />
            </Pressable>

            <View style={styles.buttomsCamera}>
              <Pressable style={styles.buttomActions} onPress={toggleFlash}>
                <Ionicons name={flash ? "flash-off" : "flash"} size={32} color="white" />
              </Pressable>
              <Pressable style={styles.buttomActions} onPress={takePicture} disabled={savingImage}>
                <Ionicons name="camera" size={32} color="white" />
              </Pressable>
              <Pressable style={styles.buttomActions} onPress={toggleFacing}>
                <Ionicons name="camera-reverse" size={32} color="white" />
              </Pressable>
            </View>
          </CameraView>
        </View>
      </Modal>



      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <Image
            source={{ uri: selectedImage ? `data:image/jpg;base64,${selectedImage.encodedData}` : undefined }}
            style={styles.fullImage}
          />
          <Pressable onPress={closeImage} style={styles.closeButton}>
            <AntDesign name="close" size={30} color="white" />
          </Pressable>
          <View >
            <Pressable style={{ marginTop: 20 }} onPress={() => deletePicture(selectedImage.id, selectedImage.height, selectedImage.width, selectedImage.encodedData)}>
              <Ionicons name={"trash"} size={32} color="white" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );


}

export default PicturesPage
const styles = StyleSheet.create({

  imageContainer: {
    width: 55,
    height: 55,
    position: "absolute",
    top: 0,
    margin: 8,
    backgroundColor: "lightgray",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageStyle: {
    width: 48,
    height: 48,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  containerSpinner: {
    flex: 1,
    justifyContent: "center",
  },
  thumbnail: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
    color: 'black',
    marginBottom: 20
  },
  imagesEmpty: {
    alignSelf: 'center',
    fontSize: 15,
    marginBottom: 20,
    color: 'purple'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  buttomsCamera: {
    justifyContent: 'center',
    flex: 1,
    right: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '160%',
    paddingRight: '10%',
    width: '100%'
  },
  exitCamera: {
    marginTop: '12%',
    marginLeft: '85%',
  },
  buttomActions: {
    marginLeft: '25%',
  },
  loader: 
  { position: "absolute", 
    top: "50%", 
    left: "50%", 
    transform: [{ translateX: -25 }, { translateY: -25 }] 
  }
})