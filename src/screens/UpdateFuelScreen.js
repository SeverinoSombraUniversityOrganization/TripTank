import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import fuelService from '../services/FuelService'; 
import { CommonActions } from '@react-navigation/native';

export default function UpdateFuelScreen(props) {
  const fuelId = props.route.params.fuelId;
  const [fuel, setFuel] = useState(null);
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fuelService.getById(fuelId)
      .then(fuelData => {
        setFuel(fuelData);
        setName(fuelData.name);
      })
      .catch(error => {
        console.error('Error fetching fuel:', error);
        setErrorMessage('Failed to fetch fuel data.');
      });
  }, [fuelId]);

  const handleUpdateFuel = () => {
    setIsLoading(true); 

    fuelService.update(fuelId, { name })
      .then(updatedFuel => {
        setIsLoading(false); 
        props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
        );
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false); 
        setErrorMessage('Failed to update fuel.');
      });
  };

  if (!fuel) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fb5b5a" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Update Fuel</Text>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Name"
          placeholderTextColor="#003f5c"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleUpdateFuel} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.loginText}>UPDATE</Text>
        )}
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
});
