import { Dispatch, useState } from 'react'
import { Button, StyleSheet, Text, View, Modal, TextInput, FlatList, Image, Pressable } from 'react-native'
import { Link } from 'expo-router'
import { initialCartItemList } from '../../data/card-item-list'
import uuid from 'react-native-uuid';
import { CartItem } from '../../types/CartItem'
import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function ShoppingCartPage() {

  const [category, setCategory] = useState<string>('');
  const [displayModal, setDisplayModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [cartList, setCartList] = useState<CartItem[]>(initialCartItemList);

  const [cartItem, setCartItem] = useState<CartItem>({
    id: '',
    name: '',
    quantity: 0,
    category: '',
    price: 0,
    obtained: false
  });


  const categories: string[] = [
    'Panadería',
    'Bebidas',
    'Enlatados',
    'Carnes',
    'Pescados',
    'Frutas/Verduras',
    'Otros',
  ];

  const images = {
    bread: require('../../assets/images/pan.png'),
    canned: require('../../assets/images/canned.png'),
    drinks: require('../../assets/images/drinks.png'),
    meat: require('../../assets/images/meat.png'),
    fish: require('../../assets/images/fished.png'),
    vegetables: require('../../assets/images/fruitsVegetables.png'),
    others: require('../../assets/images/others.png')
  }

  const getImageFromCategory = (selectedCategory: string) => {
    switch (selectedCategory) {
      case 'Panadería':
        return images.bread
      case 'Bebidas':
        return images.canned
      case 'Enlatados':
        return images.drinks
      case 'Carnes':
        return images.meat
      case 'Pescados':
        return images.fish
      case 'Frutas/Verduras':
        return images.vegetables
      case 'Otros':
        return images.others
      default:
        return images.others
    }
  }

  const sendForm = () => {
    setCartList(() => [...cartList, cartItem]);

    setCartItem({
      id: '',
      name: '',
      quantity: 0,
      category: '',
      price: 0,
      obtained: false
    })
    setDisplayModal(false);
  };
  const isObtain = (index: number) => {
    const listForm = [...cartList];
    listForm[index].obtained = !listForm[index].obtained;
    recalculateTotal(listForm);
  };

  const recalculateTotal = (updatedList: typeof cartList, idDelete?: string) => {
    let newTotal = 0;
    if (updatedList.length == 0) {
      setTotal(0)
    } else {
      for (let i = 0; i < updatedList.length; i++) {
        if (updatedList[i].obtained) {
          newTotal += updatedList[i].price * updatedList[i].quantity;
        }
        if (updatedList[i].id == idDelete && updatedList[i].obtained && updatedList.length > 0) {
          newTotal -= updatedList[i].price * updatedList[i].quantity;
        }
      }
    }
    if (newTotal < 0) {
      setTotal(0)
    } else {
      setTotal(newTotal);
    }
  };
  const deleteList = () => {
    setCartList([])
    setTotal(0)
  };
  const deleteItem = (id: string) => {
    recalculateTotal(cartList, id)
    const newList = cartList.filter((item) => item.id !== id);
    setCartList(newList);
  };

  return (
    <View>
      <View style={styles.row}>
        <Image style={styles.imagePrincipal} source={require('../../assets/images/shoppingCart.png')} />
        <View>
          <Text style={styles.title}>Carrito de Compras</Text>
          <Text style={styles.price}>Total: {total}€</Text>
          <Button
          onPress={deleteList}
          title="Eliminar todo"
          disabled={cartList.length == 0}
          color={'red'}
        />

        </View>
      </View>
      {cartList.length === 0 ?
        (
          <Text style={styles.empty}>Lista de la compra vacia, Intente de nuevo</Text>
        ) : (
          <View style={styles.listShopping}>
            <FlatList
              keyExtractor={(item) => item.id}
              data={cartList}
              renderItem={({ item, index }) => (
                <View style={styles.list}>
                  <View>
                    <Image style={styles.imagesCategorys} source={item.image} />

                    <Pressable onPress={() => isObtain(index)}>
                      <Text style={styles.shop}>{item.obtained ? 'Obtenido ✅' : 'Pedir '}</Text>
                    </Pressable>
                  </View>
                  <View style={styles.infoProducts}>
                    <Text>Nombre Producto: {item.name}</Text>
                    <Text>Cantidad: {item.quantity}</Text>
                    <Text>Categoria: {item.category}</Text>
                    <Text>Precio: {item.price}</Text>
                    <Pressable onPress={() => deleteItem(item.id)}>
                      <MaterialCommunityIcons style={styles.buttomDelete} name="delete-circle" size={50} color="black" />
                    </Pressable>
                  </View>
                </View>
              )}
            />
          </View>
        )}
      <Modal animationType="slide" transparent={true} visible={displayModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Añadir Nuevo Producto a la Lista</Text>

            <Text>Nombre:</Text>
            <TextInput
              style={styles.input}
              value={cartItem.name}
              onChangeText={(newName) => setCartItem({ ...cartItem, id: uuid.v4(), name: newName })}
              placeholder="Papa bonita"
            />

            <Text>Categoría:</Text>
            <Picker
              placeholder="Selecciona una categoría"
              selectedValue={category}
              onValueChange={(selectedCategory) => {
                setCategory(selectedCategory)
                setCartItem({ ...cartItem, category: selectedCategory, image: getImageFromCategory(selectedCategory) })
              }
              }>
              {categories.map((item, index) => <Picker.Item label={item} value={item} key={index} />)}

            </Picker>
            <Text>Cantidad:</Text>
            <TextInput
              style={styles.input}
              value={cartItem.quantity.toString()}
              onChangeText={(newQuantity) => setCartItem({ ...cartItem, quantity: parseFloat(newQuantity) })}
              placeholder="12"
              keyboardType="numeric"
            />

            <Text>Precio:</Text>
            <TextInput
              style={styles.input}
              value={cartItem.price.toString()}
              onChangeText={(newQuantity) => setCartItem({ ...cartItem, price: parseFloat(newQuantity) })}
              placeholder="5.0"
              keyboardType="numeric"
            />

            <View style={styles.buttomsModal}>
              <Button title="Guardar" onPress={() => sendForm()} disabled={cartItem.name == '' || category == '' || cartItem.quantity <= 0 || isNaN(cartItem.quantity) || isNaN(cartItem.price) || cartItem.price <= 0} />
              <Pressable onPress={() => setDisplayModal(false)}>
                <Text style={styles.buttomClose}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal >

      <View style={styles.bottoms}>
        <Pressable onPress={() => setDisplayModal(true)}>
          <MaterialCommunityIcons style={styles.addCart} name="cart-plus" size={40} />
        </Pressable>
        <Link style={styles.link} href="/">
          <Foundation name="home" size={24} style={styles.buttomText} />
        </Link>
        
      </View>
    </View >
  );
}


const styles = StyleSheet.create({

  addCart: {
    alignItems: 'center',
    marginTop: 10,
    color: "#17a325"
  },
  row: {
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  bottoms: {
    flexDirection: 'row',
    alignSelf:'center',
    marginTop: 20
  },
  infoProducts: {
    marginTop: 20
  },
  buttomsModal: {
    flexDirection: 'row',
  },
  deleteList: {
    color: 'red'
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
  buttomDelete: {
    color: 'red',
    marginRight: 10,
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
    marginTop: 10
  },
  modal: {
    marginTop: '100%',
  },
  listShopping: {
    alignSelf: 'center',
    fontSize: 30,
    height: '70%',
    width: 400,
    backgroundColor:'#f5f5f5'
  },
  title: {
    alignSelf: 'center',
    fontSize: 30,
    marginTop: 20,
    marginLeft: 18
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
    marginBottom: 20,
    marginRight: 30
  },
  price: {
    fontSize: 20,
    marginLeft: 20
  },
  empty: {
    fontSize: 15,
    marginBottom: 20,
    marginLeft: 20,
    alignSelf: 'center',
    marginTop: 50
  },
  list: {
    backgroundColor: '#E7E0EC',
    marginBottom: 10,
    paddingLeft: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    width: '100%',
    flexDirection: 'row',

  },

  link: {
    color: 'purple',
    width: 50,
    paddingBottom: 12,
    alignSelf: 'center',
    marginLeft: 50
  },
  buttomText: {
    fontSize: 50
  },
})