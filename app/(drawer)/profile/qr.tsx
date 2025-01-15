import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg';
import { Link } from 'expo-router';

const Qr = () => {
  return (
    <View style={styles.containerQrCode} >
      <Text style={styles.linesTitle}>___________________________</Text>
      <Text style={styles.titleInfo}>Visita mi Repositorio</Text>
      <Text style={styles.description}>Para explorar Proyectos y Soluciones en los que he trabajado.</Text>
      <Text style={styles.linesTitle}>___________________________</Text>
      
      <View style={styles.qrCode}>
        <QRCode value="https://github.com/adhernea" />
      </View>
    </View>
  )
}

export default Qr

const styles = StyleSheet.create({
  link: {
    backgroundColor: 'purple',
    width: 90,
    borderRadius: 50,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 15
  },
  buttomText: {
    color: 'white',
    textAlign: 'center'
  },
  linesTitle: {
    alignSelf: 'center',
  },
  titleInfo: {
    fontSize: 35,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  containerQrCode: {
    alignItems: 'center',
    marginTop:-100

  },
  description: {
    textAlign: 'center',
    width: 290
  },
  qrCode: {
    marginTop: 30,
  }
})