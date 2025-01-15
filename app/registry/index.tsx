import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState } from 'react'

const RegistryUser = () => {
  const emptyForm = {
    id: '',
    name: '',
    email: '',
    password: '',
  }

  const initialListUsers = [
    {
      id: '123',
      name: 'Claudia',
      email: 'a@a.a',
      password: '123',
    },
  ]
  const [form, setForm] = useState(emptyForm);
  const [usersList, setUsersList] = useState(initialListUsers);
  const handleInputChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };
  const sendForm = () => {
    setUsersList(() => [...usersList, form]);
    setForm(emptyForm)
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Registro de Usuario</Text>
      </View>
      <Text>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={form.name}
        onChangeText={(text) => handleInputChange('name', text)}
        placeholder="Estefania"
      />
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        value={form.name}
        onChangeText={(text) => handleInputChange('email', text)}
        placeholder="estefania@gmail.com"
      />
      <Text>Contraseña:</Text>
      <TextInput
        style={styles.input}
        value={form.name}
        onChangeText={(text) => handleInputChange('password', text)}
        placeholder="*********"
        secureTextEntry={true}
      />
      <View>
        <Button title="Guardar" onPress={() => sendForm()} disabled={form.name == '' || form.email == '' || form.password == '' || form.email.length < 5} />
      </View>

    </View>
  )
}

export default RegistryUser

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