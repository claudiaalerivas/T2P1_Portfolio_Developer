import { StyleSheet, Text } from 'react-native'
import { Redirect } from 'expo-router'
import { useEffect } from 'react';
import { router } from "expo-router";
import asyncStorageService from '../services/async-storage-service';
import LottieView from 'lottie-react-native';


const AppPage = () => {
  let isUserTokenSaved = false;
  const getSavedUserToken = async () => {
    const token = await asyncStorageService.getUser(asyncStorageService.KEYS.userToken);
    if (token != null) {
      isUserTokenSaved = true;
      router.navigate("/(drawer)/home");
    } else {
      router.navigate("./login");
    }
  };

  useEffect(() => {
    getSavedUserToken();
  }, []);
  return (
    <LottieView style={{flex: 1}} source={require('./../assets/loader.json')} autoPlay loop />
  )
}

export default AppPage

const styles = StyleSheet.create({})
