import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { registerInfo } from '../../types/RegisterData';
import Toast from 'react-native-toast-message';
import { Redirect, router } from 'expo-router'
import userService from '../../services/user-service';

const RegisterPage = () => {
  const emptyForm = {
    name: '',
    email: '',
    password: '',
  };

  const [form, setForm] = useState<registerInfo>(emptyForm);

  async function insertUser(user: registerInfo) {
    try {
      const response = await userService.registerUser(user)
      if (response != 201) {
        window.alert('Hubo un error al registrar los datos, puede que el email ya estixta, o intente más tarde')
      } else {
        Toast.show({
          type: 'success',
          text1: 'Muy Bien!',
          text2: 'Se ha registrado tu usuario exitosamente! 👋'
        });
        router.navigate('./../login')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const sendForm = () => {
    if (form.name === '' || form.email === '' || !form.email.includes('@') || !form.email.endsWith('.com') || form.password === '' || form.password.length < 8 || !containsCharacters(form.password)) {
      Toast.show({
        type: 'error',
        text1: 'Ups! Algún campo esta vacío o...',
        text2: 'Verifica el email y que la contraseña sea segura',
      });
    } else {

      insertUser({
        name: form.name,
        email: form.email,
        password: form.password
      });
    }
    setForm(emptyForm);
  };

  function containsCharacters(password: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*[*!\-$&?¿.])(?=.*[0-9]).+$/;
    const strMatch = password.match(regex)
    if (strMatch) {
      return true
    } else {
      return false
    }
  }

  return (
    <View style={styles.container}>
      <Toast />
      <View style={styles.containerInputs}>
        <AntDesign name="adduser" style={styles.title} size={80} color="purple" />
        <Text style={styles.title}>Registro de Usuario</Text>
        <Text>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
          placeholder="Estefania"
          returnKeyType="done"
        />
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          placeholder="estefania@gmail.com"
          keyboardType="email-address"
          returnKeyType="done"
        />
        <Text>Contraseña:</Text>
        <TextInput
          style={styles.input}
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
          secureTextEntry={true}
          returnKeyType="done"
        />
        <View>
          <Button
            title="Guardar"
            onPress={sendForm}
          />
        </View>
      </View>
    </View>
  );
};

export default RegisterPage;

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
