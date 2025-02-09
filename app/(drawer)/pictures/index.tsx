import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import imageService from '../../../services/image-service';

const PicturesPage = () => {
  const [images, setImages] = useState<string[]>([]);

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

  return (
    <View style={styles.container}>
      {images.length === 0 ? (
        <Text style = {styles.title}> No tienes imágenes guardadas</Text>
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3} 
          renderItem={({ item }) => (
            <Image
              source={{ uri: `data:image/jpg;base64,${item}` }}
              style={styles.thumbnail} 
            />
          )}
        />
      )}
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
    alignSelf:'center', 
    fontSize: 15, 
    color: 'purple' 
  }

})