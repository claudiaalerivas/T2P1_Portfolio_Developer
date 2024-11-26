import { useState } from 'react'
import { Button, StyleSheet, Text, View, Modal, TextInput, FlatList, Image, Pressable } from 'react-native'
import { Link, Redirect } from 'expo-router'
import { list } from '../../data/list'
import DropDownPicker from 'react-native-dropdown-picker'

export default function ShoppingCartPage() {

  const [total, setTotal] = useState(10)
  const [shop, setShop] = useState(false)

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Panadería', value: 'Panadería' },
    { label: 'Bebidas', value: 'Bebidas' },
    { label: 'Enlatados', value: 'Enlatados' },
    { label: 'Carnes', value: 'Carnes' },
    { label: 'Pescados', value: 'Pescados' },
    { label: 'Frutas/Verduras', value: 'Frutas/Verduras' },
    { label: 'Otros', value: 'Otros' },
  ]);
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
        {
          shop ?
            <View style={styles.modal}>
              <Modal
                animationType="slide"
                transparent={true}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Añadir Nuevo Producto a la Lista</Text>

                    <Text>Nombre:</Text>
                    <TextInput
                      style={styles.input}
                      value={list.name}
                      placeholder="Papa bonita"
                    />

                    <Text>Categoría:</Text>
                    <DropDownPicker
                      open={open}
                      value={value}
                      items={items}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setItems}
                      placeholder="Selecciona una categoría"
                      style={styles.dropdown}
                    />

                    <Text>Cantidad:</Text>
                    <TextInput
                      style={styles.input}
                      value={list.cantidad}
                      placeholder="12"
                      keyboardType="numeric"
                    />

                    <Text>Precio:</Text>
                    <TextInput
                      style={styles.input}
                      value={list.price}
                      placeholder="5.0"
                      keyboardType="numeric"
                    />
                    <View style={styles.buttomsModal}>
                      <Button title="Guardar" onPress={() => setShop(false)} />
                      <Pressable onPress={() => setShop(false)}>
                        <Text style={styles.buttomClose}>Cerrar</Text>
                      </Pressable>

                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            :
            <View>
              <Button
                onPress={() => setShop(true)}
                title="+ Añadir Nuevo Producto"
                color="#841584"
              />
            </View>
        }
      </View>

      <Link style={styles.link} href="/">
        <Text style={styles.buttomText}>Inicio</Text>
      </Link>

    </View>
  )
}

const styles = StyleSheet.create({
  buttomsModal: {
    flexDirection: 'row',
  },
  buttomClose: {
    color: 'red',
    paddingTop: 8,
    paddingBottom: 4,
    fontSize: 19,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 50
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  shop: {
    alignSelf: 'center',
    color: 'red',
    marginTop: 10
  },
  modal: {
    marginTop: '100%',
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
    marginTop: 10,
    marginBottom: 20
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
    backgroundColor: '#E7E0EC',
    marginBottom: 10,
    paddingLeft: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    width: '100%'
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