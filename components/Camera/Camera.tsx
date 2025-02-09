import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { useRef, useState } from "react";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { router } from "expo-router";
import imageService from "../../services/image-service";

const Camera = () => {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState(false);
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const navigation = useNavigation();

  const toggleFacing = () => setFacing(facing === 'back' ? 'front' : 'back');
  const toggleFlash = () => setFlash(!flash);

  const takePicture = async () => {
    const picture = await cameraRef.current?.takePictureAsync({ base64: true });
    if (picture && picture.base64) {
      await imageService.saveImageToApi(picture.base64);
      console.log('Foto tomada', picture.base64);
      router.navigate('./../../app/(drawer)/pictures');
    } else {
      alert('Error al tomar la foto.');
    }
  };

  if (!permission) {
    return <View />;
  } else if (!permission.granted) {
    return <Button title="Dar permisos de cámara" onPress={requestPermission} />;
  }


  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <CameraView
        style={{ flex: 1 }}
        enableTorch={flash}
        facing={facing}
        mode="picture"
        ref={cameraRef}
      >
        <Pressable onPress={toggleFlash}>
          <Ionicons name={flash ? 'flash-off' : 'flash'} size={32} color="black" />
        </Pressable>
        <Pressable onPress={takePicture}>
          <Ionicons name="camera" size={32} color="black" />
        </Pressable>
        <Pressable onPress={toggleFacing}>
          <Ionicons name="camera-reverse" size={32} color="black" />
        </Pressable>
      </CameraView>

      <Pressable onPress={() => router.navigate('./../../app/(drawer)/pictures')}>
        <Ionicons name="close-circle" size={40} color="black" />
      </Pressable>
    </View>
  );
}

export default Camera

const styles = StyleSheet.create({})