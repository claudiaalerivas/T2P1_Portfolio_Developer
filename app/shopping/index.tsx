import { useState } from 'react'
import { Button, StyleSheet, Text, View, Modal, TextInput, FlatList, Image, Pressable } from 'react-native'
import { Link } from 'expo-router'
import DropDownPicker from 'react-native-dropdown-picker'
import { initialForm } from '../../data/list'


export default function ShoppingCartPage() {
  const [name, setName] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [open, setOpen] = useState(false);
  const [shop, setShop] = useState(false);

  const isObtain = (index: number) => {
    const listForm = [...form];
    listForm[index].obtained = !listForm[index].obtained;
    recalculateTotal(listForm);
  };
  const recalculateTotal = (updatedList: typeof form) => {
    let newTotal = 0;
    for (let i = 0; i < updatedList.length; i++) {
      if (updatedList[i].obtained) {
        newTotal += updatedList[i].price * updatedList[i].cantidad;
      }
    }
    setTotal(newTotal);
  };

  

  const [total, setTotal] = useState(0);
  const [form, setForm] = useState(initialForm);

  const [items, setItems] = useState([
    { label: 'Panadería', value: 'Panadería' },
    { label: 'Bebidas', value: 'Bebidas' },
    { label: 'Enlatados', value: 'Enlatados' },
    { label: 'Carnes', value: 'Carnes' },
    { label: 'Pescados', value: 'Pescados' },
    { label: 'Frutas/Verduras', value: 'Frutas/Verduras' },
    { label: 'Otros', value: 'Otros' },
  ]);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const sendForm = () => {
    const imageProduct = (category: string) => {
      switch (category) {
        case 'Panadería':
          return require('../../assets/images/pan.png');
        case 'Enlatados':
          return require('../../assets/images/canned.png');
        case 'Bebidas':
          return require('../../assets/images/drinks.png');
        case 'Carnes':
          return require('../../assets/images/meat.png');
        case 'Pescados':
          return require('../../assets/images/fished.png');
        case 'Frutas/Verduras':
          return require('../../assets/images/fruitsVegetables.png');
        default:
          return require('../../assets/images/others.png');
      }
    };

    const newItem = {
      name,
      cantidad,
      image: imageProduct(category),
      category,
      price,
      obtained: false,
    };


    setForm([...form, newItem]);
    setShop(false);
    setName('');
    setCantidad(0);
    setPrice(0);
    setCategory('');
  };

  const deleteItem = (name: string) => {
    const newList = form.filter((item) => item.name !== name);
    setForm(newList);
  };
  const deleteList = () => {
    setForm([])
  };

  return (
    <View>
      <Image style={styles.imagePrincipal} source={require('../../assets/images/shoppingCart.png')} />
      <Text style={styles.title}>Carrito de Compras</Text>
      <Text style={styles.price}>Precio de la lista: {total}€</Text>
      <Text style={styles.listTitle}>Lista de la compra</Text>
      {form.length === 0 ?
        (
          <Text style={styles.empty}>Lista de la compra vacia, Intente de nuevo</Text>
        ) : (
          <View style={styles.listShopping}>
            <FlatList
              data={form}
              renderItem={({ item, index }) => (
                <View style={styles.list}>
                  <Pressable onPress={() => isObtain(index)}>
                    <Text style={styles.shop}>{item.obtained ? 'Obtenido ✅' : 'Meter al Carrito de Compras'}</Text>
                  </Pressable>
                  <Image style={styles.imagesCategorys} source={item.image} />
                  <Text>Nombre Producto: {item.name}</Text>
                  <Text>Cantidad: {item.cantidad}</Text>
                  <Text>Categoria: {item.category}</Text>
                  <Text>Precio: {item.price}</Text>
                  <Pressable onPress={() => deleteItem(item.name)}>
                    <Text style={styles.buttomDelete}>Borrar</Text>
                  </Pressable>
                </View>
              )}
            />
          </View>
        )}
      {shop && (
        <Modal animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Añadir Nuevo Producto a la Lista</Text>

              <Text>Nombre:</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Papa bonita"
              />

              <Text>Categoría:</Text>
              <DropDownPicker
                open={open}
                value={category}
                items={items}
                setOpen={setOpen}
                setValue={handleCategoryChange}
                setItems={setItems}
                placeholder="Selecciona una categoría"
              />

              <Text>Cantidad:</Text>
              <TextInput
                style={styles.input}
                value={cantidad.toString()}
                onChangeText={(value) => setCantidad(Number(value))}
                placeholder="12"
                keyboardType="numeric"
              />

              <Text>Precio:</Text>
              <TextInput
                style={styles.input}
                value={price.toString()}
                onChangeText={(value) => setPrice(Number(value))}
                placeholder="5.0"
                keyboardType="numeric"
              />

              <View style={styles.buttomsModal}>
                <Button title="Guardar" onPress={sendForm} disabled={name == '' || category == '' || Number(cantidad) <= 0 || Number(price) <= 0} />
                <Pressable onPress={() => setShop(false)}>
                  <Text style={styles.buttomClose}>Cerrar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}

      <Button
        onPress={() => setShop(true)}
        title="+ Añadir Nuevo Producto"
        color="#841584"
      />
      <Link style={styles.link} href="/">
        <Text style={styles.buttomText}>Inicio</Text>
      </Link>
      <Button
        onPress={deleteList}
        title="Eliminar la Lista"
        disabled={form.length == 0}
      />
    </View>
  );
}


const styles = StyleSheet.create({
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
    color: 'white',
    paddingTop: 8,
    paddingBottom: 4,
    fontSize: 19,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 50,
    alignSelf: 'center',
    backgroundColor: 'red',
    marginTop: 15
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
  },
  buttomText: {
    color: 'white',
    textAlign: 'center'
  },
})