import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { userInfo } from '../../types/RegisterData';
import Toast from 'react-native-toast-message';

const RegisterPage = () => {
  const emptyForm = {
    name: '',
    email: '',
    password: '',
  };

  const [form, setForm] = useState<userInfo>(emptyForm);

  const sendForm = () => {
    console.log('pasoooo')
    Toast.show({
      type: 'success',
      text1: 'Muy Bien!',
      text2: 'Se ha registrado tu usuario exitosamente! 👋'
    });
    setForm(emptyForm);
  };

  function containsCharacters(password: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*[*!\-$&?¿.])(?=.*[0-9]).+$/;
    const strMatch = password.match(regex)
    if (strMatch) {
      return false
    } else {
      return true
    }
  }

  return (
    <View style={styles.container}>
      <Toast />
      <View style={styles.containerInputs}>
        <AntDesign name="adduser"style={styles.title}  size={80} color="purple" />
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
            disabled={form.name === '' || form.email === '' || form.password === '' || form.password.length < 8 || containsCharacters(form.password)}
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
