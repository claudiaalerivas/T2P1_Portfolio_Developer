import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

const Info_Personal = () => {
  return (
    <View style={styles.containerDescription}>
      <Ionicons name="information-circle-outline" size={30} style= {styles.icon} />
      <Text style={styles.titleDescription}>Hola! Soy Claudia</Text>
      <Text style={styles.personalDescription}>Desarrolladora de aplicaciones móviles con experiencia en creación de soluciones innovadoras y centradas en el usuario. 
      </Text>
      <Image style={styles.avatar} source={require('../../assets/images/descripcion.png')} />
    </View>
  )
}

export default Info_Personal

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'purple',
    color: 'white',
    marginBottom: -15
  },
  avatar: {
    zIndex: 1,
    height: 100,
    width: 100,
    marginTop: '2%',
    alignSelf: 'center',
  },
  containerDescription: {
    borderRadius: 15,
    width: '90%',
    height: '50%',
    zIndex: -1,
    backgroundColor: '#E2D6FF',
    alignContent: 'center',
    paddingBottom: '25%',
    alignSelf:'center',
    marginTop:50
  },
  titleDescription: {
    fontSize: 35,
    marginTop: '10%',
    alignSelf: 'center'
  },
  personalDescription: {
    alignSelf: 'center',
    marginTop: '5%',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
  }
})