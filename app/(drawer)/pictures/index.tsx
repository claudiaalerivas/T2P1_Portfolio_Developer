import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Camera from '../../../components/Camera/Camera';

const PicturesPage = () => {
  const [picture, setPicture] = useState<string>("");
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {picture == "" ? null : (
          <Image
            style={styles.imageStyle}
            source={{ uri: `data:image/jpg;base64,${picture}` }}
          />
        )}
      </View>
    </View>
  )
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
    justifyContent: "center",
  }
})