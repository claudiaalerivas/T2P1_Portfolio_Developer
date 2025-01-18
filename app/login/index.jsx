import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

const LoginPage = () => {

    const emptyForm = {
        email: '',
        password: '',
      };
    
      const [formLogin, setFormLogin] = useState(emptyForm);
    
      const sendForm = () => {

        setFormLogin(emptyForm);
      };

  return (
    <View style={styles.container}>
      <View style={styles.containerInputs}>
        <AntDesign name="login"style={styles.title}  size={80} color="purple" />
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