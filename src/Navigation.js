import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CreateUserScreen from './screens/CreateUserScreen';
import CreateFuelScreen from './screens/CreateFuelScreen';
import UpdateFuelScreen from './screens/UpdateFuelScreen';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [isLoggedUser, setIsLoggedUser] = useState(null);

  const handleLogout = () => {
    setIsLoggedUser(null);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedUser ? (
          <Stack.Screen
            name="Home"
            options={{
              headerTitle: () => (
                <View style={styles.userInfo}>
                  <Text style={styles.username}>{isLoggedUser.user.username}</Text>
                  <TouchableOpacity onPress={handleLogout}>
                    <FontAwesome name="sign-out" size={20} color="#003f5c" />
                  </TouchableOpacity>
                </View>
              ),
            }}
          >
            {props => {
              return <HomeScreen {...props} isLoggedUser={isLoggedUser} />;
            }}
        </Stack.Screen>
        ) : (
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
          >
            {props => {
              return <LoginScreen {...props} setIsLoggedUser={setIsLoggedUser} />;
            }}
          </Stack.Screen>
        )}

        <Stack.Screen
          name="CreateUser"
          component={CreateUserScreen}
        />
        <Stack.Screen
          name="CreateFuel"
          component={CreateFuelScreen}
        />
        <Stack.Screen
          name="UpdateFuel"
          component={UpdateFuelScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  header: {
    position: 'absolute',
    top: 0, 
    right: 0, 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginTop: 100, 
    marginBottom: 40,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  username: {
    color: '#003f5c',
    fontWeight: 'bold',
    marginRight: 10,
    textTransform: 'capitalize',
  },
  button: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Navigation;
