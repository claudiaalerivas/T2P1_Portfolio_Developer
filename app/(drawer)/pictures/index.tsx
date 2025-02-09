import {
  View,
  Image,
  FlatList,
  Text,
  Pressable,
  Modal,
  Animated,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from 'react'
import imageService from '../../../services/image-service';
import AntDesign from '@expo/vector-icons/AntDesign';

const PicturesPage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const fetchImages = async () => {
      const data = await imageService.getImages<string[]>();
      if (data) {
        setImages(data);
      } else {
        setImages([]);
      }
    };
    fetchImages();
  }, []);

  const openImage = (image: string) => {
    setSelectedImage(image);
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeImage = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSelectedImage(null);
    });
  };

  return (
    <View style={styles.container}>
      {images.length === 0 ? (
        <Text style={styles.title}> No tienes imágenes guardadas</Text>
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <Pressable onPress={() => openImage(item)}>
              <Image
                source={{ uri: `data:image/jpg;base64,${item}` }}
                style={styles.thumbnail}
              />
            </Pressable>
          )}
        />
      )}




      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
            <Image
              source={{ uri: `data:image/jpg;base64,${selectedImage}` }}
              style={styles.fullImage}
            />
            <Pressable onPress={closeImage} style={styles.closeButton}>
              <AntDesign name="close" size={30} color="black" />
            </Pressable>
          </Animated.View>
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
    zIndex: 2,
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
  thumbnail: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  title: {
    alignSelf: 'center',
    fontSize: 15,
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

})