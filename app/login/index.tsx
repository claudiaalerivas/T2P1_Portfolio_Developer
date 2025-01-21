import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import OrdersService from '../../services/manage-service-user';
import { loginInfo } from '../../types/RegisterData';

const LoginPage = () => {

  const emptyForm = {
    email: '',
    password: '',
  };

  const [formLogin, setFormLogin] = useState(emptyForm);
  async function sevedUser(user: loginInfo) {
    try {
      const response = await OrdersService.registerLogin(user)
      if (response == null) {
        window.alert('Hubo un error al registrar los datos, intente mas tarde')
      } else {
        await OrdersService.saveUser(OrdersService.KEYS.userToken, user)
        Toast.show({
          type: 'success',
          text1: 'Muy Bien!',
          text2: 'Se ha registrado tu usuario exitosamente! 👋'
        });
      }
    } catch (error) {
      console.log(error)
    }
  }
  function containsCharacters(password: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*[*!\-$&?¿.])(?=.*[0-9]).+$/;
    const strMatch = password.match(regex)
    if (strMatch) {
      return false
    } else {
      return true
    }
  }
  const sendForm = () => {
    if (formLogin.email === '' || !formLogin.email.includes('@') || !formLogin.email.includes('.') || formLogin.password === '' || formLogin.password.length < 8 || containsCharacters(formLogin.password)) {
      Toast.show({
        type: 'error',
        text1: 'Ups! Algún campo esta vacío o...',
        text2: 'Verifica el email y que la contraseña sea segura',
      });
    } else {
      router.navigate('../(drawer)/home')
      sevedUser(
        {
          email: formLogin.email,
          password: formLogin.password
        }
      )
    }
    setFormLogin(emptyForm);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInputs}>
        <AntDesign name="login" style={styles.title} size={80} color="purple" />
        <Text style={styles.title}>Inicio de sesión</Text>

        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          value={formLogin.email}
          onChangeText={(text) => setFormLogin({ ...formLogin, email: text })}
          placeholder="estefania@gmail.com"
          keyboardType="email-address"
          returnKeyType="done"
        />
        <Text>Contraseña:</Text>
        <TextInput
          style={styles.input}
          value={formLogin.password}
          onChangeText={(text) => setFormLogin({ ...formLogin, password: text })}
          secureTextEntry={true}
          returnKeyType="done"
        />
        <View>
          <Button
            title="Guardar"
            onPress={sendForm}
            disabled={formLogin.email === '' || formLogin.password === ''}
          />
        </View>
      </View>
    </View>
  )
}

export default LoginPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  containerInputs: {
    borderTopWidth: 5,
    borderWidth: 1,
    borderColor: 'purple',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
});