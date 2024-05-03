import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import authService from '../services/AuthService'; 

export default function LoginScreen(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true); 
    authService.login(username, password)
      .then(userData => {
        setIsLoading(false); 
        props.setIsLoggedUser(userData);
      })
      .catch(error => {
        setIsLoading(false); 
        setErrorMessage('Email or password is incorrect.');
      });
  };

  const handleNavigateToCreateUser = () => {
    props.navigation.navigate('CreateUser'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>TripTank</Text>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.loginText}>LOGIN</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNavigateToCreateUser}>
        <Text style={styles.createAccountText}>Create an account</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  errorText: {
    color: '#fb5b5a',
    marginBottom: 10,
  },
  createAccountText: {
    color: 'white',
    marginTop: 10,
  },
});
