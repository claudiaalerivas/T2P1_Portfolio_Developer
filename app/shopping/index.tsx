import { Dispatch, useState } from 'react'
import { Button, StyleSheet, Text, View, Modal, TextInput, FlatList, Image, Pressable } from 'react-native'
import { Link } from 'expo-router'
import { initialCartItemList } from '../../data/card-item-list'
import uuid from 'react-native-uuid';
import { CartItem as CardItem } from '../../types/CartItem'
import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function ShoppingCartPage() {

  const emptyCart = {
    id: '',
    name: '',
    quantity: 0,
    category: '',
    price: 0,
    obtained: false
  }
  const [category, setCategory] = useState<string>('');
  const [displayModal, setDisplayModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [cardList, setCardList] = useState<CardItem[]>(initialCartItemList);
  const [cardItem, setCardItem] = useState<CardItem>(emptyCart);
  const [selectProduct, setSelectProduct] = useState(false)


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
    setCardList(() => [...cardList, cardItem]);
    setCardItem(emptyCart)
    setDisplayModal(false);
  };
  const isObtain = (index: number) => {
    const listForm = [...cardList];
    listForm[index].obtained = !listForm[index].obtained;
    recalculateTotal(listForm); 4

    setSelectProduct(!selectProduct)
  };

  const recalculateTotal = (updatedList: typeof cardList, idDelete?: string) => {
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
    setCardList([])
    setTotal(0)
  };
  const deleteItem = (id: string) => {
    recalculateTotal(cardList, id)
    const newList = cardList.filter((item) => item.id !== id);
    setCardList(newList);
  };
  const editItem = (updatedItem: CardItem) => {
    for (let i = 0; i < cardList.length; i++) {
      if (cardList[i].id == updatedItem.id) {
        setDisplayModal(true)
      }
    }
    const newList = cardList.filter((item) => item.id !== updatedItem.id);
    setCardList(newList);
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
            disabled={cardList.length == 0}
            color={'red'}
          />

        </View>
      </View>
      {cardList.length === 0 ?
        (
          <Text style={styles.empty}>Lista de la compra vacía</Text>
        ) : (
          <View style={styles.listShopping}>
            <FlatList
              keyExtractor={(item) => item.id}
              data={cardList}
              renderItem={({ item, index }) => (
                <View style={styles.list}>
                  <View>
                    <Image style={styles.imagesCategorys} source={item.image} />
                    <Pressable onPress={() => isObtain(index)}>
                      <Text style={styles.shop}>{item.obtained ? 'Obtenido ✅' : 'Añadir'}</Text>
                    </Pressable>
                  </View>
                  <View style={styles.infoProducts}>
                    <Text
                      style={[
                        styles.infoProductsInfo,
                        item.obtained && styles.infoProductsNameSelected,
                      ]}
                    >
                      Producto: {item.name}
                    </Text>
                    <Text style={styles.infoProductsInfo}>Cantidad: {item.quantity}</Text>
                    <Text style={styles.infoProductsInfo}>Categoria: {item.category}</Text>
                    <Text style={styles.infoProductsInfo}>Precio: {item.price}</Text>
                    <View style={styles.row}>
                      <Pressable onPress={() => deleteItem(item.id)}>
                        <MaterialCommunityIcons style={styles.buttomDelete} name="delete-circle" size={50} color="black" />
                      </Pressable>
                      <Pressable onPress={() => editItem(item)}>
                        <MaterialIcons style={styles.buttomEdit} name="edit" size={40} color="black" />
                      </Pressable>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        )}
      <Modal animationType="fade" transparent={true} visible={displayModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Añadir Nuevo Producto a la Lista</Text>

            <Text>Nombre:</Text>
            <TextInput
              style={styles.input}
              value={cardItem.name}
              onChangeText={(newName) => setCardItem({ ...cardItem, id: uuid.v4(), name: newName })}
              placeholder="Papa bonita"
            />


            <Text>Cantidad:</Text>
            <TextInput
              style={styles.input}
              value={cardItem.quantity.toString()}
              onChangeText={(newQuantity) => setCardItem({ ...cardItem, quantity: parseFloat(newQuantity) })}
              placeholder="12"
              keyboardType="numeric"
            />

            <Text>Precio:</Text>
            <TextInput
              style={styles.input}
              value={cardItem.price.toString()}
              onChangeText={(newQuantity) => setCardItem({ ...cardItem, price: parseFloat(newQuantity) })}
              placeholder="5.0"
              keyboardType="numeric"
            />

            <Text>Categoría:</Text>
            <Picker
              placeholder="Selecciona una categoría"
              selectedValue={category}
              onValueChange={(selectedCategory) => {
                setCategory(selectedCategory)
                setCardItem({ ...cardItem, category: selectedCategory, image: getImageFromCategory(selectedCategory) })
              }
              }>
              {categories.map((item, index) => <Picker.Item label={item} value={item} key={index} />)}

            </Picker>

            <View style={styles.buttomsModal}>
              <Button title="Guardar" onPress={() => sendForm()} disabled={cardItem.name == '' || category == '' || cardItem.quantity <= 0 || isNaN(cardItem.quantity) || isNaN(cardItem.price) || cardItem.price <= 0} />
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
    alignSelf: 'center',
    marginTop: 20
  },
  infoProducts: {
    marginTop: 20,
    width:230
  },
  infoProductsInfo: {
    fontSize: 18
  },
  infoProductsName: {
    marginTop: 20
  },
  infoProductsNameSelected: {
    textDecorationLine: 'line-through'
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
  buttomEdit: {
    color: '#ed8b1a',
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
    backgroundColor: '#f5f5f5'
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
    width: 90,
    height: 90,
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