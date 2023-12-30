// HomeScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const handleLogout = async() => {
    await AsyncStorage.clear();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;

// import React, { useEffect } from 'react';
// import { View, Text, Button, Alert } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import BookForm from './BookForm';
// import Bookings from './Bookings';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Tab = createBottomTabNavigator();

// const HomeScreen = ({ navigation }) => {
//   useEffect(()=>{
//     ifToken()
//   },[])
  
//   const ifToken = async () => {
//     const token = await AsyncStorage.getItem('token');
//     if (token){
//       Alert.alert("Token is present")
//     }
//   }

//   return (
//       <Tab.Navigator screenOptions={{ headerShown: false }}>
//         <Tab.Screen name="BookForm" component={BookForm} />
//         <Tab.Screen name="Bookings" component={Bookings} />
//       </Tab.Navigator>
//   );
// };

// export default HomeScreen;
