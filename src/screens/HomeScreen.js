import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import fuelService from '../services/FuelService'; 
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const FuelList = ({ fuels, usertoken, setFuels }) => {
  const navigation = useNavigation();

  const handleDeleteFuel = async (id) => {
    try {
      await fuelService.delete(id, usertoken);
      const updatedFuels = fuels.filter((fuel) => fuel._id !== id);
      setFuels(updatedFuels);
    } catch (error) {
      console.error('Error deleting fuel:', error);
    }
  };

  const handleUpdateFuel = (id) => {
    navigation.navigate('UpdateFuel', { fuelId: id });
  };

  const renderItem = ({ item }) => (
    <View style={styles.fuelItem} >
      <TouchableOpacity style={styles.fuelInfo} onPress={() => handleUpdateFuel(item._id)}>
        <Text style={styles.fuelName}>{item.name}</Text>
        <Text style={styles.fuelType}>######</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteFuel(item._id)}>
        <FontAwesome name="trash-o" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={fuels}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};


export default function HomeScreen(props) {
  const [fuels, setFuels] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fuelService.getList(props.isLoggedUser.token)
      .then((response) => {
        setFuels(response);
      })
      .catch((error) => {
        console.error('Error fetching fuels:', error);
      });
  }, []);

  const handleNavigateToCreateFuel = () => {
    navigation.navigate('CreateFuel');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>TripTank</Text>
      <Text style={styles.title}>Fuels</Text>

      <TouchableOpacity style={styles.button} onPress={handleNavigateToCreateFuel}>
        <Text style={styles.buttonText}>Create New Fuel</Text>
      </TouchableOpacity>

      <FuelList fuels={fuels} userToken={props.isLoggedUser.token} setFuels={setFuels}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    paddingTop: 10,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fuelItem: {
    width: screenWidth * 0.8, 
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  fuelInfo: {
    flex: 1, 
  },
  fuelName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fuelType: {
    fontSize: 14,
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#fb5b5a',
    borderRadius: 10,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

