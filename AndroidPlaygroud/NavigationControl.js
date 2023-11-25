import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Login';
import SignupScreen from './Signup';
import HomeScreen from './Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import LoadingScreen from './LoadingScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
        {/* {
          isLoggedIn ?
            (<Stack.Screen name="Home" component={HomeScreen} />)
            :
            (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
              </>
            )
        } */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
