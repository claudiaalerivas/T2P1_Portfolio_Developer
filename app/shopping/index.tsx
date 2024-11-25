import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Link, Redirect } from 'expo-router'

export default function ShoppingCartPage() {
  const [total, setTotal] = useState(0)
  const [shop, setShop] = useState(false)
  return (
    <View>
      <Text>Carrito de Compras</Text>
      <Text>Precio de la lista: {total}</Text>
      { shop ? 
        <Text>Inserte logica</Text>
        : 
        <Text>Cesta Vacia</Text>

      } 
      <Link style={styles.link} href="/">
          <Text style={styles.buttomText}>Pruebalo!</Text>
        </Link>

    </View>
  )
}

const styles = StyleSheet.create({
  link: {
    backgroundColor: 'purple',
    width: 90,
    borderRadius: 50,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'center',
    marginTop: '5%'
  },
  buttomText: {
    color: 'white',
    textAlign: 'center'
  },
})