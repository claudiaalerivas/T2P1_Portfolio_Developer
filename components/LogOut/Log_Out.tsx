import { Button, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import asyncStorageService from '../../services/async-storage-service';
import { router } from 'expo-router';

const LogOut = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const sendLogin = () => {
    router.navigate('./../login')
  }
  useEffect(() => {
    const logout = async () => {
      await asyncStorageService.deleteTokenUser(asyncStorageService.KEYS.userToken)
    };
    logout();
  }, []);

  return (
    <View style={{flex:1}}>
      <Text style={{alignSelf:'center', fontSize: 20}}>SEGURO QUE QUIERE SALIR ?</Text>
      <View style={{backgroundColor: 'purple', borderRadius: 6}} >
        <Button title="Si" onPress={() => sendLogin()} />
      </View>
    </View>
  )

}

export default LogOut

const styles = StyleSheet.create({})