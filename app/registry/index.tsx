import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState } from 'react'

const index = () => {
  
  return (
    <View style={styles.container}>
      
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    width: 100
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  containerTitle: {
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
  },
})