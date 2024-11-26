import { useState } from 'react'
import { Button, StyleSheet, Text, View, Modal, TextInput, FlatList, Image } from 'react-native'
import { Link, Redirect } from 'expo-router'
import { list } from '../../data/list'

export default function ShoppingCartPage() {

  const [total, setTotal] = useState(10)
  const [shop, setShop] = useState(true)
  return (
    <View>
      <Image style={styles.imagePrincipal} source={require('../../assets/images/shoppingCart.png')} />
      <Text style={styles.title}>Carrito de Compras</Text>
      <Text style={styles.price}>Precio de la lista: {total}€</Text>
      <Text style={styles.listTitle}>Lista de la compra</Text>
      {total == 0 ?
        <Text style={styles.empty}>Lista de la compra vacia, Intente de nuevo</Text>
        :
        <View style={styles.listShopping}>
          <FlatList
            data={list}
            renderItem={({ item }) =>
              <View style={styles.list}>
                <View>
                  <Image style={styles.imagesCategorys} source={item.image} />
                  <Text>Nombre Producto: {item.name}</Text>
                  <Text>Cantidad: {item.cantidad}</Text>
                  <Text>Categoria: {item.category}</Text>
                  <Text>Precio: {item.price}</Text>
                  <Text style={styles.shop}>Obtenido</Text>
                </View>
              </View>
            }
          />
        </View>
      }
      <View>
        <Button
          onPress={() => setShop(true)}
          title="+ Añadir Nuevo Producto"
          color="#841584"
        />
      </View>

      <Link style={styles.link} href="/">
        <Text style={styles.buttomText}>Inicio</Text>
      </Link>

    </View>
  )
}

const styles = StyleSheet.create({

  shop: {
    alignSelf: 'center',
    color: 'red',
    marginTop: 10
  },
  listShopping: {
    alignSelf: 'center',
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
    height: '45%'
  },
  title: {
    alignSelf: 'center',
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20
  },
  imagePrincipal: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    marginTop: 10
  },
  imagesCategorys: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    marginTop: 10
  },
  price: {
    fontSize: 20,
    marginBottom: 20,
    marginLeft: 20
  },
  empty: {
    fontSize: 15,
    marginBottom: 20,
    marginLeft: 20,
    alignSelf: 'center',
    marginTop: 50
  },
  listTitle: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 20,
    color: 'purple'
  },
  list: {
    width: '100%',
    backgroundColor: '#E7E0EC',
    marginBottom: 10,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    maxWidth: '100%',
  },

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